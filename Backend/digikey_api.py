import httpx
from dotenv import load_dotenv
import os


load_dotenv(dotenv_path="../.env")
CLIENT_ID = os.getenv("DIGIKEY_CLIENT_ID_PRODUCTION")

CLIENT_SECRET = os.getenv("DIGIKEY_CLIENT_SECRET_PRODUCTION")

BASE_URL = "https://api.digikey.com/products/v4/search"

TOKEN_URL = "https://api.digikey.com/v1/oauth2/token"



def get_access_token():
    data = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }
    response = httpx.post(TOKEN_URL, data=data)
    response.raise_for_status()
    return response.json()["access_token"]



def extract_product_info(data):
    products_info = []

    for product in data.get("Products", []):
        name = product["Description"].get("ProductDescription")
        image = product.get("PhotoUrl")
        url = product.get("ProductUrl")
        variations = product.get("ProductVariations", [])
        digikey_id = None
        if variations:
            digikey_id = variations[0].get("DigiKeyProductNumber")

        products_info.append({
                "name": name,
                "image": image,
                "url": url,
                "digikey_id": digikey_id

            })
    

    return products_info


def search_from_digikey(keyword:str):
    token = get_access_token()
    RESOURCE_URL = BASE_URL + "/keyword"
    headers = {
    "X-DIGIKEY-Client-Id": CLIENT_ID,
    "Authorization": f"Bearer {token}",
    "X-DIGIKEY-Locale-Language": "en",
    "X-DIGIKEY-Locale-Currency": "PLN",
    "X-DIGIKEY-Locale-Site": "PL",
    }
    payload  ={
        "Keywords": keyword,
        "Limit": 30
    }
    response = httpx.post(RESOURCE_URL,json=payload, headers=headers)
    data = response.json()

    print(f"Status Code: {response.status_code}")
    
    #print(data)

    if response.status_code == 200:
        return extract_product_info(data)
    else:
        return []
    
def check_the_price(digikey_id:str, quantity:int):
    token = get_access_token()
    RESOURCE_URL = BASE_URL + f"/{digikey_id}/pricingbyquantity/{quantity}"
    headers = {
    "X-DIGIKEY-Client-Id": CLIENT_ID,
    "Authorization": f"Bearer {token}",
    "X-DIGIKEY-Locale-Language": "en",
    "X-DIGIKEY-Locale-Currency": "PLN",
    "X-DIGIKEY-Locale-Site": "PL",
    }
    response = httpx.get(RESOURCE_URL, headers=headers)
    data = response.json()
    print(f"Status Code: {response.status_code}")
    total_price = data['StandardPricingOptions'][0]['TotalPrice']
    return total_price

token = get_access_token()

if __name__ == "__main__":
    print(search_from_digikey("STM32L4")) #Test
    #print(check_the_price("497-18230-ND", 10)) #Test

