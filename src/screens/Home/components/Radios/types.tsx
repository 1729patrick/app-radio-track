import React, { useEffect } from 'react';
import { onExpandPlayer } from '~/components/Player';
import { useFavorites } from '~/contexts/FavoriteContext';
import { useFetchPagination } from '~/hooks/useFetchPagination';
import Radios from '.';

type TypesProps = {
  onExpandPlayer: onExpandPlayer;
  showAll?: boolean;
  onShowAll?: (args: {
    title: string;
    url: string;
    initialPage?: number;
    initialPageAllList?: number;
  }) => void;
  onEndReached?: () => void;
};

type PlaylistType = {
  playlist: {
    url: string;
    key: string;
    title: string;
    initialPage?: number;
    initialPageAllList?: number;
  };
  toggleState: (args: { key: string; success: boolean; error: string }) => void;
  param?: string;
};

export const FavoriteRadios: React.FC<TypesProps> = ({
  onShowAll: _,
  ...props
}) => {
  const { favorites } = useFavorites();

  if (!favorites.length) {
    return null;
  }

  return <Radios {...props} title="Suas rádios favoritas" radios={favorites} />;
};

export const PlaylistRadios: React.FC<TypesProps & PlaylistType> = ({
  playlist,
  param,
  toggleState,
  onShowAll,
  ...props
}) => {
  const { data, error, fetchMore } = useFetchPagination(
    `${playlist.url}${param}`,
    playlist.initialPage,
  );

  useEffect(() => {
    toggleState({
      key: playlist.key,
      success: !!data,
      error: error?.message,
    });
  }, [data, toggleState, error, playlist.key]);

  if (!data?.items?.length) {
    return null;
  }

  return (
    <Radios
      {...props}
      title={playlist.title}
      radios={data?.items}
      onEndReached={fetchMore}
      onShowAll={() =>
        onShowAll &&
        onShowAll({
          title: playlist.title,
          url: `${playlist.url}${param}`,
          initialPage: playlist.initialPageAllList || playlist.initialPage,
        })
      }
    />
  );
};
