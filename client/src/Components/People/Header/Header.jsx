import style from './style.module.css';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Followers from '../Followers/Followers'

function Header() {
  const history = useHistory()
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
    },
  }))(Button);
  return (
    <>
      <div className={style.lkLinks}>
        <RandomButton
          onClick={() => history.push('/people/followers')}
          variant="outlined"
          endIcon={<Icon style={{ fontSize: 40 }}>people</Icon>}
        >
          Мои подписчики
        </RandomButton>
        <RandomButton
          onClick={() => history.push('/people/allpeople')}
          variant="outlined"
          endIcon={<Icon style={{ fontSize: 40 }}>add_circle</Icon>}
        >
          Найти обидчиков
        </RandomButton>
        {/* {history.location.pathname === '/people' ? <Followers /> : null} */}
      </div>
    </>
  )
}
export default Header

