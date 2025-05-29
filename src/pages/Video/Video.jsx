import { PlayVideo } from '../../components/PlayVideo/PlayVideo';
import { Recommended } from '../../components/Recommended/Recommended';
import { useParams } from 'react-router-dom';
import './Video.css';
export const Video = () => {
  const { videoId, categoryId } = useParams();

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};
