'use client';

import { Participant, Track } from 'livekit-client';
import { useTracks } from '@livekit/components-react';

import { useRef, useState, useEffect } from 'react';
import { FullScreenControl } from './fullscreen-control';
import { useEventListener } from 'usehooks-ts';
import { VolumeControl } from './volume-control';

interface ILiveVideoProps {
  participant: Participant;
}
export const LiveVideo = ({ participant }: ILiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0);

  const onVolumeChange = (volume: number) => {
    setVolume(volume);
    if (videoRef?.current) {
      videoRef.current.muted = volume === 0;
      videoRef.current.volume = +volume * 0.01;
    }
  };
  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);
    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
      setIsFullScreen(true);
    }
  };
  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrentlyFullScreen);
  };

  //* Allow using ESC key without hydration issue
  useEventListener('fullscreenchange', handleFullScreenChange, wrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((t) => t.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChangeVolume={onVolumeChange}
            volume={volume}
            toggleVolume={toggleMute}
          />
          <FullScreenControl isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} />
        </div>
      </div>
    </div>
  );
};
