import React from "react";
import "./index.css";
import VideoItem from "../VideoItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideoList } from "./../../store/video/videoSlice";
import { videoUrl } from "./../../lib/api";
import MoonLoader from "react-spinners/MoonLoader"; /* npm React Spinners 라이브러리 중 MoonLoader 모양 사용 */

const VideoList = ({ display }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.video);
  useEffect(() => {
    dispatch(getVideoList(videoUrl));
  }, []);

  /* npm React Spinners 라이브러리 (로딩->데이터없을때 실행시키기, 데이터있으면 아래꺼 map실행)*/
  if (loading) {
    return (
      <MoonLoader
        color="#ef1a1a"
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        loading
        size={150}
        speedMultiplier={1}
      />
    );
  }
  return (
    <ul
      className={
        display === "grid" ? "videoList VideoGrid" : "videoList VideoRowList"
      }
    >
      {data.map((item, idx) => (
        <VideoItem
          key={item.snippet.thumbnails.default.url}
          item={item.snippet}
          value={item}
        />
      ))}
    </ul>
  );
};

export default VideoList;
