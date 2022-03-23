import "./App.css";
import "./assets/css/material-dashboard.css";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "./assets/img/apple-icon.png";
import "./assets/img/favicon.png";
import Dashboard from "./pages/Dashboard";
import Inquiry from "./pages/Inquiry";
import Profile from "./pages/Profile";
import AddMembers from "./pages/AddMembers";
import Events from "./pages/Events";
import Error404 from "./pages/Error404";
import Signin from "./pages/Signin";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ImageUpload from "./component/ImageUpload";
import NoticePage from "./pages/NoticePage";

function App() {
  return (
    <>
      <ToastContainer position="top-right" />

      <Routes>
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/Inquiry" element={<Inquiry />} />
        <Route exact path="/Notices" element={<NoticePage />} />
        <Route exact path="/Profile/:id" element={<Profile />} />
        <Route exact path="/AddMembers" element={<AddMembers />} />
        <Route exact path="/Events" element={<Events />} />
        <Route exact path="/ImageUpload" element={<ImageUpload />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
