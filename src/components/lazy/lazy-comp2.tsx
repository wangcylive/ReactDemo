import React, {useEffect} from 'react'

const LazyComp2: React.FC = () => {
  useEffect(() => {
    console.log('Lazy Component 2', performance.now())
  }, [])
  return <div>Lazy Component 2</div>
}

export default LazyComp2
