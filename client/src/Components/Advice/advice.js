import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AC from '../../redux/creators/advice';
import OneAdvice from './OneAdvice/OneAdvice';

function Advice() {
  const dispatch = useDispatch();

  const adviceList = useSelector((state) => state.adviceList);

  useEffect(() => {
    dispatch(AC.addAdviceThunk());
  }, []);

  return (
    <div>
      {adviceList.length ? (
        adviceList.map((el, i) => (
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

export default Advice;
