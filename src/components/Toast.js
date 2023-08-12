import React from "react";

function Toast({type,msg}) {
    //info
    //success
  return (
    <div className="toast toast-top toast-end">
      <div className={`alert alert-${type}`}>
        <span>{msg}</span>
      </div>
    </div>
  );
}

export default Toast;
