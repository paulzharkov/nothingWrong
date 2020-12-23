import { useState, useEffect} from 'react'


function Advices() {

  const [advices, setAdvices] = useState([])

  // Ира здесь Fetch для тебя на /articles
  // Он отдает массив массивов с советами

  useEffect(() => {
    setAdvices();
  }, []);

  return (
    <div>
      <h1>Советы</h1>
    </div>
  )
}

export default Advices
