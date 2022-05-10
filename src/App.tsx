import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Info from "./components/Info";
import "./styles.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
