import {
  Link,
} from 'react-router-dom';

function HeaderWrongs() {
  return (
    <>
      <div>
        <div><Link to="/lk/myWrongs">Мои обидки</Link></div>
        <div><Link to="/lk/toMeWrongs">Обидки на меня</Link></div>
        {/* <div><Link to="/chat">Чат</Link></div> */}
      </div>
    </>
  )
}

export default HeaderWrongs
