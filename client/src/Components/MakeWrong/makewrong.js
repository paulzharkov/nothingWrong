import * as React from 'react';
import { useState, useEffect } from 'react';
import { createPostThunk } from '../../redux/creators/posts';
import { useHistory } from 'react-router-dom';
import '../MakeWrong/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowersUsersThunk } from '../../redux/creators/usersList';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import {
  InputLabel,
  Select,
  FormHelperText,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,

} from '@material-ui/core';

function Makewrong() {
  const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [solve, setSolve] = useState('');
  const [offender, setOffender] = useState('');
  const [state, setState] = useState('');
  const [rating, setRating] = useState('');
  const [counterReason, setCounterReason] = useState(reason.length);
  const [counterSolve, setCounterSolve] = useState(solve.length);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  }));

  const history = useHistory();

  const dispatch = useDispatch();

  const classes = useStyles();

  const usersList = useSelector((state) => state.usersList);

  useEffect(() => {
    dispatch(getFollowersUsersThunk());
  }, [dispatch]);

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const stateHandler = (e) => {
    setState(e.target.value);
  };
  const handlerReason = (e) => {
    setReason(e.target.value);
    setCounterReason(reason.length);
  };

  const handlerSolve = (e) => {
    setSolve(e.target.value);
    setCounterSolve(solve.length);
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
        <InputLabel id="demo-simple-select-outlined-label">
          Выберите категорию:
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={category}
          onChange={categoryHandler}
          displayEmpty
          className={classes.selectEmpty}

        >
          <MenuItem value="" disabled>
            Список
          </MenuItem>
          <MenuItem value="Финансовая">Финансовая</MenuItem>
          <MenuItem value="Невыполненные обещания">
            Невыполненные обещания
          </MenuItem>
          <MenuItem value="Женская">Женская</MenuItem>
          <MenuItem value="Воспитательная">Воспитательная</MenuItem>
          <MenuItem value="Бытовая">Бытовая</MenuItem>
        </Select>
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Укажите причину"
          multiline
          rows={3}
          value={reason}
          onChange={handlerReason}
          inputProps={{ maxLength: 140 }}
          variant="outlined"
          type="text"
        />
        <FormHelperText id="my-helper-text">
          (не более 140 символов)
        </FormHelperText>
        <progress value={counterReason} max="140">
          {counterReason}
        </progress>
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Чего я хочу от обидчика"
          multiline
          rows={3}
          value={solve}
          onChange={handlerSolve}
          inputProps={{ maxLength: 140 }}
          variant="outlined"
          type="text"
        />
        <FormHelperText id="my-helper-text">
          (не более 140 символов)
        </FormHelperText>
        <meter max="140" value={counterSolve} low="70" high="120">
          {counterSolve}
        </meter>
      </div>
      <div>
        <InputLabel id="demo-simple-select-outlined-label">
          Укажите обидчика:
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={offender}
          onChange={handlerOffender}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>
            Выберите из списка
          </MenuItem>
          {usersList.length &&
            usersList.map((el) => (
              <MenuItem value={el.login}>{el.login}</MenuItem>
            ))}
        </Select>
      </div>
      <div>
        {/* <InputLabel id="demo-simple-select-outlined-label">
          Кому будет доступна обидка:
        </InputLabel>
        <Select
          value={state}
          onChange={stateHandler}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>
            Стэйт
          </MenuItem>
          <MenuItem value="Приватная">Приватная</MenuItem>
          <MenuItem value="Публичная">Публичная</MenuItem>
        </Select> */}

        <FormControl component="stateForm">
        <FormLabel component="state">Кому будет доступна обидка:</FormLabel>
          <RadioGroup className={classes.selectEmpty} aria-label="state" name="state" value={state} onChange={stateHandler}>
            <FormControlLabel value="Приватная" control={<Radio style={{ color: 'blue' }}/>} label="Приватная" />
            <FormControlLabel value="Публичная" control={<Radio style={{ color: 'black' }}/>} label="Публичная" />
          </RadioGroup>
        </FormControl>

      </div>
      <div>
        {/* <InputLabel id="demo-simple-select-outlined-label">
          Уровень злости:
        </InputLabel> */}
        {/* <Select
          value={rating}
          onChange={ratingHandler}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>
            Выберите от 1 до 3
          </MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Select> */}

        <FormControl component="ratingForm">
          <FormLabel component="rating">Выберите уровень злости:</FormLabel>
          <RadioGroup className={classes.selectEmpty} aria-label="rating" name="rating" value={rating} onChange={ratingHandler}>
            <FormControlLabel value="1" control={<Radio style={{ color: 'green' }}/>} label="1" />
            <FormControlLabel value="2" control={<Radio style={{ color: 'yellow' }}/>} label="2" />
            <FormControlLabel value="3" control={<Radio style={{ color: 'red' }}/>} label="3" />
          </RadioGroup>
        </FormControl>

      </div>
      {/* <button type="submit">Отправить</button> */}
      <Button type="submit" variant="outlined" color="primary">
        Обидеться!
      </Button>
    </form>
  );
}

export default Makewrong;
