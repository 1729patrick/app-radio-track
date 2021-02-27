import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import {
  finishTransaction,
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
} from 'react-native-iap';
import toast from '~/services/toast';
import IAP from '~/utils/IAP';

type ContextProps = {
  isPremium?: boolean;
};

const IAPContext = createContext<ContextProps>({
  isPremium: undefined,
});

export const IAPProvider: React.FC = ({ children }) => {
  const [isPremium, setIsPremium] = useState<boolean | undefined>(undefined);

  const onUpdate = async (purchase: InAppPurchase | SubscriptionPurchase) => {
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      try {
        await finishTransaction(purchase);
        setIsPremium(true);
        toast.success({
          message: 'Obrigado!! Agora você é Radio Online Premium.',
        });
      } catch (ackErr) {
        toast.error({
          message: 'Sua subscrição foi recusada! Tente novamente mais tarde.',
        });
      }
    }
  };

  const onError = (error: PurchaseError) => {
    if (error.code === 'E_USER_CANCELLED') {
      return;
    }

    toast.error({
      message: 'Sua subscrição foi recusada! Tente novamente mais tarde.',
    });
  };

  const init = useCallback(async () => {
    await IAP.init(onUpdate, onError);
    const purchases = await IAP.getAvailablePurchases();
    setIsPremium((purchases?.length || 0) > 0);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <IAPContext.Provider value={{ isPremium }}>{children}</IAPContext.Provider>
  );
};

export const useIAP = () => useContext(IAPContext);
