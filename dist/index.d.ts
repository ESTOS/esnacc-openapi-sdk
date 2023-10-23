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

declare function renderSDK(args: SDKOptions): void;

declare global {
    interface Window {
        EsnaccOpenApiSDK: typeof renderSDK;
    }
}

export default renderSDK;