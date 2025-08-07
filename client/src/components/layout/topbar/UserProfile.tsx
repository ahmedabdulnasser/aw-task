import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

interface UserProfileProps {
  username: string;
  userAvatar?: string;
  onClick?: () => void;
}

function UserProfile({ username, userAvatar, onClick }: UserProfileProps) {
  return (
    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      color="inherit"
      onClick={onClick}
    >
      <Avatar alt={username} src={userAvatar} sx={{ width: 32, height: 32 }}>
        {username.charAt(0).toUpperCase()}
      </Avatar>
    </IconButton>
  );
}

export default UserProfile;
