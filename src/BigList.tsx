import { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';

const filterItems = (items: string[], filterStr: string) => {
  return items.filter(item => item.toLowerCase().includes(filterStr.toLowerCase()));
};

const Row = ({ index, style, data }: { index: number, style: any, data: string[] }) => (
  <div style={{
    ...style,
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #ddd',
    backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
  }}>
    
    <div className="container">
        <p>{data[index]}</p>
        <a href={`https://www.youtube.com/watch?v=${data[index]}`} >
        Video link
        </a>
    </div>
  </div>
);

export const RowVirtualizerFixed = ({ allData }: { allData: string[]}) => {
  const [filterStr, setFilterStr] = useState('');
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.8);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setListHeight(window.innerHeight - (listRef.current?.offsetTop || 0));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredItems = filterItems(allData, filterStr);

  return (
    <div ref={listRef} style={{ width: '50vh', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3>Here are all the YouTube video IDs I found. You can type in the search box to filter for whatever words you want!</h3>

      <input
        type="text"
        value={filterStr}
        onChange={(e) => setFilterStr(e.target.value)}
        placeholder="Filter items..."
        style={{ padding: '10px', fontSize: '16px', marginBottom: '10px' }}
      />
      <List
        height={listHeight - 50}
        width={'100%'}
        itemSize={50}
        itemCount={filteredItems.length}
        itemData={filteredItems}
      >
        {Row}
      </List>
    </div>
  );
};
