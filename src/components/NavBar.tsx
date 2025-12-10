import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("greska");
    }
  }
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/favorites" className="nav-link">
              Favorites
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
