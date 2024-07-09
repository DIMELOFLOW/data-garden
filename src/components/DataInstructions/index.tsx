import React from "react";
import "../../app/globals.css";

export const DataInstructions: React.FC = () => {
  return (
    <div className="container">
      <p>
        On our platform, you can perform a special task related to file
        manipulation. Your goal is to upload an existing file and then decide
        how you want to transform it by selecting a new format. It is important
        to note that you cannot choose the same format for both the initial
        upload and the final conversion of the file.
      </p>
    </div>
  );
};
