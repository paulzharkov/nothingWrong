import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllMyPostsThunk } from '../../../redux/creators/posts';
import Post from '../../Post/Post';
import HeaderWrongs from '../Header/HeaderWrongs';
import style from '../index.module.css';

function MyWrongs() {
  const posts = useSelector((state) => state.myPost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMyPostsThunk());
  }, [dispatch]);

  return (
    <div className={style.accountPage}>
      <HeaderWrongs />

      <div>
        <h1>Мои посты:</h1>

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
              offender={el.offenderId}
              offenderName={el.offenderName}
              // authorName={el.authorName}
            />
          ))
        ) : (
          <div>Вы ещё ничего не опубликовали😊</div>
        )}
      </div>
    </div>
  );
}

export default MyWrongs;
