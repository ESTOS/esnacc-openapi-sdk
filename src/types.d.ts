import {  OpenAPIV3_1 } from "openapi-types";

export interface Dictionary<T, K> {
    [key: T]: K
}

export interface RoseMessage<T> {
    result?: {
        invokeID: number,
        result: {
            result: T,
            resultValue: 0
        }
    },
    invoke?: {
        operationID: number,
        invokeID: number,
        argument: T
    },
    reject?: {
        details: string,
        invokedID: {
            invokedID: number
        },
    }
}

export interface OwnEvent {
    time: Date,
    direction: "OUT" | "IN",
    payload: any,
    type: "invoke" | "result" | "reject" | "error"
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface SchemaSource {
    schemaUrl: string,
    label?: string,
    injectSpec?: PartialBy<OpenAPIV3_1.Document, "info" | "openapi">
}

export interface SDKOptions {
    schemas: SchemaSource[],
    domId: string,
    ucconnect?: boolean
}