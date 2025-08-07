import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Skeleton,
  Alert,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Announcement as AnnouncementIcon } from "@mui/icons-material";
import { useAnnouncements } from "../../hooks/useAnnouncements";
import { useTranslation } from "react-i18next";

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  height: "fit-content",
}));

const AnnouncementItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(1.5),
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(2),
  "&:last-child": {
    marginBottom: 0,
    paddingBottom: 0,
  },
}));

const Announcements: React.FC = () => {
  const { announcements, loading, error } = useAnnouncements();
  const { t } = useTranslation();

  if (loading) {
    return (
      <StyledCard>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="600">
              {t("dashboard.announcements.title")}
            </Typography>
            <Button size="small" sx={{ color: "#14b8a6" }}>
              {t("dashboard.announcements.allButton")}
            </Button>
          </Box>

          <Box>
            {[1, 2, 3].map((i) => (
              <AnnouncementItem key={i}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box flex={1}>
                  <Skeleton variant="text" width="75%" height={20} />
                  <Skeleton variant="text" width="100%" height={16} />
                </Box>
              </AnnouncementItem>
            ))}
          </Box>
        </CardContent>
      </StyledCard>
    );
  }

  if (error) {
    return (
      <StyledCard>
        <CardContent>
          <Alert severity="error">
            {t("dashboard.announcements.error")}: {error}
          </Alert>
        </CardContent>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="600">
            {t("dashboard.announcements.title")}
          </Typography>
          <Button size="small" sx={{ color: "#14b8a6" }}>
            {t("dashboard.announcements.allButton")}
          </Button>
        </Box>

        <Box>
          {announcements.slice(0, 4).map((announcement, index) => (
            <Box key={announcement._id}>
              <AnnouncementItem>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#14b8a6",
                    fontSize: "0.75rem",
                  }}
                >
                  <AnnouncementIcon sx={{ fontSize: 16 }} />
                </Avatar>
                <Box flex={1} minWidth={0}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={0.5}
                  >
                    <Typography
                      variant="body2"
                      fontWeight="500"
                      sx={{ flex: 1, mr: 1 }}
                    >
                      {announcement.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ flexShrink: 0 }}
                    >
                      {new Date(announcement.postedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.3,
                    }}
                  >
                    {announcement.content}
                  </Typography>
                </Box>
              </AnnouncementItem>
              {index < announcements.slice(0, 4).length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default Announcements;
