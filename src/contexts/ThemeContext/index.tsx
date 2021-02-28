import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Appearance, ColorSchemeName } from 'react-native-appearance';
import { palette } from '~/utils/StyleGuide';
import SplashScreen from 'react-native-splash-screen';

export type PalleteType = {
  primary: string;
  secondary: string;
  light: string;
  background: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  border: string;
  app: string;
};

type ContextProps = {
  mode: ColorSchemeName;
  theme: ColorSchemeName;
  setTheme: (mode: ColorSchemeName) => void;
  palette: PalleteType;
};
const ThemeContext = createContext<ContextProps>({
  mode: 'dark',
  theme: 'dark',
  setTheme: () => null,
  palette: palette.dark,
});

export const ThemeProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme();
  const [mode, setMode] = useState<ColorSchemeName>(colorScheme || 'dark');
  const [_mode, _setMode] = useState<ColorSchemeName>(undefined);

  const { getItem, setItem } = useAsyncStorage('@radios:theme');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (mode === 'no-preference') {
        _setMode(colorScheme);
      }
    });

    return () => subscription.remove();
  }, [mode]);

  const readThemeFromStorage = useCallback(async () => {
    const modeFromStorage = await getItem();

    if (modeFromStorage) {
      const mode = modeFromStorage as ColorSchemeName;

      setTheme(mode);
      return;
    }

    setTheme(colorScheme || 'no-preference');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (mode: ColorSchemeName) => {
    _setMode(mode !== 'no-preference' ? mode : colorScheme || 'dark');

    setMode(mode);
    setItem(mode);
  };

  useEffect(() => {
    readThemeFromStorage();
  }, [readThemeFromStorage]);

  useEffect(() => {
    if (_mode) {
      setTimeout(SplashScreen.hide, 500);
    }
  }, [_mode]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        theme: mode,
        mode: _mode,
        palette: _mode === 'light' ? palette.light : palette.dark,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
