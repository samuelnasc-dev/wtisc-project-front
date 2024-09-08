import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import HomePage from "../homePage/homePage";
import "./layout.scss";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <HomePage />
      </div>
      <div className="footer">
        <Footer />
      </div>
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
          <HomePage />
        </div>
        <div className="footer">
        <Footer />
      </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
