import { PartItem } from "../types/PartTypes";
import { BASE_URL } from "../../../constants/config";

const shuffleArray = (array: PartItem[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const searchComponents = async (query: string) => {
  if (!query.trim()) return [];

  let digikeyResults: PartItem[] = [];
  let mouserResults: PartItem[] = [];
  let farnellResults: PartItem[] = [];

  try {
    // Digikey
    const digikeyRes = await fetch(`${BASE_URL}/search_part_from_digikey?query=${encodeURIComponent(query)}`);
    const digikeyData = await digikeyRes.json();
    digikeyResults = (digikeyData.digikey_data || []).map((item: any) => ({ ...item, shop: "Digikey" }));

    // Mouser
    const mouserRes = await fetch(`${BASE_URL}/search_part_from_mouser?query=${encodeURIComponent(query)}`);
    const mouserData = await mouserRes.json();
    mouserResults = (mouserData.mouser_data || []).map((item: any) => ({ ...item, shop: "Mouser" }));

    // Farnell
    const farnellRes = await fetch(`${BASE_URL}/search_part_from_farnell?query=${encodeURIComponent(query)}`);
    const farnellData = await farnellRes.json();
    farnellResults = (farnellData.farnell_data || []).map((item: any) => ({ ...item, shop: "Farnell" }));
  } catch (err) {
    console.warn("Search failed:", err);
  }

  return shuffleArray([...digikeyResults, ...mouserResults, ...farnellResults]);
};
