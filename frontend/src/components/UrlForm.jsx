import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { shortenUrl } from "../api/urlApi";
import { TextInput, Button, Notification } from "@mantine/core";
import ExpirationDatePicker from "./ExpirationDatePicker"; // Import your custom component

const UrlForm = ({ setResult }) => {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expirationDate, setExpirationDate] = useState(null); // Set as null initially
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: shortenUrl, // Mutation function to shorten the URL
    onSuccess: (data) => {
      setResult(data);
      setLongUrl("");
      setAlias("");
      setExpirationDate(null);
    },
    onError: (error) => {
      setError(error.response?.data?.error || "An error occurred.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    mutation.mutate({
      longUrl,
      alias,
      expirationDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Long URL"
        placeholder="Enter the long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <TextInput
        label="Custom Alias (Optional)"
        placeholder="Enter custom alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />

      {/* Use ExpirationDatePicker as a component */}
      <ExpirationDatePicker
        expirationDate={expirationDate}
        setExpirationDate={setExpirationDate} 
      />

      <Button type="submit" loading={mutation.isLoading}>
        {mutation.isLoading ? "Creating..." : "Shorten URL"}
      </Button>
      {error && (
        <Notification color="red" onClose={() => setError("")}>
          {error}
        </Notification>
      )}
    </form>
  );
};

export default UrlForm;