import SwaggerUI from "swagger-ui-react";
import { useEffect, useState } from "react";
import "swagger-ui/dist/swagger-ui.css";
import plugin from "./plugin";
import Select from "react-select";
import { SchemaSource } from "./types";
import { fetchJson, mergeDeep } from "./utils";

const Comp = (props: { schemas: SchemaSource[] }) => {
    const [selected, setSelected] = useState<any>(null);
    const [spec, setSpec] = useState<any>(undefined);

    useEffect(() => {
        if (selected) {
            (async () => {
                const schema: any = await fetchJson(selected.value);
                const injectSpec = props.schemas[selected.index]?.injectSpec;
                if (injectSpec) {
                    setSpec(mergeDeep(schema, injectSpec));
                }
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
