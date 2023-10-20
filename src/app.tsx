import SwaggerUI from "swagger-ui-react";
import React, { useEffect, useState } from "react";
import "swagger-ui/dist/swagger-ui.css";
import plugin from "./plugin";
import Select from "react-select";
import { SchemaSource } from "./types";
import { fetchJson } from "./utils";

const Comp = (props: { schemas: SchemaSource[] }) => {
    const [selected, setSelected] = useState<any>(null);
    const [spec, setSpec] = useState<any>(undefined);

    useEffect(() => {
        if (selected) {
            (async () => {
                const schema: any = await fetchJson(selected.value);
                const servers = props.schemas[selected.index]?.servers;
                if (servers) {
                    schema.servers = servers;
                }
                console.log(JSON.stringify(schema));
                setSpec(schema);
            })();
        }

    }, [selected]);

    return (
        <>
            <Select
                options={props.schemas.map((schema, index) => ({ value: schema.schemaUrl, label: schema.label ?? schema.schemaUrl, index }))}
                defaultValue={selected}
                onChange={(x) => {
                    if (x) setSelected(x);
                }}
            />
            <SwaggerUI spec={spec} plugins={[plugin]}></SwaggerUI>
        </>
    );
};

export default Comp;
