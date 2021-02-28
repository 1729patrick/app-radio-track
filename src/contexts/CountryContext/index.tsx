import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Counties from '~/components/Countries';
import Loader from '~/components/Loader';
import Modal, { ModalHandler } from '~/components/Modal/FlatList';

type ContextProps = {
  show: () => void;
  countryId: string;
};

const CountryContext = createContext<ContextProps>({
  show: () => null,
  countryId: '',
});

export const CountryProvider: React.FC = ({ children }) => {
  const [_countryId, _setCountryId] = useState('');
  const [countryId, setCountryId] = useState('');
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<ModalHandler>(null);

  const show = () => {
    modalRef.current?.show();
  };

  const onConfirm = () => {
    // if (countryId === _countryId) {
    //   return;
    // }
    // setLoading(true);
    // setCountryId(_countryId);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
  };

  return (
    <CountryContext.Provider value={{ show, countryId }}>
      {children}
      <Modal
        ref={modalRef}
        onContinue={onConfirm}
        title={'Selecione o País'}
        confirm={'OK'}>
        <Counties countryId={_countryId} setCountryId={_setCountryId} />
      </Modal>
      {loading && <Loader />}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
