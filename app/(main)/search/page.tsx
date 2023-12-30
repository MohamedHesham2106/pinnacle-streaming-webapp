import { SearchResults, SearchResultsSkeleton } from '@/components/search-results';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

interface ISearchPageProps {
  searchParams: {
    term?: string;
  };
}

export default function Search({ searchParams }: ISearchPageProps) {
  if (!searchParams.term) redirect('/');

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto ">
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults term={searchParams.term} />
      </Suspense>
    </div>
  );
}
