import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllMyPostsThunk } from '../../../redux/creators/posts';
import Post from '../../Post/Post';

function MyWrongs() {
  const login = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts.myPost);
  console.log(posts)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMyPostsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Личный кабинет</h1>
      <h1>{login}</h1>

      <h3>Мои обидки</h3>

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
          />
        ))
      ) : (
          <div>wasted</div>
        )}
    </div>
  );
}

export default MyWrongs;
