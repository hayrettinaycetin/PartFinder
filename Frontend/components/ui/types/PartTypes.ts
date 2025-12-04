export type PartItemDigikey = {
  image: string;
  name: string;
  url: string;
  digikey_id: string;
  shop: "Digikey";
};

export type PartItemMouser = {
  image: string;
  name: string;
  url: string;
  price_for_one: string;
  price_for_ten: string;
  price_for_hundred: string;
  shop: "Mouser";
};

export type PartItemFarnell = {
  image: string;
  name: string;
  url: string;
  price_for_one: string | number;
  price_for_ten: string | number;
  price_for_twentyfive: string | number;
  price_for_fifty: string | number;
  price_for_hundred: string | number;
  shop: "Farnell";
};

export type PartItem = PartItemDigikey | PartItemMouser | PartItemFarnell;
