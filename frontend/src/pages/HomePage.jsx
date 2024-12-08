import React, { useState } from "react";
import UrlForm from "../components/UrlForm";
import UrlResult from "../components/UrlResult";

const HomePage = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">URL Shortener</h1>
      <UrlForm setResult={setResult} />
      <UrlResult result={result} />
    </div>
  );
};

export default HomePage;