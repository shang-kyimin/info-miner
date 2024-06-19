"use client";


import { getValueFromLocalStorage, setValueToLocalStorage } from "@/lib/localStorage.lib";
import { Dispatch, createContext, useContext, useReducer } from "react";
import { z } from "zod";


const searchQueryZod = z.object({
  query: z.string().trim(),
});

const localStorageSearchQuery = "searchQuery";
const localStoragePreviousSearchQuery = "previousSearchQuery";
const searchQueryFromLocalStorage = String(getValueFromLocalStorage(localStorageSearchQuery)) || String(setValueToLocalStorage(localStorageSearchQuery, ""));

export const previousSearchQueryFromLocalStorage = String(getValueFromLocalStorage(localStoragePreviousSearchQuery)) || String(setValueToLocalStorage(localStorageSearchQuery, ""));

export const initState: searchQueryParamT = {
  query: searchQueryFromLocalStorage,
};

const reducer = (
  state: searchQueryParamT,
  action: { type: SEARCH_QUERY_REDUCER_ACTION_TYPE, payload?: string | number },
): searchQueryParamT => {
  switch (action.type) {
    case SEARCH_QUERY_REDUCER_ACTION_TYPE.GET_QUERY:
      return { query: state.query };
    
    case SEARCH_QUERY_REDUCER_ACTION_TYPE.SET_QUERY:
      setValueToLocalStorage(localStorageSearchQuery, action.payload);
      setValueToLocalStorage(localStoragePreviousSearchQuery, initState.query);
      initState.query = action.payload as string;
      return { ...state, query: initState.query };

    case SEARCH_QUERY_REDUCER_ACTION_TYPE.RESET_QUERY:
      setValueToLocalStorage(localStorageSearchQuery, "");
      setValueToLocalStorage(localStoragePreviousSearchQuery, "");
      initState.query = "";
      return { query: initState.query };

    default:
      throw new Error("Undefined reducer action on searchQueryContext");
  }
};



export const enum SEARCH_QUERY_REDUCER_ACTION_TYPE {
  GET_QUERY = "getQuery",
  SET_QUERY = "setQuery",
  RESET_QUERY = "resetQuery",
};

export type searchQueryParamT = z.infer<typeof searchQueryZod>;

type SearchQueryContextT = {
  searchQueryParam: searchQueryParamT,
  dispatch: Dispatch<{ type: SEARCH_QUERY_REDUCER_ACTION_TYPE, payload?: string }>,
};

export const SearchQueryContext = createContext<SearchQueryContextT | undefined>(undefined);

export default function SearchQueryContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ state, dispatch ] = useReducer(reducer, initState);

  return (
    <SearchQueryContext.Provider value={{ searchQueryParam: state, dispatch }}>
      {children}
    </SearchQueryContext.Provider>
  );
}

export function useSearchQueryContext(): SearchQueryContextT {
  const context = useContext(SearchQueryContext);
  if (!context)
    throw new Error("SearchQueryContext must be used within a SearchQueryContextProvider");

  return context;
}


