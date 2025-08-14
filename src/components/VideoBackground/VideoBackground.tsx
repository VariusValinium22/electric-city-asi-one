const VideoBackground = ({ src }: { src: string }) => (
  <video
    autoPlay
    loop
    muted
    className="absolute top-0 left-0 w-full h-full object-cover z-0 will-change-transform playsinline"
  >
    <source src={src} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

export default VideoBackground;
