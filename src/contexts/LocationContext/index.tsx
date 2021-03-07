import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import Countries, { CountriesHandler } from '~/components/Countries';
import Modal, { ModalHandler } from '~/components/Modal/FlatList';
import { useFetch } from '~/hooks/useFetch';
import COUNTRIES from '~/data/countries';
import useIpLocation from '~/hooks/useIpLocation';
import countries from '~/data/countries';

export enum STATES {
  EMPTY = 'empty',
  REQUEST_LATER = 'request-later',
}

type RegionType = { id?: string; name?: string; code?: string };

export type RegionsType = RegionType[];

type ContextProps = {
  regionId: string;
  regions: RegionsType;
  setRegionId: (regionId: string) => void;
  showCountries: () => void;
  country: RegionType;
  region: RegionType;
};

const LocationContext = createContext<ContextProps>({
  regionId: '',
  regions: [],
  setRegionId: () => {},
  showCountries: () => {},
  country: {},
  region: {},
});

export const LocationProvider: React.FC = ({ children }) => {
  const [countryId, setCountryId] = useState('');
  const [regionId, setRegionId] = useState<STATES | string>('');

  const { getCountryCode } = useIpLocation();

  const { getItem, setItem } = useAsyncStorage('@location:location');

  const modalRef = useRef<ModalHandler>(null);
  const countriesRef = useRef<CountriesHandler>(null);

  const country = useMemo<RegionType>(() => {
    return countries.find(({ id }) => id === countryId) || {};
  }, [countryId]);

  const regions = useFetch<RegionsType>(
    countryId ? `regions/${countryId}` : null,
    true,
  );

  const region = useMemo<RegionType>(() => {
    return regions.data?.find(({ id }) => id === regionId) || {};
  }, [regionId, regions]);

  useEffect(() => {
    countriesRef.current?.setCountryId(countryId);
  }, [countryId]);

  const showCountries = () => {
    modalRef.current?.show();
  };

  const updateStorage = useCallback(
    ({ countryId, regionId }: { countryId: string; regionId: string }) => {
      console.log('updateStorage', { countryId, regionId });

      setItem(JSON.stringify({ countryId, regionId }));
    },
    [setItem],
  );

  const onConfirm = useCallback(() => {
    const newCountryId = countriesRef.current?.countryId || '';

    updateStorage({
      countryId: newCountryId,
      regionId,
    });

    setCountryId(newCountryId);
  }, [regionId, updateStorage]);

  const onSetRegionId = useCallback(
    (regionId: string) => {
      updateStorage({ regionId, countryId });

      setRegionId(regionId);
    },
    [countryId, updateStorage],
  );

  const readLocationFromStorage = useCallback(async () => {
    const location = await getItem();
    let { regionId, countryId } = { regionId: '', countryId: '' };

    if (location) {
      ({ regionId, countryId } = JSON.parse(location));
    }

    setRegionId(
      regionId && regionId !== STATES.REQUEST_LATER ? regionId : STATES.EMPTY,
    );
    // setRegionId(STATES.EMPTY);

    if (!countryId) {
      countryId = await getCountryCode();
    }

    console.log('readLocationFromStorage', { countryId, regionId });
    setCountryId(countryId);
  }, [getCountryCode, getItem]);

  useEffect(() => {
    readLocationFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocationContext.Provider
      value={{
        regionId,
        setRegionId: onSetRegionId,
        regions: regions.data || [],
        showCountries,
        country,
        region,
      }}>
      {children}
      <Modal
        ref={modalRef}
        onContinue={onConfirm}
        title={'Selecione o País'}
        confirm={'OK'}
        itemHeight={57.5}
        itemsSize={COUNTRIES.length}>
        <Countries ref={countriesRef} />
      </Modal>
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
