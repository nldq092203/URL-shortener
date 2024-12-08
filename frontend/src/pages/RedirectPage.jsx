import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RedirectPage = () => {
  const { shortUrlId } = useParams(); // Access the route parameter
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRedirect = async () => {
      if (!shortUrlId) {
        setError("Invalid short URL.");
        return;
      }

      try {
        // Manually disable rejecting HTTP status codes
        const response = await axios.get(`http://localhost:8000/api/v1/urls/${shortUrlId}/`, {
          validateStatus: (status) => status >= 200 && status < 400, // Accept 2xx and 3xx responses
        });

        if (response.status === 302) {
          // Redirect to the long URL
          window.location.href = response.data.long_url;
        }
      } catch (error) {
        if (error.response?.status === 410) {
          setError("The short URL has expired.");
        } else if (error.response?.status === 404) {
          setError("The short URL does not exist.");
        } else {
          console.error("An unexpected error occurred:", error);
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchRedirect();
  }, [shortUrlId]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-lg mt-4">{error}</p>
        <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
          Go Back to Home
        </a>
      </div>
    );
  }

  return <div className="text-center mt-20">Loading...</div>;
};

export default RedirectPage;