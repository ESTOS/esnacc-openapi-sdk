import SwaggerUI from "swagger-ui-react";
import StyledGrid from "./styles/StyledGrid";
import { useEffect, useState } from "react";
import "swagger-ui/dist/swagger-ui.css";
import plugin from "./plugin";
import Select from "react-select";
import { SchemaSource } from "./types";
import { fetchJson, mergeDeep } from "./utils";
import { connectToUcWeb } from "./lib/ucweb";

const Comp = (props: { schemas: SchemaSource[]; ucconnect?: boolean }) => {
    const [selected, setSelected] = useState<any>(null);
    const [spec, setSpec] = useState<any>(undefined);
    const [ucsId, setUcsId] = useState<string>("");
    const [uccontroller, setUccontroller] = useState<string>("https://devuccontroller.ucconnect.de");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");

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
                <StyledGrid columns={["max-content", "auto"]} style={{gap: "5px", paddingBottom: "5px"}}>
                    <label>ucsid</label><input type="text" value={ucsId} onChange={(ev) => setUcsId(ev.target.value)}></input>
                    <label>uccontroller</label><input type="text" value={uccontroller} onChange={(ev) => setUccontroller(ev.target.value)}></input>
                    <label>username</label><input type="text" value={username} onChange={(ev) => setUsername(ev.target.value)}></input>
                    <label>password</label><input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)}></input>
                    <button onClick={() => connectToUcWeb(uccontroller, ucsId, username, password)}>Connect</button>
                </StyledGrid>
            ) : null}
            <Select
                options={props.schemas.map((schema, index) => ({ value: schema.schemaUrl, label: schema.label ?? schema.schemaUrl, index }))}
                defaultValue={selected}
                onChange={(x) => {
                    if (x) setSelected(x);
                }}
            />
            <SwaggerUI spec={spec} plugins={[plugin({ucconnect: props.ucconnect})]}></SwaggerUI>
        </>
    );
};

export default Comp;
