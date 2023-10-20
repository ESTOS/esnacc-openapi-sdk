import App from "./app";
import { setup } from "goober";
import ReactDOM from "react-dom";
import React from "react";
import { SchemaSource } from "./types";

setup(React.createElement);

const schemas: SchemaSource[] = [
    { schemaUrl: "/schema/ENetUC_Common.json", label: "ENetUC_Common" },
    {
        schemaUrl: "/schema/ENetUC_Settings_Manager.json", label: "ENetUC_Settings_Manager", "servers": [
            {
                "url": "ws://localhost:3020/ws"
            },
            {
                "url": "http://localhost:3020/rest"
            }
        ],
    },
    {
        schemaUrl: "/schema/ENetUC_Event_Manager.json", label: "ENetUC_Event_Manager", "servers": [
            {
                "url": "ws://localhost:3020/ws"
            },
            {
                "url": "http://localhost:3020/rest"
            }
        ],
    },
];


ReactDOM.render(<App schemas={schemas}></App>, document.body);
