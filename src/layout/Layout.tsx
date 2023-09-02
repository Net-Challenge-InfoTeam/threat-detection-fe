import { MyThemeProvider } from "@dohyun-ko/react-atoms";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import colorSet from "src/styles/colorSet";

interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  return (
    <MyThemeProvider theme={{ ...colorSet }}>
      <Outlet />

      <ToastContainer />
    </MyThemeProvider>
  );
};

export default Layout;
