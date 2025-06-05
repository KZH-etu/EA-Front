import React, { useRef } from "react";

interface YouTubeLivePlayerProps {
  channelId: string;
  width?: string;
  height?: string;
}

export const YouTubeLivePlayer: React.FC<YouTubeLivePlayerProps> = ({
  channelId,
  width = "100%",
  height = "500px",
}) => {
  const playerRef = useRef<HTMLIFrameElement>(null);

  return (
    <div style={{ width, height }}>
      <iframe
        ref={playerRef}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube Live"
      ></iframe>
    </div>
  );
};