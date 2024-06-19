"use client";


import { SEARCH_QUERY_REDUCER_ACTION_TYPE, previousSearchQueryFromLocalStorage, useSearchQueryContext } from "@/contexts/searchQuery.context";
import { searchWebQuery } from "@/states/server/searchWeb.query";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import SkeletonLoader from "./SkeletonLoader";
import { SearchResult } from "@/types/webSearch.type";
import { useState } from "react";
import WebSearchResult from "./WebSearchResult";
import LoadMore from "./LoadMore";


export default function WebSearchResults() {
  const [ results, setResults ] = useState<SearchResult[]>([]);

  const { dispatch } = useSearchQueryContext();
  const searchParams = useSearchParams().get("q")!;
  const router = useRouter();
  
  const searchQuery = useQuery({
    queryKey: ["searchQuery", searchParams, 0],
    queryFn: async () => {
      if (searchParams.trim() === "") {
        dispatch({ type: SEARCH_QUERY_REDUCER_ACTION_TYPE.RESET_QUERY });
        router.push("/");

        return null;
      }

      dispatch({ type: SEARCH_QUERY_REDUCER_ACTION_TYPE.SET_QUERY, payload: searchParams });
      router.push("/search?q=" + encodeURIComponent(searchParams));

      const response = await searchWebQuery({ query: searchParams, count: 20 });
      setResults([ ...response.web.results ]);

      return response;
    },
  });

  return (
    <section className="flex flex-col p-2 justify-start border">
      {searchQuery.isLoading && (
        <div className="space-y-2 md:space-y-3 md:p-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      )}

      {searchQuery.isError && (
        <div>
          <h6>Error on Fetching!</h6>
        </div>
      )}

      {searchQuery.isSuccess && results.map((result, index) => (
        <WebSearchResult key={index} result={result} />
      ))}

      {searchQuery.isFetched && (
        <LoadMore searchParams={searchParams} />
      )}
    </section>
  );
}


