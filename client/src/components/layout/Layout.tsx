import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Topbar from "./topbar/Topbar";
import Sidebar from "./sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
  username?: string;
  window?: () => Window;
}

function Layout({ children, username, window }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const dispatch = useDispatch();

  // Reset states on screen size change
  React.useEffect(() => {
    const handleResize = () => {
      // Reset closing state when screen size changes
      setIsClosing(false);
      // Optionally close mobile drawer on larger screens
      if (window && window().innerWidth >= 600) {
        setMobileOpen(false);
      }
    };

    if (window) {
      window().addEventListener("resize", handleResize);
      return () => window().removeEventListener("resize", handleResize);
    }
  }, [window]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setIsClosing(false);
    console.log("Menu toggled:", !mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Topbar
        onMenuClick={handleDrawerToggle}
        username={username}
        userAvatar="/path/to/avatar.jpg"
        notificationCount={5}
        messageCount={2}
        onSearch={(value) => console.log("Searching for:", value)}
        onNotificationClick={() => console.log("Notifications clicked")}
        onMessageClick={() => console.log("Messages clicked")}
        onProfileClick={() => console.log("Profile clicked")}
        onLogout={handleLogout}
      />

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation"
      >
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={handleDrawerClose}
          onTransitionEnd={handleDrawerTransitionEnd}
          container={container}
        />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
