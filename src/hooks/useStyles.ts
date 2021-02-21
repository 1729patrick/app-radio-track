import { useMemo } from 'react';
import { useTheme } from '~/contexts/ThemeContext';

function useStyles(getStyles) {
  const { palette } = useTheme();

  const styles = useMemo(() => {
    return getStyles(palette);
  }, [getStyles, palette]);

  return styles;
}

export default useStyles;
