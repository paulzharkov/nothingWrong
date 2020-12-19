import {
  Link,
} from 'react-router-dom';

function Header() {
  return (
    <>
      <div>
        <div><Link to="/people/followers">Мои подписчики</Link></div>
        <div><Link to="/people/allpeople">Все люди</Link></div>
      </div>
    </>
  )
}

export default Header
