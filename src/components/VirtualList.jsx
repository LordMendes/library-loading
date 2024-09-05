import React, { useState, useRef } from "react";
import { ComponentItem } from "./componentContainer";

export const VirtualList = ({
  items,
  itemHeight,
  itemWidth,
  containerHeight ,
  containerWidth,
  overflow = "y",
}) => {
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = useRef(null);

  const isHorizontal = overflow === "x";

  const totalItems = items.length;

  const totalSize = totalItems * (isHorizontal ? itemWidth : itemHeight);

  const visibleCount = Math.ceil(
    (isHorizontal ? containerWidth : containerHeight) /
      (isHorizontal ? itemWidth : itemHeight)
  );

  const startIndex = Math.floor(
    scrollPos / (isHorizontal ? itemWidth : itemHeight)
  );

  const endIndex = Math.min(totalItems - 1, startIndex + visibleCount + 1); // extra one for smooth scroll

  
  const visibleItems = items.slice(startIndex, endIndex + 1);
  
  const handleScroll = () => {
  if (containerRef.current) {
      setScrollPos(
        isHorizontal
          ? containerRef.current.scrollLeft
          : containerRef.current.scrollTop
      );
    }
  };
  
  return (
    <div
      ref={containerRef}
      style={{
        height: `${containerHeight || 55}px`,
        width: `${containerWidth || 600}px`,
        overflowY: isHorizontal ? "hidden" : "auto",
        overflowX: isHorizontal ? "auto" : "hidden",
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: isHorizontal ? "100%" : `${totalSize}px`,
          width: isHorizontal ? `${totalSize}px` : "100%",
          position: "relative",
        }}
      >
        {visibleItems.map((item, index) => (
          <div
          className="list"
            key={startIndex + index}
            style={{              
              position: "absolute",
              top: isHorizontal
                ? "0"
                : `${(startIndex + index) * itemHeight}px`,
              left: isHorizontal
                ? `${(startIndex + index) * itemWidth}px`
                : "0",
              height: isHorizontal ? "100%" : `${itemHeight}px`,
              width: isHorizontal ? `${itemWidth}px` : "100%",
            }}
          >
            <ComponentItem>{item}</ComponentItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList;
