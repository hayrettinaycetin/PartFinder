import React from "react";
import DigikeyCard from "./DigikeyCard";
import MouserCard from "./MouserCard";
import FarnellCard from "./FarnellCard";
import { PartItem } from "../types/PartTypes";

export default function PartCard({ item }: { item: PartItem }) {
  if (item.shop === "Digikey") return <DigikeyCard item={item} />;
  if (item.shop === "Farnell") return <FarnellCard item={item} />;
  return <MouserCard item={item} />;
}
