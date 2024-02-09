import React, { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { propertiesToDisplay } from "../utils";
import "../App.css";

export const DetailList = ({ universities }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const handleToggle = (index) => {
    setExpandedItems((prevExpandedItems) => {
      return {
        ...prevExpandedItems,
        [index]: !prevExpandedItems[index],
      };
    });
  };
  return (
    <div>
      <div style={{ maxHeight: "400px", overflowY: "auto", height: "55vh" }}>
        <List>
          {universities?.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem button>
                <IconButton
                  color="primary"
                  aria-label="expand"
                  onClick={() => handleToggle(index)}
                >
                  {expandedItems[index] ? <ExpandMoreIcon /> : <AddIcon />}
                </IconButton>
                <ListItemText
                  primary={
                    <Link
                      to="/university-detail"
                      state={{ university: item }}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {`University Name: ${item.name}`}
                    </Link>
                  }
                />
              </ListItem>

              <Collapse
                in={expandedItems[index]}
                timeout="auto"
                unmountOnExit
                style={{
                  marginLeft: "40px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <List component="div" disablePadding>
                  {propertiesToDisplay.map((property) => (
                    <ListItem key={property.key}>
                      <ListItemText
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        primary={`${property.label}: `}
                        secondary={
                          property.key === "web_pages" ? (
                            <a
                              href={item[property.key][0]}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                marginLeft: "5px",
                                textDecoration: "none",
                                color: "blue",
                              }}
                            >
                              {item[property.key][0]}
                            </a>
                          ) : (
                            <span
                              style={{
                                marginLeft: "5px",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {Array.isArray(item[property.key])
                                ? item[property.key].join(", ")
                                : item[property.key]}
                            </span>
                          )
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
};
