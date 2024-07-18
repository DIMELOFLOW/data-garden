import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";

interface NextButtonProps {
  disabled?: boolean;
  path: string;
  onClick?: () => void;
}

export const NextButton: React.FC<NextButtonProps> = ({
  path,
  disabled = false,
  onClick,
}) => (
  <div className="container">
    {disabled ? (
      <Button className="next-button" variant="contained" disabled onClick={onClick}>
        NEXT
      </Button>
    ) : (
      <Link href={path}>
        <Button className="next-button" variant="contained" onClick={onClick}>
          NEXT
        </Button>
      </Link>
    )}
  </div>
);
