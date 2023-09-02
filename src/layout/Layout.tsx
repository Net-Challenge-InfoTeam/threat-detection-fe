import { MyThemeProvider } from "@dohyun-ko/react-atoms";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useGPS from "src/hooks/useGPS";
import colorSet from "src/styles/colorSet";

interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  useGPS();

  return (
    <MyThemeProvider theme={{ ...colorSet }}>
      <Outlet />

      <ToastContainer />
    </MyThemeProvider>
  );
};

export default Layout;
