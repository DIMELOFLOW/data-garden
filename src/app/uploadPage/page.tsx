import { FC } from "react";
import Link from "next/link";

const UploadContainer = () => (
  <div className="upload-container">
    <input type="file" />
  </div>
);

const NextButton = () => (
  <div className="container">
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
        <UploadContainer />
      </div>
      <div className="containerButton">
        <BackButton />
        <NextButton />
      </div>
    </>
  );
};

export default UploadPage;
