import React from 'react';
import Car from '../car'; // Adjust the path as needed

const Home = () => {
  return (
   
    <div className="container-one one">
  
      <div className="content">
        <h1 className="title">Explore Our Fleet</h1>
        <p className="description">
          Find Your Perfect Ride. Take your pick from our extensive fleet of cars, ranging from compact sedans to spacious SUVs and luxurious vehicles. Whether you're traveling solo, with family, or a group of friends, we have the ideal vehicle to accommodate your travel plans. Browse through our selection and discover the perfect ride for your next adventure.
        </p>
        <button className="explore-btn">Explore</button>
      </div>
      {/* Display the car */}
      <Car />
    </div>
  );
};

export default Home;
