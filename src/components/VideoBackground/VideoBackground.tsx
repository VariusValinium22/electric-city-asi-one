import React, { useRef, useEffect } from 'react';

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        
        await video.play();
      } catch (error) {
        console.warn('Autoplay prevented, video will play on user interaction: ', error);
      }
    };

    const handleCanPlay = () => {
      playVideo();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        playVideo();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (video.readyState >= 3) {
      playVideo();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.warn('Background video failed to load: ', e);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      preload="auto"
      className="absolute top-0 left-0 w-full h-full object-cover z-0 will-change-transform"
      onError={handleVideoError}
      onClick={handleClick}
      style={{ pointerEvents: 'none' }}
    >
      <source src="/SharkBackgroundVideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
