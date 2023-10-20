import ReactDOM from "react-dom";
import App from "./app";
import React from "react";
import { setup } from "goober";
import { SDKOptions } from "./types";

setup(React.createElement);

const renderSDK = (args: SDKOptions) => {
    //@ts-ignore
    ReactDOM.render(<App schemas={args.schemas} > </App>, args.el);
};

//@ts-ignore
globalThis.EsnaccOpenApiSDK = renderSDK;