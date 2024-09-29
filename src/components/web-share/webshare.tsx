import { useWebShare, type ShareProps } from './useWebShare';

export function ShareButton(props: ShareProps) {
  const { canShare, share } = useWebShare();

  const handleShare = async () => {
    if (canShare) {
      try {
        await share(props);
      } catch {
        console.error(`Sharing failed`);
      }
    } else {
      console.warn('Web Share API is not supported in this browser');
    }
  };

  return (
    <button onClick={handleShare} disabled={!canShare} hidden={!canShare}>
      Share
    </button>
  );
};