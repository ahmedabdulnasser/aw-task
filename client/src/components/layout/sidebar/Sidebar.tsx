import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { CalendarMonth, Home, LibraryBooks, School } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  onTransitionEnd: () => void;
  container?: () => HTMLElement;
}

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  onClose,
  onTransitionEnd,
  container,
}) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const navigationItems = [
    { title: t("sidebar.dashboard"), icon: <Home />, path: "/" },
    {
      title: t("sidebar.calendar"),
      icon: <CalendarMonth />,
      path: "/schedule",
    },
    { title: t("sidebar.courses"), icon: <LibraryBooks />, path: "/courses" },
  ];

  const secondaryNavItems = [
    { title: t("sidebar.grades"), icon: <School />, path: "/gradebook" },
    { title: t("sidebar.performance"), icon: <CalendarMonth />, path: "/performance" },
    {
      title: t("sidebar.announcements"),
      icon: <LibraryBooks />,
      path: "/announcements",
    },
  ];

  const drawerStyles = {
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
      background: "linear-gradient(135deg, #0f2027, #2c5364, #00bcd4)",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
      },
      "& .MuiListItemText-root": {
        color: "white",
      },
      "& .MuiListItemButton-root": {
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "black",
          "& .MuiListItemIcon-root": {
            color: "black",
          },
          "& .MuiListItemText-root": {
            color: "black",
          },
        },
        "&.Mui-selected": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          },
        },
      },
      "& .MuiDivider-root": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
    },
  };

  const drawer = (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          marginBottom: 1,
        }}
      >
        <Box
          component="img"
          src="https://www.anyware.software/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fanywarelogo.04ede1ce.webp&w=3840&q=75"
          alt="Anyware Software Logo"
          sx={{
            height: 40,
            width: "auto",
            maxWidth: "80%",
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }}
        />
      </Box>

      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={onClose}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryNavItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={onClose}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          ...drawerStyles,
        }}
        anchor={isRTL ? "right" : "left"}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          ...drawerStyles,
        }}
        anchor={isRTL ? "right" : "left"}
        open
      >
        {drawer}
        <Toolbar />
      </Drawer>
    </Box>
  );
};

export default Sidebar;
