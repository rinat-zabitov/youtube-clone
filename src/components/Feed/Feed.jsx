import './Feed.css';
import thumbnail1 from '../../assets/thumbnail1.png';
import thumbnail2 from '../../assets/thumbnail2.png';
import thumbnail3 from '../../assets/thumbnail3.png';
import thumbnail4 from '../../assets/thumbnail4.png';
import thumbnail5 from '../../assets/thumbnail5.png';
import thumbnail6 from '../../assets/thumbnail6.png';
import thumbnail7 from '../../assets/thumbnail7.png';
import thumbnail8 from '../../assets/thumbnail8.png';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import { useEffect, useState } from 'react';
import moment from 'moment';

export const Feed = ({ category }) => {
  const [videos, setVideos] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    await fetch(videoList_url)
      .then(res => res.json())
      .then(data => setVideos(data.items));
  };

  console.log(videos);

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {videos &&
        videos.map(video => (
          <Link
            key={video.id}
            to={`video/${video.snippet.categoryId}/${video.id}`}
            className="card"
          >
            <img src={video.snippet.thumbnails.medium.url} alt="" />
            <h2>{video.snippet.title}</h2>
            <h3>{video.snippet.channelTitle}</h3>
            <p>
              {value_converter(video.statistics.viewCount)} views &bull;{' '}
              {moment(video.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))}
    </div>
  );
};
