import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { Appearance } from 'react-native-appearance';
import { palette } from '~/utils/StyleGuide';

type ContextProps = {
  mode: 'light' | 'dark';
  setTheme: (mode?: ColorSchemeName) => void;
  palette: {
    primary: string;
    secondary: string;
    light: string;
    background: string;
    backgroundPrimary: string;
    backgroundSecondary: string;
    border: string;
    app: string;
  };
};
const ThemeContext = createContext<ContextProps>({
  mode: 'dark',
  setTheme: () => null,
  palette: palette.dark,
});

export const ThemeProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark'>(colorScheme || 'dark');
  const { getItem, setItem } = useAsyncStorage('@radios:mode');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme === 'no-preference') {
        return;
      }

      setMode(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const readThemeFromStorage = useCallback(async () => {
    const radioPlayingFromStorage = await getItem();

    if (radioPlayingFromStorage) {
      setMode(mode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (mode: ColorSchemeName) => {
    const newTheme = mode || colorScheme || 'dark';

    setMode(newTheme);
    setItem(newTheme);
  };

  useEffect(() => {
    readThemeFromStorage();
  }, [readThemeFromStorage]);

  return (
    <ThemeContext.Provider value={{ setTheme, mode, palette: palette[mode] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
