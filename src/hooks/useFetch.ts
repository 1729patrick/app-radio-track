import useSWR from 'swr';
import { useLocation } from '~/contexts/LocationContext';
import api from '~/services/api';

const fetcher = (url: string) => {
  console.log({ url });
  return api.get(url).then((res) => res.data);
};

export function useFetch<Data = any, Error = any>(
  url: string | null,
  ignoreCountry = false,
) {
  const { regionId, country } = useLocation();

  const { data, error } = useSWR<Data, Error>(
    (ignoreCountry || country.code) && url
      ? `${url}${url.includes('?') ? '&' : '?'}countryCode=${
          country.code
        }&regionId=${regionId}`
      : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
    },
  );

  //todo
  //@ts-ignore
  return { data: data?.items, error };
}
