import { useMemo } from 'react';
import { useTheme } from '~/contexts/ThemeContext';

function useStyles(getStyles) {
  const { palette } = useTheme();

  const styles = useMemo(() => {
    return getStyles(palette);
  }, [palette, getStyles]);

  return styles;
  // return getStyles(palette.dark);
}

export default useStyles;
