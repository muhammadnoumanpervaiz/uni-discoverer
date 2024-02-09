import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@mui/material";

const UniversityDetail = () => {
  const location = useLocation();
  const { university } = location.state;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card>
        <CardContent>
          <h2>{university.name}</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h4>Country:</h4>{" "}
            <p style={{ marginLeft: "10px" }}>{university.country}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h4>State:</h4>{" "}
            <p style={{ marginLeft: "10px" }}>{university["state-province"]}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h4>Visit University Website:</h4>{" "}
            <a
              href={university.web_pages[0]}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: "10px",
                textDecoration: "none",
                color: "blue",
              }}
            >
              click here!
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversityDetail;
