import Link from 'next/link';
import { FC } from "react";

const ButtonContainerLeft = () => (
  <div className="button-container-left">
    <button>CSV</button>
    <button>JSON</button>
    <button>JSONL</button>
  </div>
);

const ButtonContainerRight = () => (
  <div className="button-container-right">
    <button>JSON</button>
    <button>CSV</button>
    <button>JSONL</button>
  </div>
);

const NextButton = () => (
  <div className="container">
     
    <Link href="/uploadPage">
      <button className="next-button">NEXT</button>
    </Link>
  </div>
);

const YourComponent: FC = () => {
  return (
    <>
      <div className="container">
        <ButtonContainerLeft />
        <ButtonContainerRight />
      </div>
      <NextButton />
    </>
  );
};

export default YourComponent;