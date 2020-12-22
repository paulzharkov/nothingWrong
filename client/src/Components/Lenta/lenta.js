import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getAllPostsThunk } from '../../redux/creators/posts';
import Post from '../Post/Post';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
});


function Lenta() {
  const lentaPosts = useSelector((state) => state.lentaPosts);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  // const comment
  return (
    <div>
      <h1>Общая лента</h1>

      {lentaPosts.length ? (
        lentaPosts.map((el) => (

          <Post className={classes.root}
            key={el._id}
            id={el._id}
            likes={el.likes}
            reason={el.reason}
            solve={el.solve}
            status={el.status}
            rating={el.rating}
            date={el.date}
            comments={el.comments}
            category={el.category}
            offenderName={el.offenderName}
          />

        ))
      ) : (
          <div>wasted</div>
        )
      }
    </div >
  );
}
export default Lenta
