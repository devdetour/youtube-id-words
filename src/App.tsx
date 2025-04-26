import { useEffect, useState } from 'react'
import { FixedSizeList as List} from 'react-window'
import './App.css'
import { loadAllIds } from './load_data'
import React from 'react'
import { RowVirtualizerFixed } from './BigList'

function App() {
  const [allIds, setAllIds] = useState([] as any[])

  const onLoadFn = async () => {
    const allIds = await loadAllIds()
    setAllIds(allIds)
    // setAllIds(["a", "b", "c"])
    console.log(allIds)
  }

  // Load data when page loads
  useEffect(() => {
    onLoadFn()
  }, [])

  return (
    <>
      <div>
          <h1>Rude Words</h1>

          <RowVirtualizerFixed allData={allIds} />
      </div>
    </>

  )
}

export default App
