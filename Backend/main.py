from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mouser_api import search_from_mouser
from digikey_api import search_from_digikey, check_the_price
from farnell_api import search_from_farnell, extract_product_info
from gpt_api import find_components
app = FastAPI()


#origins = ["http://localhost:8081"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
async def root():
    return {"message": "Main point works!"}





#Digikey Endpoint
@app.get("/search_part_from_digikey")
async def search_part_one(query: str):
    digikey_data = search_from_digikey(query)
    return {"digikey_data": digikey_data}


@app.get("/find_the_price_given_quantities")
async def price_given_quantities(quantity: int, digikey_id: str):
    total_price = check_the_price(digikey_id, quantity)
    return {"total_price": total_price}

#Mouser Endpoint
@app.get("/search_part_from_mouser")
async def search_part_two(query: str):
    mouser_data = search_from_mouser(query)
    return {"mouser_data": mouser_data}



#Farnell Endpoint
@app.get("/search_part_from_farnell")
async def search_part_four(query: str):
    farnell_data = search_from_farnell(query)
    extracted_data = extract_product_info(farnell_data) 
    return {"farnell_data": extracted_data}


#Project Endpoint
@app.get("/find_components_for_project")
async def project(query: str):
    gpt_data = find_components(query)    
    return gpt_data



