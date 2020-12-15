import React, { createContext, useContext, useEffect } from 'react';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import RectButton from '~/components/Buttons/RectButton';

type ContextProps = {};
const IapContext = createContext<ContextProps>({});

const itemSkus = ['unique_purchase'];
const itemSubs = ['21221'];

export const IapProvider: React.FC = ({ children }) => {
  const requestPurchase = async (sku): void => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const getAvailablePurchases = async () => {
    try {
      console.info(
        'Get available purchases (non-consumable or unconsumed consumable)',
      );
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases :: ', purchases);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const getItems = async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      // const products = await RNIap.getSubscriptions(itemSkus);
      console.log('Products', products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const getSubscriptions = async () => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('Subs', products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const prepare = async () => {
    try {
      const result = await RNIap.initConnection();

      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      getItems();
      getSubscriptions();

      getAvailablePurchases();
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  useEffect(() => {
    prepare();
  }, [prepare]);

  return (
    <RectButton onPress={() => requestPurchase(itemSkus[0])} title="Purchase" />
  );

  return <IapContext.Provider value={{}}>{children}</IapContext.Provider>;
};

export const useIAP = () => useContext(IapContext);
