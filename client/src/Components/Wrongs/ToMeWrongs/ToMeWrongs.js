import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllToMePostsThunk } from '../../../redux/creators/posts';
import Post from '../../Post/Post';
import HeaderWrongs from '../Header/HeaderWrongs';
import style from '../index.module.css';

function ToMeWrongs() {
  const posts = useSelector((state) => state.toMePost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllToMePostsThunk());
  }, [dispatch]);

  return (
    <div className={style.accountPage}>
      <HeaderWrongs />
      <div>
        <h1>На меня обиделись:</h1>

        {posts.length ? (
          posts.map((el) => (
            <Post
              key={el._id}
              id={el._id}
              likes={el.likes}
              reason={el.reason}
              solve={el.solve}
              status={el.status}
              rating={el.rating}
              date={el.date}
              comments={el.comments}
              state={el.state}
              category={el.category}
              // offenderName={el.offenderName}
              authorName={el.authorName}
            />
          ))
        ) : (
          <div>На вас никто не обиделся😅</div>
        )}
      </div>
    </div>
  );
}

export default ToMeWrongs;
