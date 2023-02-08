import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Main } from "./components/Main";
import { Events } from "./components/Events";
import { Form as EventDetail } from "./components/forms/eventdetail";
import { Login } from "./components/forms/Login";
import { Logout } from "./components/Logout";
import { Info } from "./components/Info";
import "./styles.css";
import { ErrorFallback } from "./common/error";
import { ErrorBoundary } from "react-error-boundary";

export const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
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
      </ErrorBoundary>
    </BrowserRouter>
  );
};
