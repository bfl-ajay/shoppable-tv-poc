import React from "react";

export default function VideoPlayer({ onSceneChange }) {
  React.useEffect(() => {
    const scenes = [10, 20];
    let i = 0;
    const interval = setInterval(() => {
      onSceneChange(scenes[i % scenes.length]);
      i++;
    }, 10000);
    return () => clearInterval(interval);
  }, [onSceneChange]);
  return (
    <video controls width="600">
      <source src="http://localhost:4000/sample-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
