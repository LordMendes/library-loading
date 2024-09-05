import React, { useState, useRef, useEffect } from "react";

export const VirtualList = ({
  items,
  itemHeight,
  itemWidth,
  containerHeight = "50px",
  containerWidth = `${window.innerWidth - 50}px`,
  overflow = "y",
  renderItem,
}) => {
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = useRef(null);

  const isHorizontal = overflow === "x";
  const totalItems = items.length;
  const itemSize = isHorizontal ? itemWidth : itemHeight;
  const containerSize = isHorizontal ? containerWidth : containerHeight;
  const totalSize = totalItems * itemSize;

  const visibleCount = Math.ceil(containerSize / itemSize);
  const startIndex = Math.floor(scrollPos / itemSize);
  const endIndex = Math.min(totalItems - 1, startIndex + visibleCount + 1);

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

  useEffect(() => {
    const handleResize = () => {
      setScrollPos(
        isHorizontal
          ? containerRef.current.scrollLeft
          : containerRef.current.scrollTop
      );
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isHorizontal]);

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        width: containerWidth,
        overflowX: isHorizontal ? "auto" : "hidden",
        overflowY: isHorizontal ? "hidden" : "auto",
        position: "relative",
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: isHorizontal ? "100%" : `${totalSize}px`,
          width: isHorizontal ? `${totalSize}px` : "100%",
          display: isHorizontal ? "flex" : "block",
          position: "relative",
        }}
      >
        {visibleItems.map((item, index) => (
          <div
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
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList;
