import React from "react";

const Card = ({ imageUrl, name, category, price }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg">
      <img src={imageUrl} alt={name} className="w-full  sm:h-96 object-fill" />
      <div className="p-4">
        <h2 className="text-lg md:text-xl font-medium mb-1">{name}</h2>
        <h4 className="text-gray-500 text-sm mb-1">{category}</h4>
        <h3 className=" text-base md:text-lg  ">MRP: ₹ {price}</h3>
      </div>
    </div>
  );
};

export default Card;
