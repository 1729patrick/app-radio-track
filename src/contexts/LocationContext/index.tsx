import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import Countries, { CountriesHandler } from '~/components/Countries';
import Loader from '~/components/Loader';
import Modal, { ModalHandler } from '~/components/Modal/FlatList';
import { useFetch } from '~/hooks/useFetch';
import COUNTRIES from '~/data/countries';

export enum STATES {
  EMPTY = 'empty',
  REQUEST_LATER = 'request-later',
}

export type RegionsType = { id: string; name: string }[];

type ContextProps = {
  regionId: string;
  regions: RegionsType;
  setRegionId: (regionId: string) => void;
  showCountries: () => void;
};

const LocationContext = createContext<ContextProps>({
  regionId: '',
  regions: [],
  setRegionId: () => {},
  showCountries: () => {},
});

export const LocationProvider: React.FC = ({ children }) => {
  const [countryId, setCountryId] = useState('');
  const [regionId, setRegionId] = useState<STATES | string>('');

  const { getItem, setItem } = useAsyncStorage('@location:location');

  const [loading, setLoading] = useState(false);

  const modalRef = useRef<ModalHandler>(null);
  const countriesRef = useRef<CountriesHandler>(null);

  const regions = useFetch<RegionsType>(`/regions/${countryId}`);

  useEffect(() => {
    countriesRef.current?.setCountryId(countryId);
  }, [countryId]);

  const showCountries = () => {
    modalRef.current?.show();
  };

  const updateStorage = ({
    countryId,
    regionId,
  }: {
    countryId: string;
    regionId: string;
  }) => {
    setItem(JSON.stringify({ countryId, regionId }));
  };

  const onConfirm = () => {
    const countryId = countriesRef.current?.countryId || '';

    updateStorage({
      countryId,
      regionId,
    });

    setCountryId(countryId);
  };

  const onSetRegionId = (regionId: string) => {
    updateStorage({ regionId, countryId });

    setRegionId(regionId);
  };

  const readLocationFromStorage = useCallback(async () => {
    const location = await getItem();
    if (location) {
      const { regionId, countryId } = JSON.parse(location);

      console.log({ regionId, countryId });
      setRegionId(regionId);
    }
  }, [getItem]);

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
      {loading && <Loader />}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
