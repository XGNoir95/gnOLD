import React from 'react';

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src="images/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <h1>Welcome to WanderHub!</h1>
        <h3>Plan your trip with us</h3>
      </div>
    </div>
  );
};

export default VideoBackground;
