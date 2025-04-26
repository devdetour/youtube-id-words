import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useState, useRef } from "react";

export function RowVirtualizerFixed(props: { data: string[]; filterStr: string }) {
  const allData = props.data;
  const filterStr = props.filterStr;
  
  const [filteredData, setFilteredData] = useState([] as string[]);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filterStr.length === 0) {
      setFilteredData(allData);
    } else {
      setFilteredData(allData.filter((s) => s.toLowerCase().includes(filterStr.toLowerCase())));
    }
  }, [filterStr, allData]);

  const virtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 24,
    overscan: 20,
  });

  return (
    <div style={{ height: "100%" }}>
      <div
        ref={parentRef}
        style={{
          height: "500px",
          width: "600px",
          overflowY: "auto",
          overflowX: "hidden",
          willChange: "transform",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            width: "100%",
            position: "relative",
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="row container">
                <div className="videoId">{filteredData[virtualRow.index]}</div>
                <div className="videoLink">
                  <a href={`https://www.youtube.com/watch?v=${filteredData[virtualRow.index]}`} >
                    Video link
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
