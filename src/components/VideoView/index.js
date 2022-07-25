import React from "react";
import "./index.css";
import { useEffect } from "react";
import { channelUrl } from "../../lib/api";
import { getChannelInfo } from "../../store/video/videoSlice";
import { useSelector, useDispatch } from "react-redux";

const VideoView = ({ id, channelId }) => {
  const dispatch = useDispatch();
  const { channel } = useSelector((state) => state.video);
  useEffect(() => {
    const channelIdInfo = channelUrl(channelId);
    dispatch(getChannelInfo(channelIdInfo));
  }, [channelId, dispatch]);
  return (
    <div className="playVideoBox">
      <div className="iframeBox">
        <iframe
          /* src={`https://www.youtube.com/embed/${id}`} */
          src={`https://www.youtube-nocookie.com/embed/${id}`} /*-nocookie:유튜브 쿠키없는 도메인 받아오기(이유:samsite의 쿠키막아서 생기는 오류 없애기 위해) */
          title="youtube video"
          allowFullScreen
        ></iframe>
      </div>
      {
        channel && (
          <div className="descriptionContainer">
            <div className="channel-img">
              <img src={channel[0].snippet.thumbnails.default.url} alt="" />
            </div>
            <div className="channel-data">
              <h3 className="channel-title">{channel[0].snippet.title}</h3>
              <p className="channel-des">{channel[0].snippet.description}</p>
            </div>
          </div>
        ) /* channel && :channel이 있으면 */
      }
    </div>
  );
};

export default VideoView;
