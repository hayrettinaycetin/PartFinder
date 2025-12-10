import httpx
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="../.env")
farnell_api_key = os.getenv("FARNELL_API_KEY")

def search_from_farnell(keyword:str):
    url ="https://api.element14.com/catalog/products"

    params = {
        "versionNumber":"1.4",
        "callInfo.responseDataFormat": "JSON",
        "term":f"any:{keyword}",
        "storeInfo.id":"uk.farnell.com",
        "callInfo.apiKey": farnell_api_key,
        "resultsSettings.offset":"0",
        "resultsSettings.numberOfResults":"1",
        "resultsSettings.refinements.filters":"inStock",
        "resultsSettings.responseGroup":"large"
    }

    response = httpx.get(url, params=params)
    data = response.json()
    if response.status_code == 200:
        return data
    else:
        return []


def extract_product_info(data):
    if data == []:
        return []
    results = []
    for part in data["keywordSearchReturn"]["products"]:
        name = part["displayName"]
        image = part["image"].get("mainImageURL")
        url = part["productURL"]

        def get_price_safe(prices_list, index):
            try:
                return prices_list[index].get("cost")
            except (IndexError, AttributeError):
                return None
        prices = part.get("prices", [])
        price_for_one        = get_price_safe(prices, 0)
        price_for_ten        = get_price_safe(prices, 1)
        price_for_twentyfive = get_price_safe(prices, 2)
        price_for_fifty      = get_price_safe(prices, 3)
        price_for_hundred    = get_price_safe(prices, 4)
            

        results.append({
                "name": name,
                "image": image,
                "url": url,
                "price_for_one": price_for_one,
                "price_for_ten": price_for_ten,
                "price_for_hundred": price_for_hundred,
                "price_for_twentyfive": price_for_twentyfive,
                "price_for_fifty": price_for_fifty,
                "price_for_hundred": price_for_hundred


        })

    return results

if __name__ == "__main__":
    print(extract_product_info(search_from_farnell("STM32L4")))   #Test
    print((search_from_farnell("STM32L4"))) #Test
