import { useEffect, useState } from "react";
import axios from "axios";

const useYouTubeLiveStatus = (channelId: string, apiKey: string) => {
  const [isLive, setIsLive] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLive = async () => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              channelId,
              type: "video",
              eventType: "live",
              key: apiKey,
            },
          }
        );

        setIsLive(res.data.items.length > 0);
      } catch (error) {
        console.error("Erreur vérification live :", error);
        setIsLive(null);
      }
    };

    checkLive();
    const interval = setInterval(checkLive, 10000); // vérifie toutes les 10 sec

    return () => clearInterval(interval);
  }, [channelId, apiKey]);

  return isLive;
};

export default useYouTubeLiveStatus;
