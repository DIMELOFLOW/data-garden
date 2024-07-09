import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";

interface NextButtonProps {
  disabled?: boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({ disabled = false }) => (
  <div className="container">
    {disabled ? (
      <Button className="next-button" variant="contained" disabled>
        NEXT
      </Button>
    ) : (
      <Link href="/upload-page">
        <Button className="next-button" variant="contained">
          NEXT
        </Button>
      </Link>
    )}
  </div>
);
