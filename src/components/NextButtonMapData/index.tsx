import React from "react";
import Button from "@mui/material/Button";

interface BackButtonProps {
  onClick?: () => void;
}

export const NextButtonMapData: React.FC<BackButtonProps> = ({ onClick }) => (
  <div className="container">
    <Button variant="contained" onClick={onClick}>
      NEXT
    </Button>
  </div>
);
