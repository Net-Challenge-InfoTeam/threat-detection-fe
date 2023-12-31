import { Provider } from "jotai";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layout/Layout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import MonitorPage from "./pages/monitor/MonitorPage";
import Paths from "./types/paths";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={Paths.HOME} element={<HomePage />} />
      <Route path={Paths.LOGIN} element={<LoginPage />} />
      <Route path={Paths.MONITOR} element={<MonitorPage />} />
    </Route>,
  ),
);

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
