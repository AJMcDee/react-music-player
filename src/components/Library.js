import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  audioRef,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            key={song.id}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            audioRef={audioRef}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
