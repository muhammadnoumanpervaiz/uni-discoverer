import React, { useState, useEffect } from "react";
import { Images } from "../assets/images";
import { TextField, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import axios from "axios";
import { DetailList } from "./DetailList";
import { CountriesChips } from "./CountriesChips";
import { DataExistCard } from "./DataExistCard";
import "../App.css";

const BASE_URL = "http://localhost:5000/universities";

const Dashboard = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [countryName, setCountryName] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [allowUpdateData, setAllowUpdateData] = useState(false);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [allowSaveData, setAllowSaveData] = useState(false);

  const getUniversityDataByCountry = async () => {
    const response = await axios.get(
      `http://universities.hipolabs.com/search?country=${countryName}`
    );
    if (response.data) {
      return response.data;
    }
  };

  const handleSaveData = async () => {
    const { data } = await axios.post(BASE_URL, {
      countryName,
      universities,
    });
    if (data.error) {
      setAllowUpdateData(true);
    } else {
      setCountryName(null);
      setUniversities(data.universities);
    }
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
    setSelectedCountry(null);
  };

  const searchUniversitiesBySelectedCountry = async (country) => {
    setSelectedCountry(country);
    const { data } = await axios.get(`${BASE_URL}/${country}`);
    setUniversities(data.universities);
  };

  const handleSearchUniversirty = async () => {
    if (!countryName) return;
    const response = await getUniversityDataByCountry();
    if (response) {
      setUniversities(response);
      setAllowSaveData(true);
    }
  };

  const updateUniversitiesData = async () => {
    if (!countryName || !universities) return;
    const { data } = await axios.put(BASE_URL, {
      countryName,
      universities,
    });

    if (data.updatedUniversity) {
      setAllowUpdateData(false);
      setAllowSaveData(false);
      setCountryName(null);
    }
  };

  useEffect(() => {
    const getUniversitiesData = async () => {
      const { data } = await axios.get(BASE_URL);
      const countries = Object.keys(
        data.countries.reduce((acc, country) => {
          acc[country] = true;
          return acc;
        }, {})
      );
      setSearchedCountries(countries);
    };
    getUniversitiesData();
  }, []);

  return (
    <div>
      <div style={styles.containerStyle}>
        <div style={styles.overlayStyle}></div>
        <Typography variant="h4" style={styles.textStyle}>
          University Discoverer
        </Typography>
      </div>
      <div className="container">
        <div className="search-container">
          <IconButton
            onClick={toggleInputVisibility}
            style={{ backgroundColor: "#001F3F", color: "#fff" }}
          >
            <SearchIcon />
          </IconButton>

          <div
            className={`input-container ${
              isInputVisible ? "visible" : "hidden"
            }`}
          >
            <TextField
              variant="outlined"
              width={50}
              placeholder="Enter country name"
              onChange={(e) => {
                e.target.value.length === 0 && setAllowSaveData(false);
                setCountryName(e.target.value);
              }}
            />
          </div>
          {isInputVisible ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "5px",
                gap: "10px",
              }}
            >
              <Button
                style={{ background: "#001F3F" }}
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearchUniversirty}
              >
                Search
              </Button>
              {allowSaveData && universities ? (
                <Button
                  style={{ background: "#001F3F" }}
                  variant="contained"
                  onClick={handleSaveData}
                >
                  Save
                </Button>
              ) : null}
            </div>
          ) : (
            <CountriesChips
              countriesData={searchedCountries}
              getCountryName={searchUniversitiesBySelectedCountry}
              selectedCountry={selectedCountry}
            />
          )}
        </div>
        {countryName && allowUpdateData ? (
          <DataExistCard
            countryName={countryName}
            getPermissionToUpdateData={updateUniversitiesData}
          />
        ) : (
          <DetailList universities={universities} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

const styles = {
  textStyle: {
    color: "#fff",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    zIndex: 2,
  },
  overlayStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
  },
  containerStyle: {
    position: "relative",
    height: "30vh",
    backgroundImage: `url(${Images.background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
};
