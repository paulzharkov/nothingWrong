import * as React from 'react';
import { useState, useEffect } from 'react';
import { createPostThunk } from '../../redux/creators/posts';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowersUsersThunk } from '../../redux/creators/usersList';
import Icon from '@material-ui/core/Icon';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
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
      width: '340px',
    },
  }));

  const RandomButton = withStyles(() => ({
    root: {
      backgroundColor: '#FFF',
      color: '#67a3a3',
      alignItems: 'start',
    },
  }))(Button);

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
    history.push('/account/myWrongs');
  };

  return (
    <form className="formaObidka" onSubmit={handlerSubmit}>
      <div style={{ marginTop: '15px' }}>
        <h1>Создайте свою обидку:</h1>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={category}
          onChange={categoryHandler}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>
            Выберите категорию:
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

      <div style={{ marginTop: '20px' }}>
        <TextField
          id="outlined-multiline-static"
          label="Напишите причину обиды"
          multiline
          rows={3}
          value={reason}
          onChange={handlerReason}
          inputProps={{ maxLength: 140 }}
          variant="outlined"
          type="text"
        />
        <FormHelperText id="my-helper-text">
          (не более 140 символов){' '}
          <progress value={counterReason} max="140">
            {counterReason}
          </progress>
        </FormHelperText>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextField
          id="outlined-multiline-static"
          label="Чего вы хотите от обидчика"
          multiline
          rows={3}
          value={solve}
          onChange={handlerSolve}
          inputProps={{ maxLength: 140 }}
          variant="outlined"
          type="text"
        />
        <FormHelperText id="my-helper-text">
          (не более 140 символов){' '}
          <progress value={counterSolve} max="140">
            {counterSolve}
          </progress>
        </FormHelperText>
      </div>
      <div>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={offender}
          onChange={handlerOffender}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>
            Укажите обидчика:
          </MenuItem>
          {usersList.length &&
            usersList.map((el) => (
              <MenuItem value={el.login}>{el.login}</MenuItem>
            ))}
        </Select>
      </div>
      <div style={{ marginTop: '30px', marginBottom: '20px' }}>
        <FormControl component="stateForm">
          <FormLabel component="state">Кому будет доступна обидка:</FormLabel>
          <RadioGroup
            className={classes.selectEmpty}
            aria-label="state"
            name="state"
            value={state}
            onChange={stateHandler}
          >
            <FormControlLabel
              value="Приватная"
              control={<Radio style={{ color: 'blue' }} />}
              label="Приватная"
            />
            <FormControlLabel
              value="Публичная"
              control={<Radio style={{ color: 'black' }} />}
              label="Публичная"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <FormControl component="ratingForm">
          <FormLabel component="rating">
            Выберите уровень недовольства:
          </FormLabel>
          <RadioGroup
            className={classes.selectEmpty}
            aria-label="rating"
            name="rating"
            value={rating}
            onChange={ratingHandler}
          >
            <FormControlLabel
              value="1"
              className={classes.emodji}
              control={<Radio style={{ color: 'green' }} />}
              label="😠"
            />
            <FormControlLabel
              value="2"
              className={classes.emodji}
              control={<Radio style={{ color: 'yellow' }} />}
              label="😡"
            />
            <FormControlLabel
              value="3"
              className={classes.emodji}
              control={<Radio style={{ color: 'red' }} />}
              label="🤬"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <RandomButton
        type="submit"
        variant="outlined"
        color="primary"
        endIcon={<Icon>send</Icon>}
      >
        Обидеться!
      </RandomButton>
    </form>
  );
}

export default Makewrong;
