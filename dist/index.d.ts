import {  OpenAPIV3_1 } from "openapi-types";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface SchemaSource {
    schemaUrl: string,
    label?: string,
    injectSpec?: PartialBy<OpenAPIV3_1.Document, "info" | "openapi">
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