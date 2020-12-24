import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import RectButton from '~/components/Buttons/RectButton';

type ContextProps = {};
const IapContext = createContext<ContextProps>({});

const itemSkus = ['p1p2p3p4p5p6', 'id123321', 'p1p2p3p4p5p6p7'];
const itemSubs = ['mensal_sub'];

export const IapProvider: React.FC = ({ children }) => {
  const requestPurchase = useCallback((sku): void => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }, []);

  const requestSubscription = useCallback((sku): void => {
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }, []);

  const getAvailablePurchases = useCallback(async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      console.log('Available purchases :: ', purchases.length, purchases);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }, []);

  const getItems = useCallback(async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      console.log('Products :: ', products.length, products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }, []);

  const getSubscriptions = useCallback(async () => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('Subs :: ', products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }, []);

  const prepare = useCallback(async () => {
    try {
      await RNIap.initConnection();
      // await RNIap.consumeAllItemsAndroid();

      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();

      getItems();

      getSubscriptions();

      getAvailablePurchases();
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }, [getAvailablePurchases, getItems, getSubscriptions]);

  useEffect(() => {
    const purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
      },
    );

    return () => purchaseErrorSubscription.remove();
  }, []);

  useEffect(() => {
    prepare();
  }, [prepare]);

  useEffect(() => {
    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        console.log(JSON.stringify(purchase));
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            // const ackResult = await finishTransaction(purchase);
            // console.log({ ackResult });
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }
        }
      },
    );

    return () => purchaseUpdateSubscription.remove();
  }, []);

  return (
    <>
      <RectButton
        onPress={() => requestPurchase(itemSkus[0])}
        title="Purchase PRODUCT"
      />
      <RectButton
        onPress={() => requestSubscription(itemSubs[0])}
        title="Purchase SUBS"
      />
    </>
  );

  return <IapContext.Provider value={{}}>{children}</IapContext.Provider>;
};

export const useIAP = () => useContext(IapContext);
//https://github.com/dooboolab/react-native-iap/issues/1118
