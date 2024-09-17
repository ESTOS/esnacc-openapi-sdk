import ReactDOM from "react-dom";
import App from "./app";
import React from "react";
import { setup } from "goober";
import { SDKOptions } from "./types";

setup(React.createElement);
function renderSDK(args: SDKOptions) {
    const el = document.getElementById(args.domId);
    if (el)
        ReactDOM.render(<App schemas={args.schemas} ucconnect={args.ucconnect}></App>, el);
}

export default renderSDK;