import { useMemo } from 'react';
import { useTheme } from '~/contexts/ThemeContext';

function useStyles<T>(getStyles: T): T {
  const { palette } = useTheme();

  const styles = useMemo(() => {
    return getStyles(palette);
  }, [palette, getStyles]);

  return styles;
  // return getStyles(palette.dark);
}

export default useStyles;
