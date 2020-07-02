import { useState, useEffect } from "react";

async function fetchSubreddits() {
  return fetch("https://api.reddit.com/subreddits").then((response) =>
    response
      .json()
      .then((json) =>
        json.data.children.map((child) => child.data.display_name)
      )
  );
}

export const useSubreddits = () => {
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSubreddits();
      setSubreddits(response);
    };
    fetchData();
  }, []);
  return [subreddits];
};
