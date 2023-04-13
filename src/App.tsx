import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Main } from "./components/Main";
import { Events } from "./components/Events";
import { Form as EventDetail } from "./components/forms/eventdetail";
import { Login } from "./components/forms/Login";
import { Profile } from "./components/Profile";
import "./styles.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="events" element={<Outlet />}>
            <Route index element={<Events />} />
            <Route path=":id" element={<EventDetail />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
