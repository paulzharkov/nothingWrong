import { useSelector } from 'react-redux';
import style from './index.module.css';
import { Link } from 'react-router-dom';
import Logout from '../Logout/logout';
import logo from './logo2.jpg';
import newLogo from './NothingWrong.png';

import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Header() {
  const RandomButton = withStyles(() => ({
    root: {
      color: '#67a3a3',
      fontWeight: 'bold',
      fontSize: '16px',
      marginTop: '10px',
      marginLeft: '10px',
      border: '2px solid white',
      width: '100px',
    },
  }))(Button);

  const login = useSelector((state) => state.users);
  const emoji = ['👺', '🎞', '👨‍👨‍👧‍👧', '📊', '💩', '📝', '🗣'];
  const emoji2 = ['👣', '🚶‍♂️'];

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
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
        <div>
          <List className={style.headerDiv}>
            <img className={style.headerLogo} src={logo} alt="pic" />
            <img className={style.headerNewLogo} src={newLogo} alt="pic" />

            {[
              <Link to="/lk">Личный кабинет</Link>,
              <Link to="/lenta">Лента</Link>,
              <Link to="/people">Люди</Link>,
              <Link to="/stats">Статистика</Link>,
              <Link to="/advices">Советы</Link>,
              <Link to="/makewrong">Создать обидку</Link>,
              <Link to="/chatprivate">Обсудить Приватно</Link>,
            ].map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{emoji[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <Logout className={style.logout_btn} />
          </List>
        </div>
      ) : (
        <div className={style.headerDiv}>
          <List>
            <img className={style.headerLogoEnter} src={logo} alt="pic" />
            {[
              <Link to="/">Войти</Link>,
              <Link to="/register">Регистрация</Link>,
            ].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{emoji2[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );

  return (
    <>
      {
        <React.Fragment key={'left'}>
          <RandomButton onClick={toggleDrawer('left', true)}>
            {'Меню'}
          </RandomButton>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
      }
    </>
  );
}

export default Header;
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
