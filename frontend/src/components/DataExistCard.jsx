import React from "react";
import { Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";

export const DataExistCard = ({ countryName, getPermissionToUpdateData }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <Card>
        <CardContent>
          <h3>{`Data against ${countryName} Already Exist in your Record`}</h3>
          <Button
            style={{ background: "#001F3F" }}
            variant="contained"
            onClick={() => getPermissionToUpdateData()}
          >
            Update you Record
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
