import React, { useState, useRef } from "react";

// Import styles
import "./styles/app.scss";
import useDarkMode from "use-dark-mode";

//Import components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Import utilities
import data from "./data";

function App() {
  //Ref
  const audioRef = useRef(null);

  //State

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  //Handlers

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
    });
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((songInLoop) => {
      if (songInLoop.id === nextPrev.id) {
        return { ...songInLoop, active: true };
      } else {
        return { ...songInLoop, active: false };
      }
    });

    setSongs(newSongs);
  };

  const songEndHandler = async () => {
    let songIndex = songs.findIndex(
      (songInLoop) => songInLoop.id === currentSong.id
    );
    const nextSong = songs[(songIndex + 1) % songs.length];
    await setCurrentSong(nextSong);
    activeLibraryHandler(nextSong);
    if (isPlaying) audioRef.current.play();
  };

  let darkMode = useDarkMode(false);

  function changeTheme() {
    darkMode.toggle();
  }

  //Render

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <input
        type="checkbox"
        checked={useDarkMode.value}
        element={document.library}
        onChange={changeTheme}
      />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        activeLibraryHandler={activeLibraryHandler}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
      />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
      <Library
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
}

export default App;
