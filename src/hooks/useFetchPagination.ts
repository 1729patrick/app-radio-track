import { useEffect, useState } from 'react';
import useSWR from 'swr';
import api from '~/services/api';
import { FetchWithPagination } from '~/types/Fetch';

export function useFetchPagination<Error = any>(
  url: string | null,
  random = false,
) {
  const [page, setPage] = useState(random ? undefined : 1);
  const [allData, setAllData] = useState<FetchWithPagination>();

  const fetcher = (url: string) => api.get(url).then((res) => res.data);

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

  return {
    data: allData,
    error,
    fetchMore: () =>
      setPage((page) => (!page ? (data?.page || 0) + 1 : page + 1)),
  };
}
