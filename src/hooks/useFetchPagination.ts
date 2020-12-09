import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import api from '~/services/api';
import { FetchWithPagination } from '~/types/Fetch';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useFetchPagination<Error = any>(
  url: string | null,
  initialPage?: number,
) {
  const [page, setPage] = useState(initialPage || 1);
  const [allData, setAllData] = useState<FetchWithPagination>();

  const { data, error } = useSWR<FetchWithPagination, Error>(
    () => (page ? `${url}?page=${page}` : url),
    fetcher,
    { revalidateOnMount: true },
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setAllData((all) => {
      const items = [...(all?.items || []), ...(data?.items || [])];

      return { ...data, items };
    });
  }, [data]);

  const fetchMore = useCallback(() => {
    setPage(allData?.hasNextPage ? allData.nextPage : page);
  }, [allData?.hasNextPage, allData?.nextPage, page]);

  return {
    data: allData,
    error,
    fetchMore,
  };
}
