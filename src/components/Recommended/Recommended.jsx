import './Recommended.css';
import { useEffect, useState } from 'react';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';
export const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchVideoData = async () => {
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&maxResults=50&key=${API_KEY}`;

    await fetch(video_url)
      .then(res => res.json())
      .then(data => setApiData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData &&
        apiData.map(video => (
          <Link
            to={`/video/${video.snippet.categoryId}/${video.id}`}
            key={video.id}
            className="side-video-list"
          >
            <img src={video.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{video.snippet.title}</h4>
              <p>{video.snippet.channelTitle}</p>
              <p>{value_converter(video.statistics.viewCount)} Views</p>
            </div>
          </Link>
        ))}
    </div>
  );
};
