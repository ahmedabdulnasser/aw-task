import Box from "@mui/material/Box";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import NotificationBadge from "./NotificationBadge";
import UserProfile from "./UserProfile";

interface TopbarActionsProps {
  username: string;
  userAvatar?: string;
  notificationCount: number;
  messageCount: number;
  onNotificationClick?: () => void;
  onMessageClick?: () => void;
  onProfileClick?: () => void;
}

function TopbarActions({
  username,
  userAvatar,
  notificationCount,
  messageCount,
  onNotificationClick,
  onMessageClick,
  onProfileClick,
}: TopbarActionsProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* Messages */}
      <NotificationBadge
        icon={<MailIcon />}
        count={messageCount}
        color="primary"
        onClick={onMessageClick}
        ariaLabel={`show ${messageCount} new messages`}
      />

      {/* Notifications */}
      <NotificationBadge
        icon={<NotificationsIcon />}
        count={notificationCount}
        color="error"
        onClick={onNotificationClick}
        ariaLabel={`show ${notificationCount} new notifications`}
      />

      {/* Profile Avatar */}
      <UserProfile
        username={username}
        userAvatar={userAvatar}
        onClick={onProfileClick}
      />
    </Box>
  );
}

export default TopbarActions;
