
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

export interface SchemaSource {
    schemaUrl: string,
    label?: string,
    servers?: {
        url: string,
        // for more see OpenApi Spec 3.1 https://swagger.io/specification
        [key: string]: any
    }[]
}

export interface SDKOptions {
    schemas: SchemaSource[],
    domId: string,
}