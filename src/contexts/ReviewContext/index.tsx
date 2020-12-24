import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import Review, { ReviewHandler } from '~/components/Review';
import { useHistory } from '../HistoryContext';
import InAppReview from 'react-native-in-app-review';

import { usePlaying } from '../PlayingContext';
type ContextProps = {};

const ReviewContext = createContext<ContextProps>({});

const limitsToRequest = [5, 20, 35, 50, 75, 100, 125, 150, 175, 200];

import api from '~/services/api';

import DeviceInfo from 'react-native-device-info';

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
      api.post('app/reviews', {
        ...args,
        deviceId,
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

  const onDismiss = useCallback(() => {
    setLastCount(countRef.current?.toString());
  }, [setLastCount]);

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
    if (
      !reviewFromStorage &&
      InAppReview.isAvailable() &&
      +lastCount < countRef.current
    ) {
      reviewRef.current?.show(countRef.current);
    }
  }, [getHistory, getItem, getLastCount]);

  useEffect(() => {
    // checkToShow();
    reviewRef.current?.show(10);
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
