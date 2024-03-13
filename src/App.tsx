import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResult/SearchResult';

function App() {

  const [repo, setRepo] = useState<string>("");
  return (
    <div className="w-full">
      <header className="font-bold text-2xl m-2 text-center">
        Pull Requests
      </header>
      <SearchBar updateRepo={setRepo} />
      {repo && <SearchResult repo={repo} />}
    </div>
  );
}

export default App;
