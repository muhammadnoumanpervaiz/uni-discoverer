import React from "react";
import { Chip } from "@mui/material";
import "../App.css";

export const CountriesChips = ({ countriesData, getCountryName, selectedCountry }) => {

  return (
    <div>
      <div style={{ display: "flex", maxWidth: "100%" }}>
        {countriesData?.map((country, index) => (
          <Chip
            key={index}
            label={country}
            clickable
            color={
              selectedCountry === country ? "primary" : "default"
            }
            onClick={() => getCountryName(country)}
            style={{ marginRight: "8px" }}
          />
        ))}
      </div>
    </div>
  );
};
