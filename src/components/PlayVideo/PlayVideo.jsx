import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { useEffect, useState } from 'react';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

export const PlayVideo = () => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchVideoData = async () => {
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;

    await fetch(video_url)
      .then(res => res.json())
      .then(data => setApiData(data.items[0]));
  };

  const fetchChannelData = async () => {
    const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

    await fetch(channel_url)
      .then(res => res.json())
      .then(data => setChannelData(data.items[0]));

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then(res => res.json())
      .then(data => setComments(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : '22k'} views{' '}
          {moment(apiData?.snippet.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="Like" />
            {apiData ? value_converter(apiData.statistics.likeCount) : '22k'}
          </span>
          <span>
            <img src={dislike} alt="Dislike" />
            {apiData ? value_converter(apiData.statistics.dislikeCount) : '22k'}
          </span>
          <span>
            <img src={share} alt="Share" />
            Share
          </span>
          <span>
            <img src={save} alt="Like" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ''}
          alt="Channel"
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : 'Unknown'}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : '22k'}
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250) + '...'
            : 'Description here'}
        </p>
        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 222}</h4>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <img
              src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt=""
            />
            <div>
              <h3>
                {comment.snippet.topLevelComment.snippet.authorDisplayName}
                <span>1 day ago</span>
              </h3>
              <p>{comment.snippet.topLevelComment.snippet.textOriginal}</p>
              <div className="comment-action">
                <img src={like} alt="Like" />
                <span>
                  {value_converter(comment.snippet.topLevelComment.snippet.likeCount)}
                </span>
                <img src={dislike} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
