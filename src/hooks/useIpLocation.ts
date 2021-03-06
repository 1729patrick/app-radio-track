import countries from '~/data/countries';
import api from '~/services/api';

const useIpLocation = () => {
  const getCountryCode = (ip: string) => {
    return new Promise<string>(async (resolve) => {
      try {
        const { data } = await api.get(
          `http://api.ipstack.com/${ip}?access_key=06511ed27f1002fa522746cbbc0e1540`,
        );

        const countryCode = data?.country_code?.toLowerCase();

        const country = countries.find(({ code }) => code === countryCode);

        resolve(country?.id || 'brazil');
      } catch (e) {
        // reject(e);
      }
    });
  };

  return { getCountryCode };
};

export default useIpLocation;
