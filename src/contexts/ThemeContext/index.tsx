import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { Appearance, ColorSchemeName } from 'react-native-appearance';
import { palette } from '~/utils/StyleGuide';

type ContextProps = {
  mode: ColorSchemeName;
  setTheme: (mode: ColorSchemeName) => void;
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
  const [mode, setMode] = useState<ColorSchemeName>(colorScheme || 'dark');
  const { getItem, setItem } = useAsyncStorage('@radios:theme');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setMode(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const readThemeFromStorage = useCallback(async () => {
    const radioPlayingFromStorage = await getItem();

    if (radioPlayingFromStorage) {
      setMode(radioPlayingFromStorage as ColorSchemeName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (mode: ColorSchemeName) => {
    setMode(mode);
    setItem(mode);
  };

  useEffect(() => {
    readThemeFromStorage();
  }, [readThemeFromStorage]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        mode,
        palette: mode === 'light' ? palette.light : palette.dark,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
