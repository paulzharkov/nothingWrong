import { useState } from 'react'

function Makewrong() {

  const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [solve, setSolve] = useState('');
  const [offender, setOffender] = useState('');
  const [state, setState] = useState('');

  const categoryHandler = (e) => {
    setCategory(e.target.value)
  }

  const stateHandler = (e) => {
    setState(e.target.value)
  }

  const handlerReason = (e) => {
    setReason(e.target.value)
  }

  const handlerSolve = (e) => {
    setSolve(e.target.value)
  }

  const handlerOffender = (e) => {
    setOffender(e.target.value)
  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (reason.trim() && solve.trim()) {
      fetch('http://localhost:3001/makewrong', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category, reason, solve, offender, state
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.status);
        });
    }

  }

  return (
    <form onSubmit={handlerSubmit}>
      <div>
        <span>Выберите категорию: </span>
        <select value={category} onChange={categoryHandler}>
          <option value="" selected disabled hidden>Выберите из списка</option>
          <option value="Финансовая">Финансовая</option>
          <option value="Невыполненные обещания">Невыполненные обещания</option>
          <option value="Женская">Женская</option>
          <option value="Воспитательная">Воспитательная</option>
          <option value="Бытовая">Бытовая</option>
        </select>
      </div>
      <div>
        <span>Укажите причину (не более 140 символов):  </span>
        <input type="text" value={reason} onChange={handlerReason} />
      </div>
      <div>
        <span>Чего я хочу от обидчика (не более 140 символов):  </span>
        <input type="text" value={solve} onChange={handlerSolve} />
      </div>
      <div>
        <span>Обидчик: </span>
        <select value={offender} onChange={handlerOffender}>
          <option value="" selected disabled hidden>Выберите из списка</option>
          <option value="Маша">Маша</option>
          <option value="Дима">Дима</option>
        </select>

      </div>
      <div>
        <span>Стэйт: </span>
        <select value={state} onChange={stateHandler}>
          <option value="" selected disabled hidden>Выберите из списка</option>
          <option value="Приватная">Маша</option>
          <option value="Публичная">Дима</option>
        </select>
      </div>
      <button type="submit">Отправить</button>
    </form>
  )
}

export default Makewrong
