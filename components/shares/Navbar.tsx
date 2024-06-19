"use client";


import { SEARCH_QUERY_REDUCER_ACTION_TYPE, previousSearchQueryFromLocalStorage, searchQueryParamT, useSearchQueryContext } from "@/contexts/searchQuery.context";
import { queryClient } from "@/states/server/ServerQueryProvider";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";


export default function Navbar() {
  const { searchQueryParam, dispatch } = useSearchQueryContext();

  const router = useRouter();
  const searchParams = useSearchParams().get("q")!;

  const form = useForm<searchQueryParamT>({
    defaultValues: {
      query: searchParams,
    },
  });

  const submitForm = async () => {
    const formValue = form.getValues("query");
    if (formValue.trim() === "")
      return;

    if (previousSearchQueryFromLocalStorage !== formValue.trim()) {
      queryClient.invalidateQueries({ queryKey: ["searchQuery", formValue.trim()] });
      router.push("/search?q=" + encodeURIComponent(formValue.trim()));
      return;
    }

    dispatch({ type: SEARCH_QUERY_REDUCER_ACTION_TYPE.SET_QUERY, payload: formValue.trim() });
    router.push("/search?q=" + encodeURIComponent(formValue.trim()));
    return;
  };

  return (
    <nav>
      <form
        className="flex justify-between items-center max-w-md w-full border border-border rounded-full px-2 py-1 focus-within:shadow-lg hover:shadow-lg"
        onSubmit={form.handleSubmit(submitForm)}
      >
        <input
          type="text"
          className="flex-1 px-2 md:px-4 py-0 md:py-1 rounded-full outline-none text-muted-foreground focus-within:text-foreground text-base"
          autoComplete="off"
          { ...form.register("query", { required: true, value: searchQueryParam.query }) }
        />

        <button
          className="w-[18px] h-auto md:mr-4 py-1 inline-block outline-none focus-within::scale-110 hover:scale-110"
          type="submit"
        >
          <Image
            src="/assets/search.primary.svg"
            alt="Search asset svg"
            width={40}
            height={40}
          />
        </button>
      </form>
    </nav>
  );
}


