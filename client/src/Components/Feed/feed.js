import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getFeedPostsThunk } from '../../redux/creators/posts';
import Post from '../Post/Post';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
});

function Feed() {
  const feed = useSelector((state) => state.feed);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedPostsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Общая лента</h1>
      {feed ? (
        feed.length ? (
          feed.map((el) => (
            <Post
              className={classes.root}
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
              authorName={el.authorName}
            />
          ))
        ) : (
          <div>Добавьте друзей, чтобы увидеть их публичные посты</div>
        )
      ) : null}
    </div>
  );
}
export default Feed;
