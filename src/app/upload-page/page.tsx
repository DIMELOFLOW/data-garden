import { FC } from "react";
import Link from "next/link";

import { UploadFiles } from "./components/";

const NextButton = () => (
  <div className="container">
    {/* TODO: Should use Next Link ? */}
    <link rel="stylesheet" href="" />
    <button className="next-button">NEXT</button>
  </div>
);

const BackButton = () => (
  <div className="container">
    <Link href="/">
      <button className="next-button">BACK</button>
    </Link>
  </div>
);

const UploadPage: FC = () => {
  return (
    <>
      <div className="container">
        <UploadFiles />
      </div>
      <div className="containerButton">
        <BackButton />
        <NextButton />
      </div>
    </>
  );
};

export default UploadPage;
