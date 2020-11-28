import React, { useEffect } from 'react';
import { useFavorites } from '~/contexts/FavoriteContext';
import { useFetchPagination } from '~/hooks/useFetchPagination';
import Radios from '.';
import { onExpandPlayer } from '~/components/Player';

type FavoritesRadiosProps = {
  onExpandPlayer: onExpandPlayer;
  toggleLoading: (args: { key: string; value: boolean }) => void;
};

export const FavoriteRadios: React.FC<FavoritesRadiosProps> = ({
  onExpandPlayer,
}) => {
  const { favorites } = useFavorites();

  return (
    <Radios
      title="Suas rádios favoritas"
      radios={favorites}
      onExpandPlayer={onExpandPlayer}
    />
  );
};

export const RecommendRadios: React.FC<FavoritesRadiosProps> = ({
  onExpandPlayer,
  toggleLoading,
}) => {
  const recommend = useFetchPagination('playlists/recommend', true);

  useEffect(() => {
    toggleLoading({ key: 'recommend', value: !!recommend.data?.items?.length });
  }, [recommend.data, toggleLoading]);

  return (
    <Radios
      title="Rádios recomendadas"
      radios={recommend.data?.items}
      onExpandPlayer={onExpandPlayer}
      onEndReached={recommend.fetchMore}
    />
  );
};

export const PopularRadios: React.FC<FavoritesRadiosProps> = ({
  onExpandPlayer,
  toggleLoading,
}) => {
  const popular = useFetchPagination('playlists/popular');

  useEffect(() => {
    toggleLoading({ key: 'popular', value: !!popular.data?.items?.length });
  }, [popular.data, toggleLoading]);

  return (
    <Radios
      title="Rádios populares"
      radios={popular.data?.items}
      onExpandPlayer={onExpandPlayer}
      onEndReached={popular.fetchMore}
    />
  );
};

export const LocationRadios: React.FC<FavoritesRadiosProps> = ({
  onExpandPlayer,
  toggleLoading,
}) => {
  const location = useFetchPagination('playlists/location', true);

  useEffect(() => {
    toggleLoading({ key: 'location', value: !!location.data?.items?.length });
  }, [location.data, toggleLoading]);

  return (
    <Radios
      title="Rádios da sua região"
      radios={location.data?.items}
      onExpandPlayer={onExpandPlayer}
      onEndReached={location.fetchMore}
    />
  );
};

export const FindOutRadios: React.FC<FavoritesRadiosProps> = ({
  onExpandPlayer,
  toggleLoading,
}) => {
  const random = useFetchPagination('playlists/random', true);

  useEffect(() => {
    toggleLoading({ key: 'random', value: !!random.data?.items?.length });
  }, [random.data, toggleLoading]);

  return (
    <Radios
      title="Descubra novas rádios"
      radios={random.data?.items}
      onExpandPlayer={onExpandPlayer}
      onEndReached={random.fetchMore}
    />
  );
};
