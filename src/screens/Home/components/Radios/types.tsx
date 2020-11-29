import React, { useEffect, useMemo } from 'react';
import { onExpandPlayer, PlayerState } from '~/components/Player';
import { useFavorites } from '~/contexts/FavoriteContext';
import { useFetchPagination } from '~/hooks/useFetchPagination';
import Radios from '.';

type TypesProps = {
  toggleLoading: (args: { key: string; value: boolean }) => void;
  onExpandPlayer: onExpandPlayer;
  showAll?: boolean;
  onShowAll?: (args: {
    title: string;
    url: string;
    initialPage: number;
  }) => void;
  onEndReached?: () => void;
};

export const FavoriteRadios: React.FC<TypesProps> = ({
  onShowAll: _,
  toggleLoading,
  ...props
}) => {
  const { favorites } = useFavorites();

  useEffect(() => {
    toggleLoading({ key: 'favorites', value: !!favorites.length });
  }, [favorites, toggleLoading]);

  if (!favorites.length) {
    return null;
  }

  return <Radios {...props} title="Suas rádios favoritas" radios={favorites} />;
};

export const RecommendRadios: React.FC<TypesProps> = ({
  toggleLoading,
  onShowAll,
  ...props
}) => {
  const initialPage = useMemo(() => new Date().getDate() + 20, []);
  const url = useMemo(() => 'playlists/recommend', []);
  const recommend = useFetchPagination(url, initialPage);

  useEffect(() => {
    toggleLoading({ key: 'recommend', value: !!recommend.data?.items?.length });
  }, [recommend.data, toggleLoading]);

  return (
    <Radios
      {...props}
      title="Rádios recomendadas"
      radios={recommend.data?.items}
      onEndReached={recommend.fetchMore}
      onShowAll={(title) => onShowAll && onShowAll({ title, url, initialPage })}
    />
  );
};

export const PopularRadios: React.FC<TypesProps> = ({
  toggleLoading,
  onShowAll,
  ...props
}) => {
  const url = useMemo(() => 'playlists/popular', []);
  const popular = useFetchPagination(url);

  useEffect(() => {
    toggleLoading({ key: 'popular', value: !!popular.data?.items?.length });
  }, [popular.data, toggleLoading]);

  return (
    <Radios
      {...props}
      title="Rádios populares"
      radios={popular.data?.items}
      onEndReached={popular.fetchMore}
      onShowAll={(title) => onShowAll && onShowAll({ title, url })}
    />
  );
};

export const LocationRadios: React.FC<TypesProps> = ({
  toggleLoading,
  onShowAll,
  ...props
}) => {
  const initialPage = useMemo(() => new Date().getDate() + 10, []);
  const url = useMemo(() => 'playlists/location', []);
  const location = useFetchPagination(url, initialPage);

  useEffect(() => {
    toggleLoading({
      key: 'location',
      value: !!location.data?.items?.length,
    });
  }, [location.data, toggleLoading]);

  return (
    <Radios
      {...props}
      title="Rádios da sua região"
      radios={location.data?.items}
      onEndReached={location.fetchMore}
      onShowAll={(title) => onShowAll && onShowAll({ title, url, initialPage })}
    />
  );
};

export const FindOutRadios: React.FC<TypesProps> = ({
  toggleLoading,
  onShowAll,
  ...props
}) => {
  const initialPage = useMemo(() => new Date().getDate() + 15, []);
  const url = useMemo(() => 'playlists/random', []);
  const random = useFetchPagination(url, initialPage);

  useEffect(() => {
    toggleLoading({ key: 'random', value: !!random.data?.items?.length });
  }, [random.data, toggleLoading]);

  return (
    <Radios
      {...props}
      title="Descubra novas rádios"
      radios={random.data?.items}
      onEndReached={random.fetchMore}
      onShowAll={(title) => onShowAll && onShowAll({ title, url, initialPage })}
    />
  );
};
