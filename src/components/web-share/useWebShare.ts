import { useEffect, useState } from "react";

export type ShareProps = {
  title?: string;
  text?: string;
  url?: string;
};

export function useWebShare() {
  const [canShare, setCanShare] = useState(false);
  const [cancelledShare, setCancelledShare] = useState(false);

  useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);

  const share = async (props: ShareProps) => {
    if (canShare) {
      try {
        await navigator.share({
          text: props.text,
          title: props.title ?? document.title,
          url: props.url ?? window.location.href,
        });
        return true;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setCancelledShare(true);
        } else {
          console.error("Error sharing:", error);
        }
        return false;
      }
    }
    return false;
  };

  return { canShare, share, cancelledShare };
}
