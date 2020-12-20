import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsersThunk } from '../../../redux/creators/usersList';
import User from '../User/User';


function AllPeople() {

  const usersList = useSelector((state) => state.usersList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [usersList]);


  return (
    <div>
      <h1>Все пользователи: </h1>


      {usersList.length ? (
        usersList.map((el) => (
          <User
            key={el._id}
            id={el._id}
            login={el.login}
            email={el.email}
            subscribers={el.subscribers}
          />
        ))
      ) : (
          <div>wasted</div>
        )}
    </div>
  );
}

export default AllPeople;
