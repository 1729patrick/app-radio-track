import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { HEADER_HEIGHT } from '~/components/Header/constants';

type HeaderScroll = {
  translateY: Animated.SharedValue<number>;
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

type ScrollHandlerContext = {
  upTranslateY: number;
  downTranslateY: number;
  upOffsetY: number;
  downOffsetY: number;
  startY: number;
};

function useAnimatedHeader(): HeaderScroll {
  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler<ScrollHandlerContext>(
    {
      onBeginDrag: (_, context) => {
        context.upTranslateY = context.upTranslateY || 0;
        context.upOffsetY = context.upOffsetY || 0;
      },
      onScroll: (event, context) => {
        if (context.startY < event.contentOffset.y) {
          const offsetY = Math.max(event.contentOffset.y, 0);
          const { downOffsetY, downTranslateY } = context;

          const y = offsetY - downOffsetY - downTranslateY;

          context.upTranslateY = Math.min(y, HEADER_HEIGHT);

          context.upOffsetY = offsetY;

          translateY.value = -context.upTranslateY;
        } else {
          const offsetY = Math.max(event.contentOffset.y, 0);
          const { upOffsetY, upTranslateY } = context;
          const y = upOffsetY - offsetY - upTranslateY;

          context.downTranslateY = Math.min(y, 0);

          context.downOffsetY = offsetY;

          translateY.value = context.downTranslateY;
        }

        context.startY = event.contentOffset.y;
      },
    },
    [],
  );

  return { translateY, scrollHandler };
}

export default useAnimatedHeader;
