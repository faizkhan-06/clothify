import React from "react";

const Video = ({ url, options }) => {
  return (
    <video className="w-full h-auto sm:max-h-[500px] object-cover" {...options}>
      <source src={url} type="video/mp4" />
    </video>
  );
};

export default Video;
