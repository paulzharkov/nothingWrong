import {
  useHistory,
} from 'react-router-dom';

function Answer() {
  const history = useHistory();
  return (
    <div>
    <h1>Отобразилось</h1>
    <button onClick={() => history.push('/lenta')}>Перейти в ленту</button>
    </div>
  )
}

export default Answer
