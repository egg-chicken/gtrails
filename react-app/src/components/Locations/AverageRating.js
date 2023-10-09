import React from 'react';

const AverageRating = ({ avgRating, reviewCount }) => {
  return (
    <div className='total-location-rating-section'>
      <div>
        {avgRating ? avgRating.toFixed(1) : 'No Reviews'}
        <i className="fa fa-solid fa-star" style={{ color: '#2ced39' }} />
      </div>
      <p className='total-reviews'>{reviewCount} reviews</p>
    </div>
  );
};

export default AverageRating;
