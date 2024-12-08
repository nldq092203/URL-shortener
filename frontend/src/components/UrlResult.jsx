import React from "react";
import { Button, CopyButton } from "@mantine/core";

const UrlResult = ({ result }) => {
  if (!result) return null;

  const shortUrl = `http://localhost:5173/${result.short_url_id}`;

  return (
    <div className="space-y-4">
      <p>Short URL:</p>
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        {shortUrl}
      </a>
      <CopyButton value={shortUrl}>
        {({ copied, copy }) => (
          <Button color={copied ? "green" : "blue"} onClick={copy}>
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        )}
      </CopyButton>
    </div>
  );
};

export default UrlResult;