"use client";

import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  url: string;
  className?: string;
}

export function YouTubeEmbed({ url, className }: YouTubeEmbedProps) {
  // Extract Video ID
  // Supports:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getVideoId(url);

  if (!videoId) {
    return (
        <div className={cn("aspect-video bg-black/50 border border-white/10 flex items-center justify-center text-muted-foreground text-sm font-mono", className)}>
            Invalid YouTube URL
        </div>
    );
  }

  return (
    <div className={cn("aspect-video bg-black border border-white/10 shadow-retro-sm overflow-hidden relative", className)}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0"
      />
    </div>
  );
}
