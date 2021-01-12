import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFollowersUsersThunk } from '../../../redux/creators/usersList';
import UserFollowers from '../UserFollowers/UserFollowers';


function Followers() {

  const usersList = useSelector((state) => state.usersList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowersUsersThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Мои подписчики: </h1>


      {usersList.length ? (
        usersList.map((el) => (
          <UserFollowers
            key={el._id}
            id={el._id}
            login={el.login}
            email={el.email}
            subscribers={el.subscribers}
          />
        ))
      ) : (
          <div>У вас пока нет подписчиков</div>
        )}
    </div>
  );
}

export default Followers;
