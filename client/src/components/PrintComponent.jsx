// App.js
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Invoice from "./Invoice";

const PrintComponent = () => {
  const componentRef = useRef();

  return (
    <div className="flex flex-col justify-center ">
      <ReactToPrint
        trigger={() => <button className=" font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md my-5 w-32 p-2 ml-36">Print this out!</button>}
        content={() => componentRef.current}
      />
      <Invoice ref={componentRef} />
    </div>
  );
};

export default PrintComponent;