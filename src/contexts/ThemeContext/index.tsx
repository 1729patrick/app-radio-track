import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { Appearance, ColorSchemeName } from 'react-native-appearance';
import FastImage from 'react-native-fast-image';
import Logo from '~/components/Logo';
import { palette } from '~/utils/StyleGuide';

type ContextProps = {
  mode: ColorSchemeName;
  theme: ColorSchemeName;
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

    setTheme(colorScheme || 'dark');
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

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        theme: mode,
        mode: _mode,
        palette: _mode === 'light' ? palette.light : palette.dark,
      }}>
      {children}
      {!_mode && (
        <View style={[StyleSheet.absoluteFill, styles.splashScreen]}>
          <Logo />
        </View>
      )}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const styles = StyleSheet.create({
  splashScreen: {
    backgroundColor: '#222326',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
