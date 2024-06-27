import React from 'react';
import './price.css';

const Price = () => {
    return (
        <div className="price-section">
          <h2>Pricing Information</h2>
          <div className="price-table">
            <div className="price-row">
              <div className="price-cell">Basic Maintenance</div>
              <div className="price-cell">$50</div>
            </div>
            <div className="price-row">
              <div className="price-cell">Standard Maintenance</div>
              <div className="price-cell">$200</div>
            </div>
            <div className="price-row">
              <div className="price-cell">Premium Maintenance</div>
              <div className="price-cell">$400</div>
            </div>
            <div className="price-row">
              <div className="price-cell">Website Redesign</div>
              <div className="price-cell">$175 (+ $10 per page added)</div>
            </div>
            <div className="price-row">
              <div className="price-cell">Website Development</div>
              <div className="price-cell">$325 for first 5 pages (+ $50 per additional page)</div>
            </div>
          </div>
        </div>
      );
};

export default Price;