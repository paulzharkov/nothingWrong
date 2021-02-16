import style from './style.module.css';
import { Button, Icon, withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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
      boxShadow: '3px 4px 5px #0000003b',
    },
  }))(Button);
  return (
    <>
      <div className={style.lkLinks}>
        <RandomButton
          onClick={() => history.push('/people/followers')}
          variant="outlined"
          endIcon={<Icon style={{ fontSize: 40, marginTop: '-6px' }}>people</Icon>}
        >
          Мои подписчики
        </RandomButton>
        <RandomButton
          onClick={() => history.push('/people/allpeople')}
          variant="outlined"
          endIcon={<Icon style={{ fontSize: 40, marginTop: '-6px' }}>add_circle</Icon>}
        >
          Найти людей
        </RandomButton>
        {/* {history.location.pathname === '/people' ? <Followers /> : null} */}
      </div>
    </>
  )
}
export default Header

