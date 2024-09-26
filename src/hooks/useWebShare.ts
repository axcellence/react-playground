import { useEffect, useState } from "react";

const useWebShare = () => {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);

  const share = async (
    { title, text, url }: { title?: string; text?: string; url?: string },
  ) => {
    if (canShare) {
      try {
        await navigator.share({
          text,
          title: title ?? document.title,
          url: url ?? window.location.href,
        });
        return true;
      } catch (error) {
        console.error("Error sharing:", error);
        return false;
      }
    }
    return false;
  };

  return { canShare, share };
};

export default useWebShare;
