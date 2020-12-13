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

const limitsToRequest = [10, 25, 50, 75, 100];

import api from '~/services/api';

export const ReviewProvider: React.FC = ({ children }) => {
  const { getItem, setItem } = useAsyncStorage('@radios:review');

  const { playingRadioId } = usePlaying();
  const { getHistory } = useHistory();

  const reviewRef = useRef<ReviewHandler>(null);

  const onSaveReview = useCallback(
    (args: { starLevel: number; notes: string }) => {
      setItem(JSON.stringify(args));
      api.post('app/reviews', args);
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
    if (!reviewFromStorage && InAppReview.isAvailable()) {
      reviewRef.current?.show(limitsToRequest[limitBreak]);
    }
  }, [getHistory, getItem]);

  useEffect(() => {
    checkToShow();
  }, [checkToShow, getHistory, playingRadioId]);

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
