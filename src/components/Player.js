import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  setCurrentSong,
  activeLibraryHandler,
}) => {
  const playSongHandler = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };

  const skipTrackHandler = async (direction) => {
    let songIndex = songs.findIndex(
      (songInLoop) => songInLoop.id === currentSong.id
    );
    if (direction === "back") {
      let prevSong =
        songs[(songIndex - 1) % songs.length] || songs[songs.length - 1];
      await setCurrentSong(prevSong);
      activeLibraryHandler(prevSong);
    } else if (direction === "forward") {
      let nextSong = songs[(songIndex + 1) % songs.length];
      await setCurrentSong(nextSong);
      activeLibraryHandler(nextSong);
    }

    if (isPlaying) audioRef.current.play();
  };
  //Add the styles
  const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;
  const sliderPercentage = { transform: `translateX(${animationPercentage}%)` };
  const gradientBackground = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={gradientBackground}>
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div className="animate-track" style={sliderPercentage}></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipTrackHandler("back")}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          onClick={() => skipTrackHandler("forward")}
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
