import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
import TopbarActions from "./TopbarActions";
import LanguageSwitcher from "../../common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

interface TopbarProps {
  onMenuClick: () => void;
  username?: string;
  userAvatar?: string;
  notificationCount?: number;
  messageCount?: number;
  onSearch?: (value: string) => void;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

function Topbar({
  onMenuClick,
  username = "Guest",
  userAvatar,
  notificationCount = 0,
  messageCount = 0,
  onSearch,
  onNotificationClick,
  onMessageClick,
  onProfileClick,
  onLogout,
}: TopbarProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: isRTL ? 0 : `${drawerWidth}px` },
        mr: { sm: isRTL ? `${drawerWidth}px` : 0 },
        background: "white",
        color: "black",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar>
        {/* Mobile: Show hamburger on appropriate side */}
        {isRTL ? (
          // RTL Mobile: Actions first, then spacer, then hamburger
          <>
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <LanguageSwitcher />
              <TopbarActions
                username={username}
                userAvatar={userAvatar}
                notificationCount={notificationCount}
                messageCount={messageCount}
                onNotificationClick={onNotificationClick}
                onMessageClick={onMessageClick}
                onProfileClick={onProfileClick}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "block", sm: "none" },
              }}
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </>
        ) : (
          // LTR Mobile: Hamburger first
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Desktop: Normal layout */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {t("welcome")}, {username}
        </Typography>

        {/* Desktop spacer */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
          }}
        />

        {/* Desktop: Right side container */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          {onSearch && <SearchBar onSearch={onSearch} />}
          <LanguageSwitcher />
          <TopbarActions
            username={username}
            userAvatar={userAvatar}
            notificationCount={notificationCount}
            messageCount={messageCount}
            onNotificationClick={onNotificationClick}
            onMessageClick={onMessageClick}
            onProfileClick={onProfileClick}
          />
        </Box>

        {/* LTR Mobile: Right side actions */}
        {!isRTL && (
          <>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "block", sm: "none" },
              }}
            />
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <LanguageSwitcher />
              <TopbarActions
                username={username}
                userAvatar={userAvatar}
                notificationCount={notificationCount}
                messageCount={messageCount}
                onNotificationClick={onNotificationClick}
                onMessageClick={onMessageClick}
                onProfileClick={onProfileClick}
              />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
