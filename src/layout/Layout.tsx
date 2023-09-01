import { MyThemeProvider } from "@dohyun-ko/react-atoms";
import { Outlet } from "react-router-dom";
import colorSet from "src/styles/colorSet";

interface LayoutProps {}

const Layout = ({}: LayoutProps) => {
  return (
    <MyThemeProvider theme={{ ...colorSet }}>
      <Outlet />
    </MyThemeProvider>
  );
};

export default Layout;
