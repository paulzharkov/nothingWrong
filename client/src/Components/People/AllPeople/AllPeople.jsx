import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsersThunk } from '../../../redux/creators/usersList';
import UserAll from '../UserAll/UserAll';


function AllPeople() {

  const usersList = useSelector((state) => state.usersList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);


  return (
    <div>
      <h1>Все пользователи: </h1>


      {usersList.length ? (
        usersList.map((el) => (
          <UserAll
            key={el._id}
            id={el._id}
            login={el.login}
            email={el.email}
          />
        ))
      ) : (
          <div>wasted</div>
        )}
    </div>
  );
}

export default AllPeople;
