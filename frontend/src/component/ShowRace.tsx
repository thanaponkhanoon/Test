// App.tsx
import React from "react";
import Racetrack from "./Race";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function ShowRace() {
  return (
    <div>
      <Racetrack />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Button
          component={RouterLink}
          to="/home"
          variant="contained"
        >
          กลับ
        </Button>
        <Button
          component={RouterLink}
          to="/home"
          variant="contained"
        >
          ถัดไป
        </Button>
      </div>
    </div>
  );
}
export default ShowRace;
