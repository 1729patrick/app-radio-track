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

  const { data, error } = useSWR<FetchWithPagination, Error>(
    () => (page ? `${url}?page=${page}` : url),
    async (url) => {
      const response = await api.get(url);

      return response.data;
    },
    { revalidateOnMount: true },
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setPage((page) => (!page ? data.page + 1 : page));

    setAllData((all) => {
      const items = [...(all?.items || []), ...(data?.items || [])];

      return { ...data, items };
    });
  }, [data]);

  return {
    data: allData,
    error,
    fetchMore: () => setPage((p) => p + 1),
  };
}
