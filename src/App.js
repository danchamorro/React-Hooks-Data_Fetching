import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setResults(response.data.hits);
    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  return (
    <div className="container mt-3">
      <h1>Hook News</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group row">
          <div className="col-sm-11">
            <input
              type="text"
              onChange={event => setQuery(event.target.value)}
              value={query}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-outline-success">
            Search
          </button>
        </div>
      </form>
      {loading ? (
        <div>Loading Results...</div>
      ) : (
        <ul className="list-group list-group-flush">
          {results.map(result => (
            <li key={result.objectID} className="list-group-item">
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
