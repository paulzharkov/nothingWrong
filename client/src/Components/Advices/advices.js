import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AC from '../../redux/creators/advices';
import OneAdvice from './OneAdvice/OneAdvice';

function Advices() {
  const dispatch = useDispatch();

  const advicesList = useSelector((state) => state.advicesList);

  useEffect(() => {
    dispatch(AC.addAdvicesThunk());
  }, []);

  return (
    <div>
      {advicesList.length ? (
        advicesList.map((el, i) => (
          <OneAdvice
            key={i}
            text={el.text}
            title={el.title}
            img={el.img}
            link={el.link}
          />
        ))
      ) : (
        <div>Ваша лента советов загружается</div>
      )}
    </div>
  );
}

export default Advices;
