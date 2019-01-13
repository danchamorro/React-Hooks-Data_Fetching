import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("reacthooks");

  useEffect(
    () => {
      axios
        .get(`http://hn.algolia.com/api/v1/search?query=${query}`)
        .then(res => {
          console.log(res.data);
          setResults(res.data.hits);
        });
    },
    [query]
  );

  return (
    <>
      <input type="text" onChange={event => setQuery(event.target.value)} />
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
