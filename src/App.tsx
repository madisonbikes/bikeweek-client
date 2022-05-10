import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Main, Login, Logout, Info, Events, EventDetail } from "./components";
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
          <Route path="logout" element={<Logout />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
