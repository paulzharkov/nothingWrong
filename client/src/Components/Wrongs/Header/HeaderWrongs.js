import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import style from '../index.module.css';
import { withStyles, Icon, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getAllToMePostsThunk } from '../../../redux/creators/posts';

function HeaderWrongs() {
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllToMePostsThunk());
  }, [dispatch]);

  const RandomButton = withStyles(() => ({
    root: {
      color: '#67a3a3',
      width: '80vw',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '10px',
      height: '7vh',
      marginBottom: '10px',
      boxShadow: '3px 4px 5px #0000003b',
    },
  }))(Button);

  return (
    <div className={style.lkLinks}>
      <RandomButton
        onClick={() => history.push('/account/myWrongs')}
        variant="outlined"
        endIcon={<Icon style={{ fontSize: 40, marginTop: '-6px' }}>mood</Icon>}
      >
        Мои
      </RandomButton>

      <RandomButton
        onClick={() => history.push('/account/toMeWrongs')}
        variant="outlined"
        endIcon={
          <Icon style={{ fontSize: 40, marginTop: '-6px' }}>mood_bad</Icon>
        }
      >
        На меня
      </RandomButton>
    </div>
  );
}

export default HeaderWrongs;
