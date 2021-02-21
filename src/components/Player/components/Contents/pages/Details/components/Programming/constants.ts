import { lighten } from 'polished';
import StyleGuide, { palette } from '~/utils/StyleGuide';

export const TIMING_DURATION = 200;
export const BACKGROUND_COLOR = lighten(0.05, palette.dark.backgroundSecondary);
export const CARD_PADDING = StyleGuide.spacing * 2;
