import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { RadioType } from '~/types/Station';

type ContextProps = {
  addFavorite: (arg: RadioType) => void;
  removeFavorite: (arg: RadioType) => void;
  isFavorite: (arg: RadioType) => boolean;
  favorites: RadioType[];
};

const FavoriteContext = createContext<ContextProps>({
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  favorites: [],
});

export const FavoriteProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<RadioType[]>([]);
  const { getItem, setItem } = useAsyncStorage('@playlists:favorites');

  const addFavorite = (favorite: RadioType) => {
    const newFavorites = [...favorites, favorite];
    setFavorites(newFavorites);

    setItem(JSON.stringify(newFavorites));
  };

  const removeFavorite = (favorite: RadioType) => {
    const newFavorites = favorites.filter((radio) => radio.id !== favorite.id);
    setFavorites(newFavorites);

    setItem(JSON.stringify(newFavorites));
  };

  const isFavorite = (favorite: RadioType): boolean => {
    return !!favorites.find((radio) => radio.id === favorite.id);
  };

  const readFavoritesFromStorage = useCallback(async () => {
    const favoritesFromStorage = await getItem();
    if (favoritesFromStorage) {
      setFavorites(JSON.parse(favoritesFromStorage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    readFavoritesFromStorage();
  }, [readFavoritesFromStorage]);

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
