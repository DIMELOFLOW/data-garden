import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";

interface BackButtonProps {
  path: string;
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ path, onClick }) => (
  <div className="container">
    <Link href={path}>
      <Button variant="outlined" color="warning" onClick={onClick}>
        Back
      </Button>
    </Link>
  </div>
);
    