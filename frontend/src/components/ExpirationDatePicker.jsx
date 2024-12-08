import React, { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { Select } from "@mantine/core";

const ExpirationDatePicker = ({ expirationDate, setExpirationDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false); // Control the visibility of the DatePicker

  const handleDropdownChange = (value) => {
    const today = new Date();
    switch (value) {
      case "1 Day":
        setShowDatePicker(false); // Hide DatePicker
        setExpirationDate(new Date(today.setDate(today.getDate() + 1)));
        break;
      case "1 Week":
        setShowDatePicker(false); // Hide DatePicker
        setExpirationDate(new Date(today.setDate(today.getDate() + 7)));
        break;
      case "1 Month":
        setShowDatePicker(false); // Hide DatePicker
        setExpirationDate(new Date(today.setMonth(today.getMonth() + 1)));
        break;
      case "Custom":
        setShowDatePicker(true); // Show DatePicker
        setExpirationDate(null); // Reset the expiration date for custom selection
        break;
      default:
        setShowDatePicker(false); // Hide DatePicker by default
        setExpirationDate(null);
    }
  };

  return (
    <div>
      <Select
        label="Expiration Option"
        placeholder="Select duration"
        onChange={handleDropdownChange}
        data={[
          { value: "1 Day", label: "1 Day" },
          { value: "1 Week", label: "1 Week" },
          { value: "1 Month", label: "1 Month" },
          { value: "Custom", label: "Custom Date" },
        ]}
      />

      {showDatePicker && (
        <DatePicker
          label="Expiration Date (Optional)"
          placeholder="Pick date"
          value={expirationDate}
          onChange={setExpirationDate}
        />
      )}
    </div>
  );
};

export default ExpirationDatePicker;