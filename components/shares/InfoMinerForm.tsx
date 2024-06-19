"use client"


import { SEARCH_QUERY_REDUCER_ACTION_TYPE, searchQueryParamT, useSearchQueryContext } from "@/contexts/searchQuery.context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


export default function InfoMinerForm() {
  const { searchQueryParam, dispatch } = useSearchQueryContext();

  const router = useRouter();

  const form = useForm<searchQueryParamT>({
    defaultValues: {
      query: searchQueryParam.query,
    },
  });

  const submitForm = async () => {
    const formValue = form.getValues("query");
    if (formValue.trim() === "")
      return;

    dispatch({ type: SEARCH_QUERY_REDUCER_ACTION_TYPE.SET_QUERY, payload: formValue.trim() });
    router.push("/search?q=" + encodeURIComponent(formValue.trim()));
  };

  return (
    <form
      className="flex flex-wrap justify-between items-center max-w-xl w-full border border-border rounded-full px-2 py-1 focus-within:shadow-lg hover:shadow-lg"
      onSubmit={form.handleSubmit(submitForm)}
    >
      <button
        className="w-[18px] h-auto ml-4 py-2 inline-block md:hidden outline-none focus-within::scale-110 hover:scale-110"
        type="submit"
      >
        <Image
          src="/assets/search.primary.svg"
          alt="Search asset svg"
          width={40}
          height={40}
        />
      </button>

      <input
        type="text"
        className="flex-1 px-4 py-0 md:py-1 rounded-full outline-none text-muted-foreground focus-within:text-foreground text-base"
        autoComplete="off"
        { ...form.register("query", { required: true, value: form.getValues("query") }) }
      />

      <button
        className="bg-primary text-primary-foreground px-4 py-1 rounded-full focus-within:shadow-lg hover:shadow-lg font-medium hidden md:inline-block"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}


