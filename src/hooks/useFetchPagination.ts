import { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useLocation } from '~/contexts/LocationContext';
import api from '~/services/api';
import { FetchWithPagination } from '~/types/Fetch';

const fetcher = (url: string) => {
  console.log({ url });
  return api.get(url).then((res) => res.data);
};

export function useFetchPagination<Error = any>(
  url: string | null,
  initialPage?: number,
) {
  const [page, setPage] = useState(initialPage || 1);
  const [allData, setAllData] = useState<FetchWithPagination>();
  const { regionId, country } = useLocation();
  const indexesMapRef = useRef<any>({});

  const { data, error } = useSWR<FetchWithPagination, Error>(
    country.code && url
      ? page
        ? `${url}?page=${page}&countryCode=${country.code}&regionId=${regionId}`
        : `${url}?countryCode=${country.code}&regionId=${regionId}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
    },
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setAllData((all) => {
      const newItems = data?.items.filter(
        ({ id }) => !indexesMapRef.current[id],
      );

      data?.items.forEach(({ id }) => (indexesMapRef.current[id] = true));

      const items = [...(all?.[country.id]?.items || []), ...(newItems || [])];

      return { ...all, [country.id]: { ...data, items } };
    });
  }, [data, country.id]);

  const fetchMore = useCallback(() => {
    if (!country.id) {
      return;
    }

    setPage(allData?.[country.id]?.nextPage || page);
  }, [allData, country.id, page]);

  return {
    data: allData?.[country.id],
    error,
    fetchMore,
  };
}
