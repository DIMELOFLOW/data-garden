import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";

interface NextButtonProps {
  disabled?: boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({ disabled = false }) => (
  <div className="container">
    <Button className="next-button" variant="contained" disabled={disabled}>
      <Link href="/upload-page">NEXT</Link>
    </Button>
  </div>
);
