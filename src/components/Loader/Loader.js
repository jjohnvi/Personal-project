import React from "react";
import classnames from "classnames";
import "./Loader.scss";

function Loader({ loading }) {
  let loaderClassNames = classnames("Loader", { "Loader--show": loading });

  return <div className={loaderClassNames}>Loading...</div>;
}

export default Loader;
