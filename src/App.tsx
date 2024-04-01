import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Main, Events, Profile } from "./components";
import { EventDetailForm, Login } from "./components/forms";
import "./styles.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="events" element={<Outlet />}>
            <Route index element={<Events />} />
            <Route path=":id" element={<EventDetailForm />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
