import type { Metadata } from "next";
import { APP_CONFIG } from "./constants";

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
};