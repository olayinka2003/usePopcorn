import React, { useState } from "react";
import { Star } from "./Star";
const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
};

const startContainerStyle = {
  display: "flex",
  backgroundColor: "white",
};

// StarRating.propTypes = {
//  maxRating: PropTypes.number,
//  color: PropTypes.string,
//  size: PropTypes.number,
//  messages: PropTypes.array,
//  className: PropTypes.string,
//  onSetRating: PropTypes.func,
// }


export const StarRating = ({ maxRating = 5, color='#fcc419', size='48', messages=[],onSetRating, }) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating){
    setRating(rating)
    onSetRating(rating)
  }
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size/1.5}px`
  };

  return (
    <div style={containerStyle}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onClick={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)} color={color} size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{messages.length===maxRating ? messages[tempRating? tempRating-1:rating-1]:tempRating || rating || ""}</p>
    </div>
  );
};
