import React from "react";
import LoadingIcon from "@/icons/icon-loading.svg";
const Spinner = () => {
  return (
    <div role="status" className="w-10 h-10 fixed bottom-10 right-10">
      <LoadingIcon className="text-primary2 w-8 h-8 mr-2  animate-spin  fill-white anima" />
    </div>
  );
};

export default Spinner;
