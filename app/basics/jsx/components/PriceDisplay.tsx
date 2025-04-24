import React, { useState } from 'react';

function PriceDisplay() {
  const [price, setPrice] = useState(100);
  const [isDiscounted, setIsDiscounted] = useState(false);

  const finalPrice = isDiscounted ? price * 0.8 : price;

  return (
    <div>
      <h1>价格显示</h1>
      <div className="price">
        原价: {price}元
        {isDiscounted && <span className="discount">(8折优惠)</span>}
      </div>
      <div className="final-price">
        最终价格: {finalPrice}元
      </div>
      <button onClick={() => setIsDiscounted(!isDiscounted)}>
        {isDiscounted ? '取消优惠' : '应用优惠'}
      </button>
    </div>
  );
}

export default PriceDisplay; 