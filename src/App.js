import React, { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import { redditMachine } from "./redditMachine";
import { SubReddit } from "./SubReddit";

import "./App.scss";

async function fetchSubreddits() {
  return fetch("https://api.reddit.com/subreddits").then((response) =>
    response
      .json()
      .then((json) =>
        json.data.children.map((child) => child.data.display_name)
      )
  );
}

const App = () => {
  const [current, send] = useMachine(redditMachine);
  const { subreddit } = current.context;
  const [subreddits, setSubreddits] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSubreddits();
      console.log(response);
      setSubreddits(response);
    };
    fetchData();
  }, []);

  return (
    <main
      data-machine={redditMachine.id}
      data-state={current.toStrings().join(" ")}
    >
      <header>
        <select
          onChange={(e) => {
            send("SELECT", { name: e.target.value });
          }}
        >
          <option disabled>Select One</option>
          {subreddits.map((subreddit) => {
            return <option key={subreddit}> {subreddit}</option>;
          })}
        </select>
      </header>
      <div>
        <h1>{current.matches("idle") ? "Select a subreddit" : null}</h1>
        {subreddit && <SubReddit service={subreddit} key={subreddit.id} />}
      </div>
    </main>
  );
};

export default App;
