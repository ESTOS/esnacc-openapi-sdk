import SwaggerUI from "swagger-ui-react";
import { useEffect, useState } from "react";
import "swagger-ui/dist/swagger-ui.css";
import plugin from "./plugin";
import Select from "react-select";
import { SchemaSource } from "./types";
import { fetchJson, mergeDeep } from "./utils";
import UCConnect from "./components/UCConnect";

const Comp = (props: { schemas: SchemaSource[]; ucconnect?: boolean }) => {
    const [selected, setSelected] = useState<any>(null);
    const [spec, setSpec] = useState<any>(undefined);

    useEffect(() => {
        if (selected) {
            (async () => {
                const schema: any = await fetchJson(selected.value);
                const injectSpec = props.schemas[selected.index]?.injectSpec;
                if (injectSpec && !props.ucconnect) {
                    setSpec(mergeDeep(schema, injectSpec));
                }
                setSpec(schema);
            })();
        }
    }, [selected]);

    return (
        <>
            {props.ucconnect ? (
                <UCConnect></UCConnect>
            ) : null}
            <Select
                options={props.schemas.map((schema, index) => ({ value: schema.schemaUrl, label: schema.label ?? schema.schemaUrl, index }))}
                defaultValue={selected}
                onChange={(x) => {
                    if (x) setSelected(x);
                }}
            />
            <SwaggerUI spec={spec} plugins={[plugin({ ucconnect: props.ucconnect })]}></SwaggerUI>
        </>
    );
};

export default Comp;
