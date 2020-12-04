import React from "react";

const LibrarySong = ({
  song,
  setCurrentSong,
  isPlaying,
  audioRef,
  songs,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    //add Active state to selected song
    const newSongs = songs.map((songInLoop) => {
      if (songInLoop.id === song.id) {
        return { ...songInLoop, active: true };
      } else {
        return { ...songInLoop, active: false };
      }
    });
    if (isPlaying) audioRef.current.play();
    setSongs(newSongs);
  };
  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.alt}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
