import Navbar from "./Layout/Navbar";
import Footer from './Layout/Footer';
import HeaderSection from "./Layout/headerSection";
import NavbarIndex from "./Layout/NavbarIndex"; 
import Section from "./Layout/Section";

const Layout = () => {
  return (
    <div className="layout">
      <HeaderSection /> 
      <Navbar /> 
      <div className="main-content" style={{ height: "100vh" }}>
        <NavbarIndex className="sidebar" />
        <main className="content-section">
          <Section />
        </main>
      </div>
      <Footer />
      
      <style>{`
        .layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          font-family: 'Roboto', sans-serif;
        }

        header,
        nav {
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .main-content {
          display: flex;
          flex: 1;
          overflow: hidden;
          background: #f9f9f9;
          padding: 20px;
        }

        .sidebar {
          width: 250px;
          background: #2c3e50;
          color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
        }

        .sidebar:hover {
          transform: translateX(10px);
        }

        .content-section {
          flex: 1;
          background: white;
          padding: 30px;
          margin-left: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
        }

        footer {
          background: #333;
          color: white;
          text-align: center;
          padding: 10px 0;
          position: relative;
          bottom: 0;
          width: 100%;
        }

        /* Header Styles */
        header {
          background-color: #3498db;
          color: white;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        /* Navbar Styles */
        nav {
          background: #34495e;
          color: white;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        nav a {
          color: white;
          margin-right: 15px;
          text-decoration: none;
          font-weight: bold;
        }

        nav a:hover {
          text-decoration: underline;
        }

        /* Footer Styles */
        footer p {
          margin: 0;
          font-size: 14px;
        }

        /* Sidebar Transition */
        .sidebar {
          transition: all 0.3s ease;
        }

        .sidebar:hover {
          background-color: #34495e;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Layout;
