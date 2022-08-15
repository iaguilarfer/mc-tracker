import React from "react";
import logo from "../../logo.svg";
import styles from "./App.module.css";
import { Button } from "../../components/Button/Button";

function App() {
  return (
    <div className={styles["App"]}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button text={"Button"} onClick={console.warn} disabled={true} />
      </header>
    </div>
  );
}

export default App;
