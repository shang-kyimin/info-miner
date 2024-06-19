import { SearchResult } from "@/types/webSearch.type";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";


export default function WebSearchResult({ result }: { result: SearchResult }) {
  return (
    <div className="flex flex-col space-y-1 px-2 py-3 z-10">
      <a href={result.url} target="_blank" className="flex flex-col justify-start gap-2 group">
        <div className="flex justify-staqrt items-center gap-2">
          {result.meta_url.favicon && (
              <Avatar className="bg-slate-100">
                <AvatarImage src={result.meta_url.favicon} className="object-contain p-2" />
                <AvatarFallback>
                  <AvatarImage src="/assets/world.dark.svg" className="object-contain p-2" />
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col gap-1 overflow-hidden rounded-none">
              <span className="text-base md:text-[1.05rem] mb-[-5px]">{result.profile.name}</span>
              <span id="netlocPath" className="text-sm text-nowrap overflow-scroll">{result.meta_url.netloc} {result.meta_url.path}</span>
            </div>
        </div>
        <h5 className="text-lg text-primary group-hover:underline leading-5">{result.title}</h5>
      </a>

      <div>
        <p className="text-sm">
          {result.age} - <span dangerouslySetInnerHTML={{ __html: result.description }}></span>
        </p>
      </div>
    </div>
  );
}


