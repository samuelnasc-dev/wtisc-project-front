import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import "./layout.scss";

function Layout() {
  return (
    <div className="layout">
      <nav className="navbar">
        <Navbar />
      </nav>
      <div className="main">
        <Outlet />
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Outlet />
        </div>
        <div className="footer">
        <Footer />
      </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
