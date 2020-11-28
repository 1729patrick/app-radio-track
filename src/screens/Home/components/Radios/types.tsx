import React, { useEffect, useMemo } from 'react';
import { PlayerState } from '~/components/Player';
import { useFavorites } from '~/contexts/FavoriteContext';
import { useFetchPagination } from '~/hooks/useFetchPagination';
import Radios from '.';

type TypesProps = {
  toggleLoading: (args: { key: string; value: boolean }) => void;
  onExpandPlayer: (args: PlayerState & { radioIndex: number }) => void;
  showAll?: boolean;
  onShowAll?: (args: { title: string; url: string }) => void;
  onEndReached?: () => void;
};

export const FavoriteRadios: React.FC<TypesProps> = (props) => {
  const { favorites } = useFavorites();

  return <Radios {...props} title="Suas rádios favoritas" radios={favorites} />;
};

export const RecommendRadios: React.FC<TypesProps> = ({
  toggleLoading,
  onShowAll,
  ...props
}) => {
  const url = useMemo(() => 'playlists/recommend', []);
  const recommend = useFetchPagination(url, true);

  useEffect(() => {
    toggleLoading({ key: 'recommend', value: !!recommend.data?.items?.length });
  }, [recommend.data, toggleLoading]);

  return (
    <Radios
      {...props}
      title="Rádios recomendadas"
      radios={recommend.data?.items}
      onEndReached={recommend.fetchMore}
      onShowAll={(title) => onShowAll && onShowAll({ title, url })}
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
  const url = useMemo(() => 'playlists/location', []);
  const location = useFetchPagination(url, true);

  useEffect(() => {
    toggleLoading({ key: 'location', value: !!location.data?.items?.length });
  }, [location.data, toggleLoading]);

  return (
    <Radios
      {...props}
      title="Rádios da sua região"
      radios={location.data?.items}
      onEndReached={location.fetchMore}
      onShowAll={(title) => onShowAll && onShowAll({ title, url })}
    />
  );
};

export const FindOutRadios: React.FC<TypesProps> = ({
  toggleLoading,
  onShowAll,
  ...props
}) => {
  const url = useMemo(() => 'playlists/random', []);
  const random = useFetchPagination(url, true);

  useEffect(() => {
    toggleLoading({ key: 'random', value: !!random.data?.items?.length });
  }, [random.data, toggleLoading]);

  return (
    <Radios
      {...props}
      title="Descubra novas rádios"
      radios={random.data?.items}
      onEndReached={random.fetchMore}
      onShowAll={(title) => onShowAll && onShowAll({ title, url })}
    />
  );
};
