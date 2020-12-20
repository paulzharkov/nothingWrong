import { useState, useEffect } from 'react';
import { createPostThunk } from '../../redux/creators/posts';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowersUsersThunk } from '../../redux/creators/usersList';
import FollowersOption from './FollowersOption/FollowersOption';



function Makewrong() {
  const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [solve, setSolve] = useState('');
  const [offender, setOffender] = useState('');
  const [state, setState] = useState('');
  const [rating, setRating] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);

  useEffect(() => {
    dispatch(getFollowersUsersThunk());
  }, [usersList]);



  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const stateHandler = (e) => {
    setState(e.target.value);
  };
  const handlerReason = (e) => {
    setReason(e.target.value);
  };

  const handlerSolve = (e) => {
    setSolve(e.target.value);
  };
  const handlerOffender = (e) => {
    setOffender(e.target.value);
  };
  const ratingHandler = (e) => {
    setRating(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createPostThunk({ category, reason, solve, offender, rating, state })
    );
    history.push('/lk');
  };

  return (
    <form onSubmit={handlerSubmit}>
      <div>
        <span>Выберите категорию: </span>
        <select value={category} onChange={categoryHandler}>
          <option value="" selected disabled hidden>
            Выберите из списка
          </option>
          <option value="Финансовая">Финансовая</option>
          <option value="Невыполненные обещания">Невыполненные обещания</option>
          <option value="Женская">Женская</option>
          <option value="Воспитательная">Воспитательная</option>
          <option value="Бытовая">Бытовая</option>
        </select>
      </div>
      <div>
        <span>Укажите причину (не более 140 символов): </span>
        <input type="text" value={reason} onChange={handlerReason} />
      </div>
      <div>
        <span>Чего я хочу от обидчика (не более 140 символов): </span>
        <input type="text" value={solve} onChange={handlerSolve} />
      </div>
      <div>
        <span>Обидчик: </span>
        <select value={offender} onChange={handlerOffender}>
          <option value="" selected disabled hidden>
            Выберите из списка
          </option>
          {
            usersList.length && usersList.map((el) => (
              <FollowersOption login={el.login} />
            ))
          }
        </select>
      </div>
      <div>
        <span>Стэйт: </span>
        <select value={state} onChange={stateHandler}>
          <option value="" selected disabled hidden>
            Выберите из списка
          </option>
          <option value="Приватная">Приватная</option>
          <option value="Публичная">Публичная</option>
        </select>
      </div>

      <div>
        <span>Уровень: </span>
        <select value={rating} onChange={ratingHandler}>
          <option value="" selected disabled hidden>
            Выберите из списка
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
}

export default Makewrong;
