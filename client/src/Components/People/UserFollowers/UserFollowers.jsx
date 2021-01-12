import { useDispatch } from "react-redux"
import * as AC from '../../../redux/creators/usersList'
import { withStyles, Icon, Button, Typography } from '@material-ui/core';
import style from '../style.module.css'


function UserFollowers({ login, email, id }) {

  const dispatch = useDispatch()

  const unSubscribeHandler = () => {
    dispatch(AC.unSubscribeThunk(id))
  }

  const RandomButton = withStyles(() => ({
    root: {
      marginTop: '10px',
      marginBottom: '10px',
      boxShadow: '0px 10px 15px #0000003d',
      color: 'rgb(111 78 44)',
      width: '50vw',
      height: '4vh',
      backgroundColor: '#FFCCA1',
      border: '1px solid rgb(220 181 141)',
      padding: '5px 15px',
    },
  }))(Button);

  return (
    <>
      <Typography variant="h6" component="h1"><span className={style.colortext}>Логин:</span> {login}</Typography>
      <Typography variant="body1" color="textPrimary" component="p"><span className={style.colortext}>Email:</span> {email}</Typography>

      <RandomButton
        onClick={unSubscribeHandler}
        variant="outlined"
        endIcon={<Icon style={{ fontSize: 20, marginTop: '-6px' }}>clear</Icon>}
      >
        Отписаться
        </RandomButton>
    </>
  )
}

export default UserFollowers
