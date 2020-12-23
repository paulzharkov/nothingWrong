import { useDispatch, useSelector } from "react-redux"
import * as AC from '../../../redux/creators/usersList'
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


function UserAll({ login, email, id }) {

  const dispatch = useDispatch()

  const subscribeHandler = () => {
    dispatch(AC.subscribeThunk(id))
  }

  const RandomButton = withStyles(() => ({
    root: {
      backgroundColor: '#FFCCA1',
      color: '#216A6A',
      width: '50vw',
      height: '3vh',
      marginTop: '10px',
      marginBottom: '10px',
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    },
  }))(Button);

  return (
<>
      <Typography variant="h6" component="h1">Логин: {login}</Typography>
      <Typography variant="body1" color="textPrimary" component="p">Email: {email}</Typography>

      <RandomButton
        onClick={subscribeHandler}
        variant="outlined"
        endIcon={<Icon style={{ fontSize: 20 }}>add_box</Icon>}
      >
        Подписаться
        </RandomButton>
</>
  )
}

export default UserAll





