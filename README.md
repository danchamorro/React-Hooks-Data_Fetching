# Data Fetching with React Hooks

This app is called React News. I will build an app to learn more about fetching data with Hooks and replacing Class Lifecycle Methods.

---

## Fetching Data on component Mount with useEffect

_* useEffect() default behavior is to run after every render so we need to add a second argument of a empty array *_

```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://hn.algolia.com/api/v1/search?query=reacthooks")
      .then(res => {
        console.log(res.data);
        setResults(res.data.hits);
      });
  }, []); // Must add second argument of empty array because useEffect() default behavior.

  return (
    <>
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
```

## Fetching Search Results on Component Update with useEffect

Lets create a search function to query the API.

```javascript
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
    [query] // pass the query in as a dependency.
  );

  return (
    <>
      {/* Pass the value to query state */}
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
```

## Fetching Data upon Submitting Form

Now we will change the search functionality to only search after a submit. We will also refactor to use async.

```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setResults(response.data.hits);
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
        />
      </form>
      <button type="submit">Search</button>
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
```
