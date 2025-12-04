import httpx
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="../.env")
api_key = os.getenv("MOUSER_SEARCH_API_KEY")


def get_specific_quantities(part, quantities=[1, 10, 100]):
    price_list = part.get("PriceBreaks", [])

    result = {}
    for q in quantities:
        for tier in price_list:
            if tier["Quantity"] == q:
                result[q] = tier["Price"]
                break
        else:
            result[q] = None
    return result


def search_from_mouser(keyword):
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    url = f"https://api.mouser.com/api/v1/search/keyword?apiKey={api_key}"

    payload = {
        "SearchByKeywordRequest": {
            "keyword": keyword,
            "records": 30,
            "startingRecord": 0,
            "searchOptions": "InStock",
            "searchWithYourSignUpLanguage": "EN",
            "mouserPaysCustomsAndDuties": False
        }
    }

    response = httpx.post(url, json=payload, headers=headers)
    data = response.json()

    print(f"Status Code: {response.status_code}")
    #print(data)
    parts = data["SearchResults"]["Parts"]

    results = []
    for part in parts:
        results.append({
            "name": part.get("ManufacturerPartNumber"),
            "image": part.get("ImagePath"),
            "url": part.get("ProductDetailUrl"),
            "price_for_one": get_specific_quantities(part, [1])[1],
            "price_for_ten": get_specific_quantities(part, [10])[10],
            "price_for_hundred": get_specific_quantities(part, [100])[100]
        })

    return results


if __name__ == "__main__":
    print(search_from_mouser("STM32L4"))
