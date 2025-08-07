import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

interface NotificationBadgeProps {
  icon: React.ReactNode;
  count: number;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  onClick?: () => void;
  ariaLabel?: string;
}

function NotificationBadge({
  icon,
  count,
  color = "error",
  onClick,
  ariaLabel,
}: NotificationBadgeProps) {
  return (
    <IconButton
      size="large"
      aria-label={ariaLabel}
      color="inherit"
      onClick={onClick}
    >
      <Badge
        badgeContent={count}
        color={color}
        sx={{
          "& .MuiBadge-badge": {
            background: "linear-gradient(135deg, #0f2027, #2c5364, #00bcd4)",
            color: "white",
          },
        }}
      >
        {icon}
      </Badge>
    </IconButton>
  );
}

export default NotificationBadge;
