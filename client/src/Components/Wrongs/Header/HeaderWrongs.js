
import style from '../index.module.css'
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';


function HeaderWrongs() {

  const history = useHistory()

  const RandomButton = withStyles(() => ({
    root: {
      color: '#67a3a3',
      marginBottom: '10px'
    },
  }))(Button);
  return (
    <>
      <div className={style.lkLinks}>

        <RandomButton
          onClick={() => history.push('/lk/myWrongs')}
          variant="outlined"
          endIcon={<Icon>mood</Icon>}
        >
          Мои
        </RandomButton>

        <RandomButton
          onClick={() => history.push('/lk/toMeWrongs')}
          variant="outlined"
          endIcon={<Icon>mood_bad</Icon>}
        >
          На меня
        </RandomButton>

      </div>
    </>
  )
}

export default HeaderWrongs
