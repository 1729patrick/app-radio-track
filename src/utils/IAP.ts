import { Alert, Platform } from 'react-native';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

const itemSkus = Platform.select({
  ios: ['one_month_vip'],
  android: ['one_month_vip'],
}) as string[];

const itemSubs = Platform.select({
  ios: ['mensal_sub'],
  android: [
    'mensal_sub', // subscription
  ],
}) as string[];

class IAP {
  init(onUpdate, onError) {
    return new Promise(async (resolve, reject) => {
      try {
        await RNIap.initConnection();
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid();

        this.getProducts();
        this.getSubscriptions();
      } catch (err) {
        Alert.alert('purchase error', JSON.stringify(err));
        reject();
      }

      purchaseUpdatedListener(onUpdate);

      purchaseErrorListener(onError);
      resolve('');
    });
  }

  getProducts = async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);

      return products;
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  getSubscriptions = async () => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);

      return products;
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  getAvailablePurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();

      return purchases;
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  // Version 3 apis
  requestPurchase = async (sku): void => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      // Alert.alert(err.message);
    }
  };

  requestSubscription = async (sku): void => {
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      // Alert.alert(err.message);
    }
  };
}

export default new IAP();
