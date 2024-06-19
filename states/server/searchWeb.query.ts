"use server";


import { WebSearchApiResponse } from "@/types/webSearch.type";


interface SearchWebProps {
  query: string;
  offset?: number;
  count?: number;
  safesearch?: "off" | "moderate" | "strict";
};


export async function searchWebQuery({
  query,
  offset = 0,
  count = 20,
  safesearch = "off",
}: SearchWebProps) {
  const endpoint = process.env.SEARCH_ENGINE!;

  const searchParams = new URLSearchParams({
    q: query,
    count: String(count),
    offset: String(offset),
    safesearch: safesearch,
  });

  const url = endpoint + "?" + searchParams;

  const fetchOptions = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Accept-Encoding": "gzip",
      "Api-Version": "2023-10-11",
      "X-Subscription-Token": process.env.SEARCH_ENGINE_S_API_KEY!,
    },
  };

  const response: Response = await fetch(url, fetchOptions);
  const results: WebSearchApiResponse = await response.json();

  return results;
}


