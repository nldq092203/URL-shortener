import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRedirectUrl } from "../api/urlApi";

const RedirectPage = () => {
  const { shortUrlId } = useParams();

  const { data: longUrl, isLoading, error } = useQuery(
    ["redirect", shortUrlId],
    () => fetchRedirectUrl(shortUrlId),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (longUrl) {
      window.location.href = longUrl;
    }
  }, [longUrl]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <p>Redirecting...</p>;
};

export default RedirectPage;