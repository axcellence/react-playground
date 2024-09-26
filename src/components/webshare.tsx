import useWebShare from '../hooks/useWebShare';

type ShareButtonProps = {
  title?: string;
  text?: string;
  url?: string;
};

const ShareButton = (props: ShareButtonProps) => {
  const { canShare, share } = useWebShare();

  const handleShare = async () => {
    if (canShare) {
      const shared = await share(props);
      if (shared) {
        console.log('Content was shared successfully');
      } else {
        console.log('Sharing failed');
      }
    } else {
      console.log('Web Share API is not supported in this browser');
    }
  };

  return (  
    <button onClick={handleShare} disabled={!canShare} hidden={!canShare}>
      Share
    </button>
  );
};

export default ShareButton;