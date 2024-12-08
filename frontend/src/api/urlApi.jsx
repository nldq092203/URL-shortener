import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const shortenUrl = async ({ longUrl, alias, expirationDate }) => {
  const { data } = await axios.post(`${API_BASE_URL}/urls/`, {
    long_url: longUrl,
    short_url_id: alias,
    expiration_date: expirationDate,
  });
  return data;
};

export const fetchRedirectUrl = async (shortUrlId) => {
  const { data } = await axios.get(`${API_BASE_URL}/urls/${shortUrlId}/`);
  return data.long_url;
};