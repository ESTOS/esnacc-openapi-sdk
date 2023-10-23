# esnacc-openapi-sdk

Fancy frontend for showing and testing openapi schemas derived from asn1 files created trough esnacc.

## Testing

If you want to test the [example](/example/) clone this repo and execute:

`npm run dev`

In this repo there is no server to test te actual calls.
If you want to also test those, then look [here](https://github.com/ESTOS/esnacc/tree/main/samples/ts-microservice).

## Usage

Usage is pretty simple:

```ts
import SDK from "@estos/esnacc-openapi-sdk";

SDK({
    // Id from the node where to render the SDK
    domId: "ui", 
    // Schemas to load
    schemas: [
        {
            // Url of the schema
            schemaUrl: "/schema/ENetUC_Settings_Manager.json", 
            // Label to show (if not provided shows url)
            label: "ENetUC_Settings_Manager",
            // Servers from the OpenApi schema to inject into the schema (not needed) https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject
            "servers": [
                {
                    "url": "ws://localhost:3020/ws"
                },
                {
                    "url": "http://localhost:3020/rest"
                }
            ],
        }
    ] 
})
```

Or use directly in the browser (possibly with unpackage).

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>MicroService Test Client</title>
  <link rel="stylesheet" href="/esbuild/bundle.css" />
</head>

<body>
  <div id="ui"></div>
  <script type="text/javascript" src="/esbuild/bundle.js"></script>
  <script>
    EsnaccOpenApiSDK({
      domId: "ui", schemas: [
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
      ]
    })
  </script>
</body>

</html>
```