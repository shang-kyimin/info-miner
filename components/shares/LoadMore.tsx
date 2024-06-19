"use client";


import { SearchResult } from "@/types/webSearch.type";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useInView } from "react-intersection-observer";
import WebSearchResult from "./WebSearchResult";
import { useQuery } from "@tanstack/react-query";
import { searchWebQuery } from "@/states/server/searchWeb.query";
import { previousSearchQueryFromLocalStorage } from "@/contexts/searchQuery.context";


let offset = 1;
let isAvaliable = true;


export default function LoadMore({ searchParams }: { searchParams: string }) {
  const { ref, inView } = useInView();
  const [ results, setResults ] = useState<SearchResult[]>([]);

  if (previousSearchQueryFromLocalStorage !== searchParams) {
    isAvaliable = true;
    offset = 1;
  }

  const searchQuery = useQuery({
    queryKey: ["searchQuery", searchParams],
    queryFn: async () => {
      if (searchParams.trim() === "") {
        setResults([]);
        offset = 1;
        isAvaliable = true;

        return null;
      }

      const response = await searchWebQuery({ query: searchParams, offset: offset });
      setResults([ ...results, ...response.web.results ]);
      offset = offset + 1;

      return response;
    },
    enabled: inView && isAvaliable,
  });

  if (searchQuery.data?.query.more_results_available === false) {
    isAvaliable = false;
  }

  return (
    <>
      {searchQuery.isSuccess && results.map((result, index) => (
        <WebSearchResult key={index} result={result} />
      ))}

      <div ref={ref} className="self-center py-4 md:py-6">
        {(isAvaliable === false || inView === false) ? (
          <Fragment></Fragment>
        ) : (
          <Image
            src="/assets/loader.dark.svg"
            alt="Loader asset svg"
            width={28}
            height={28}
            className="animate-spin"
          />
        )}
      </div>
    </>
  );
}


