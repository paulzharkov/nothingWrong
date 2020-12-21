import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLentaPostsThunk } from '../../redux/creators/posts';
import Post from '../Post/Post';


function Lenta() {
  const lentaPosts = useSelector((state) => state.lentaPosts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLentaPostsThunk());
  }, [dispatch]);

// const comment
  return (
    <div>
      <h1>Общая лента</h1>

      {lentaPosts.length ? (
        lentaPosts.map((el) => (
        
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
