import React from "react";

function Loader() {
  return (
    <progress className="progress w-56 absolute top-2/4 -translate-y-1/2 right-2/4 translate-x-1/2"></progress>
  );
}

export default Loader;
