import { useEffect, useState } from 'react'
import './App.css'
import { loadAllIds } from './load_data'
import { RowVirtualizerFixed } from './BigList'

function App() {
  const [allIds, setAllIds] = useState([] as any[])
  const [loading, setLoading] = useState(true)

  const onLoadFn = async () => {
    const allIds = await loadAllIds()
    setAllIds(allIds)
    setLoading(false)
  }

  // Load data when page loads
  useEffect(() => {
    onLoadFn()
  }, [])

  return (
    <>
      <div>
          <h1>Rude Words</h1>
          {loading ? <h1>Loading...</h1> : <RowVirtualizerFixed allData={allIds} />}
      </div>
    </>

  )
}

export default App
