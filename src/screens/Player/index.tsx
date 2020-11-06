import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import Player from '~/components/Player';
import Albuns from './components/Albuns';
import Artist from './components/Artist';
import Controls from './components/Controls';

export default function PlaylistScreen() {
  const playbackState = usePlaybackState();

  useEffect(() => {
    TrackPlayer.addEventListener('remote-duck', async () => {
      await TrackPlayer.pause();
    });
  }, [playbackState]);

  useEffect(() => {
    setup();
  }, []);

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });
  }

  async function togglePlayback() {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();

      if (currentTrack === null || playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.reset();

        await TrackPlayer.add({
          id: 'local-track',
          url: 'http://audio07.viaflux.com:5511/live',
          title: 'Pure (Demo)',
          artist: 'David Chavez',
          artwork:
            'https://pbs.twimg.com/profile_images/1196855902172798979/t_xvyE-D_400x400.jpg',
        });

        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Albuns />
      <Artist />
      <Controls />
    </View>
  );
}

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return 'None';
    case TrackPlayer.STATE_PLAYING:
      return 'Playing';
    case TrackPlayer.STATE_PAUSED:
      return 'Paused';
    case TrackPlayer.STATE_STOPPED:
      return 'Stopped';
    case TrackPlayer.STATE_BUFFERING:
      return 'Buffering';
  }
}

async function skipToNext() {
  try {
    await TrackPlayer.skipToNext();
  } catch (_) {}
}

async function skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch (_) {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {
    marginTop: 40,
  },
  state: {
    marginTop: 20,
  },
});
