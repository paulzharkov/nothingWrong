import { useDispatch, useSelector } from "react-redux"
import * as AC from '../../../redux/creators/usersList'
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import style from '../style.module.css'


function UserAll({ login, email, id }) {

  const dispatch = useDispatch()

  const subscribeHandler = () => {
    dispatch(AC.subscribeThunk(id))
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



// .MuiButton-outlined {
//   color: #56422d;
//   width: 50vw;
//   height: 5vh;

//   margin-top: 10px;
//   margin-bottom: 10px;
//   background-color: #FFCCA1;
// }

// .MuiButton-outlined {
//     border: 1px solid rgb(220 181 141)!important;
//     padding: 5px 15px!important;
//   }


