import { getSearch } from '@/services/search.service';
import { SearchResultCard, SearchResultCardSkeleton } from '@/components/search-result-card';
import { Skeleton } from './ui/skeleton';

interface ISearchResultsProps {
  term?: string;
}
export const SearchResults = async ({ term }: ISearchResultsProps) => {
  const data = await getSearch(term);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Results for term &quot;{term}&quot;</h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found. Try searching for something else
        </p>
      )}
      <div className="flex flex-col gap-y-4 w-fit">
        {data.map((result) => (
          <SearchResultCard data={result} key={result.id} />
        ))}
      </div>
    </div>
  );
};

export const SearchResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <SearchResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
