import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/jack.png';
import { Link } from 'react-router-dom';
export const Navbar = ({ setSidebar }) => {
  return (
    <nav className="nav flex">
      <div className="nav-left flex">
        <img
          className="menu-icon"
          onClick={() => setSidebar(prev => !prev)}
          src={menu_icon}
          alt="Menu"
        />
        <Link to={'/'}>
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="nav-middle flex">
        <div className="search-box flex">
          <input type="text" placeholder="Search" />
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <div className="nav-right flex">
        <img src={upload_icon} alt="Upload" />
        <img src={more_icon} alt="More" />
        <img src={notification_icon} alt="Notification" />
        <img className="user-icon" src={profile_icon} alt="Profile" />
      </div>
    </nav>
  );
};
