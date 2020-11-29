import useSWR from 'swr';
import api from '~/services/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useFetch<Data = any, Error = any>(url: string | null) {
  const { data, error } = useSWR<Data, Error>(url, fetcher, {
    revalidateOnMount: true,
  });

  return { data, error };
}
