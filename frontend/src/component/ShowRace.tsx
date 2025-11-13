// App.tsx
import React from "react";
import Racetrack from "./Race";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function ShowRace() {
  return (
    <div>
      <Racetrack />
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: 10 }}>
        <Button
          component={RouterLink}
          to="/loop"
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #00bfa5, #1de9b6)",
            borderRadius: 2,
            boxShadow: 4,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #1de9b6, #00bfa5)",
              boxShadow: 6,
            },
          }}
        >
          ← Definition of loop
        </Button>
        <Button
          component={RouterLink}
          to="/exampleloop"
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #00bfa5, #1de9b6)",
            borderRadius: 2,
            boxShadow: 4,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(90deg, #1de9b6, #00bfa5)",
              boxShadow: 6,
            },
          }}
        >
          Definition of loop →
        </Button>
      </div>
    </div>
  );
}
export default ShowRace;
