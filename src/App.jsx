import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateCompte from "./Pages/CreateAccount";
import Login from "./Pages/Login";
import Admin from "./Pages/admin";
import AddUser from "./Layout/NavItems/AddUser";
import Couleur from "./Layout/NavItems/couleur";
import Navbar from "./Layout/Navbar";
import HeaderSection from "./Layout/headerSection";
import Layout from "./Layout";
import Home from "./Layout/NavItems/home";
import Profile from "./Layout/NavItems/Profile";
import NavbarIndex from "./Layout/NavbarIndex";
import ListeUtilisateurs from "./Layout/NavItems/listUser";
import Request from "./Layout/NavItems/Request";

const App = () => {
  const isAdmin = true; 

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
      
        <Route path="/createaccount" element={<CreateCompte />} />
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/request" />}
        />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/header" element={<HeaderSection />} />
        <Route path="/layout" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="list-tUser" element={<ListeUtilisateurs />} />
          <Route path="couleur" element={<Couleur />} />
          <Route path="request" element={<Request />} />
        </Route>
        <Route path="/navbar2" element={<NavbarIndex />} />
      </Routes>
    </Router>
  );
};

export default App;
