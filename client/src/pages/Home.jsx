import React from "react";
import introVideo from "../assets/video/IntroVideo.mp4";
import image from "../assets/images/image.jpg";
import poster from "../assets/images/top_dcwhite2024_pc.jpg";
import exclusivePoster from "../assets/images/top_exclusive2024_pc.jpg";

import Video from "../components/Video";
import Card from "../components/Card";

const Home = () => {
  return (
    <>
      <div className=" space-y-20">
        <Video
          url={introVideo}
          options={{
            autoPlay: false,
            muted: true,
            loop: false,
            playsInline: true,
            controls: false,
          }}
        />
        <h1 className=" font-caveat text-3xl sm:text-5xl font-extrabold text-center text-gray-800 leading-snug">
          Style that <span className="text-indigo-600">speaks</span>, quality
          that <span className="text-indigo-600">defines</span> <br />
          <span className=" text-2xl sm:text-3xl font-semibold text-gray-600 mt-2 inline-block">
            – welcome to Clothify
          </span>
        </h1>
        <div className=" space-y-7">
          <h1 className=" text-xl font-medium">Trending This Week</h1>
          <div className=" grid grid-cols-2 md:grid-cols-3 gap-3">
            <Card
              imageUrl={image}
              name="T-shirt for men"
              category="MEN"
              price="500.00"
            />
            <Card
              imageUrl={image}
              name="T-shirt for men"
              category="MEN"
              price="500.00"
            />
            <Card
              imageUrl={image}
              name="T-shirt for men"
              category="MEN"
              price="500.00"
            />
            <Card
              imageUrl={image}
              name="T-shirt for men"
              category="MEN"
              price="500.00"
            />
          </div>
        </div>
        <div className="space-y-7">
          <h1 className="text-xl font-medium">The Latests</h1>
          <div className=" space-y-4">
            <img
              src={poster}
              alt="Latest Poster"
              className="w-full h-auto rounded-lg shadow-sm"
            />
            <p className="text-center text-lg font-medium text-gray-700 italic">
              Discover the latest in refined minimalism from{" "}
              <span className="font-semibold">DC White</span>.
            </p>
          </div>
        </div>
        <div className=" space-y-7">
          <h1 className="text-xl font-medium">Exclusives</h1>
          <div className=" grid grid-cols-2 md:grid-cols-3 gap-3">
            <Card
              imageUrl={image}
              name="T-shirt for men"
              category="MEN"
              price="500.00"
            />
            <Card
              imageUrl={image}
              name="T-shirt for men"
              category="MEN"
              price="500.00"
            />
            <Card
              imageUrl={image}
              name="T-shirt for men"
              category="MEN"
              price="500.00"
            />
            <Card
              imageUrl={image}
              name="T-shirt for men"
              category="MEN"
              price="500.00"
            />
          </div>
        </div>
        <div className=" space-y-7">
          <h1 className="text-xl font-medium">Don't Miss</h1>
          <img
            src={exclusivePoster}
            alt="Latest Poster"
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
