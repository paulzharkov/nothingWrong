import { useSelector } from 'react-redux'
import style from './index.module.css'
import {
  Link,
} from 'react-router-dom';
import Logout from '../Logout/logout';
import logo from './logo2.jpg'


import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Header() {

  const login = useSelector(state => state.users)
  const emoji = ["👺", "🎞", "👨‍👨‍👧‍👧", "📊", "💩", "📝", "🗣", "🗣"];
  const emoji2 = ["👣",  "🚶‍♂️"];

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {login ? (
        <List>
          {[
            <Link to="/lk">Личный кабинет</Link>,
            <Link to="/lenta">Лента</Link>,
            <Link to="/people">Люди</Link>,
            <Link to="/stats">Статистика</Link>,
            <Link to="/advices">Советы</Link>,
            <Link to="/makewrong">Создать обидку</Link>,
            <Link to="/chat">Обсудить</Link>,
            <Link to="/chatprivate">Обсудить Приватно</Link>
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{emoji[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Logout />
        </List>


      ) : (
          <List>
            {[
              <Link to="/">Войти</Link>,
              <Link to="/register">Регистрация</Link>
            ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{emoji2[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        )}
    </div>

  );

  return (
    <>
      <div>
        {
          <React.Fragment key={'left'}>
            <Button onClick={toggleDrawer('left', true)}>{'Меню'}</Button>
            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
              {list('left')}
            </Drawer>
          </React.Fragment>
        }
      </div>
    </>
  )
}

export default Header
// {/* <div className={style.headerDiv}>
//         <div>
//           <img className={style.headerLogo} src={logo} alt="logo" />
//         </div>
//         {login ? (
//           <div className={style.headerLinks} >
//             <div><Link to="/lk">Личный кабинет</Link></div>
//             <div><Link to="/lenta">Лента</Link></div>
//             <div><Link to="/people">Люди</Link></div>
//             <div><Link to="/stats">Статистика</Link></div>
//             <div><Link to="/advices">Советы</Link></div>
//             <div><Link to="/makewrong">Создать обидку</Link></div>
//             <div><Link to="/chat">Обсудить</Link></div>
//             <hr />
//             <div><Logout /></div>
//             <div><Link to="/chatprivate">Обсудить Приватно</Link></div>
//           </div>
//         ) : (
//             <div className={style.headerLink}>
//               <div><Link to="/">Войти</Link></div>
//               <div><Link to="/register">Регистрация</Link></div>
//               <hr />
//             </div>
//           )}

//       </div> */}
