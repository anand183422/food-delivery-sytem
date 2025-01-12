import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState('Login');
  const navigate = useNavigate();
  const onlinestatus = useOnlineStatus();
  
  const carts = useSelector((store) => store.cart.item ); // Default to an empty array if undefined
  console.log(carts);

  const { logUser } = useContext(UserContext);
  console.log(logUser);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setBtnNameReact('Logout');
    }
  }, []);

  const handleLoginLogout = () => {
    if (btnNameReact === 'Logout') {
      // Handle logout
      localStorage.removeItem('isLoggedIn');
      setBtnNameReact('Login');
      navigate('/login');
    } else {
      // Navigate to login page
      localStorage.setItem('isLoggedIn', 'true');
      setBtnNameReact('Logout');
      navigate('/');
    }
  };

  return (
    <div className="flex justify-between bg-blue-300">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3655/3655682.png"
            alt="Logo"
            className="w-20"
          />
        </Link>
      </div>
      <div>
        <ul className="flex gap-9 m-5 p-5">
          <li>{onlinestatus ? <>Online</> : <>Offline</>}</li>
          <li>
            <Link to="/" className="links">Home</Link>
          </li>
          <li>
            <Link to="/about" className="links">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="links">Contact Us</Link>
          </li>
          <li>
            <Link to="/cart" className="links">{carts.length} Cart</Link>
          </li>
          <li>
            <button
              className="loginBtn"
              onClick={handleLoginLogout}
            >
              {btnNameReact}
            </button>
          </li>
          <li>{logUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
