import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import DeviceInfo from 'react-native-device-info';
import Review, { ReviewHandler } from '~/components/Review';
import { useHistory } from '../HistoryContext';

import { usePlaying } from '../PlayingContext';
type ContextProps = {};

const ReviewContext = createContext<ContextProps>({});

const limitsToRequest = [
  5,
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  110,
  120,
  130,
  140,
  150,
  160,
  170,
  180,
  190,
  200,
];

import api from '~/services/api';

export const ReviewProvider: React.FC = ({ children }) => {
  const { getItem, setItem } = useAsyncStorage('@radios:review');
  const { getItem: getLastCount, setItem: setLastCount } = useAsyncStorage(
    '@radios:review:count',
  );

  const countRef = useRef(0);
  const { playingRadioId } = usePlaying();
  const { getHistory } = useHistory();

  const reviewRef = useRef<ReviewHandler>(null);

  const onSaveReview = useCallback(
    async (args: { starLevel: number; notes?: string }) => {
      setItem(JSON.stringify(args));

      const deviceId = await DeviceInfo.getUniqueId();
      const model = await DeviceInfo.getDevice();
      const name = await DeviceInfo.getDeviceName();

      api.post('app/reviews', {
        ...args,
        device: {
          model,
          name,
          id: deviceId,
        },
        historyCount: countRef.current,
      });
    },
    [setItem],
  );

  const onConfirm = useCallback(
    (args: { starLevel: number; notes: string }) => {
      onSaveReview(args);
    },
    [onSaveReview],
  );

  const onRateApp = useCallback(
    (args: { starLevel: number }) => {
      onSaveReview(args);
    },
    [onSaveReview],
  );

  const onDismiss = useCallback(() => {}, []);

  const checkToShow = useCallback(async () => {
    const historyLength = getHistory()?.length;
    const limitBreak = limitsToRequest.findIndex(
      (length) => length === historyLength,
    );

    if (limitBreak < 0) {
      return;
    }

    const reviewFromStorage = await getItem();

    const lastCount = (await getLastCount()) || 0;
    countRef.current = limitsToRequest[limitBreak];

    if (!reviewFromStorage && +lastCount < countRef.current) {
      setLastCount(countRef.current?.toString());
      reviewRef.current?.show(countRef.current);
    }
  }, [getHistory, getItem, getLastCount, setLastCount]);

  useEffect(() => {
    checkToShow();
  }, [checkToShow, playingRadioId]);

  return (
    <ReviewContext.Provider value={{}}>
      {children}
      <Review
        onConfirm={onConfirm}
        onRateApp={onRateApp}
        onDismiss={onDismiss}
        ref={reviewRef}
      />
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);
