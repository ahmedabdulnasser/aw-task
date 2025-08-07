import { useState, useEffect } from "react";
import { announcementService } from "../services";
import type { Announcement } from "../types";

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const data = await announcementService.getAllAnnouncements();
        setAnnouncements(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch announcements"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return { announcements, loading, error };
};
