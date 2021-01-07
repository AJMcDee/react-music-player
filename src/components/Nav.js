import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import useDarkMode from "use-dark-mode";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  let darkMode = useDarkMode(false);
  function changeTheme() {
    darkMode.toggle();
  }

  console.log(darkMode.value);

  return (
    <nav>
      <div id="left-side">
        <h1>Beats and Waves</h1>
      </div>
      <div id="right-side">
        <button onClick={() => setLibraryStatus(!libraryStatus)}>
          Library
          <br /> <FontAwesomeIcon icon={faMusic} />
        </button>
        <div class="toggle">
          <input
            type="checkbox"
            checked={darkMode.value}
            element={document.library}
            onChange={changeTheme}
            id="toggle"
          />
          <label for="toggle">
            <center>
              <div id="iconcontainer">
                <FontAwesomeIcon id="sunIcon" icon={faSun} />
                <FontAwesomeIcon id="moonIcon" icon={faMoon} />
              </div>
            </center>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
