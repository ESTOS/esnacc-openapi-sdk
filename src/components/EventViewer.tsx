import { css } from "goober";
import StyledDiv from "../styles/StyledDiv";
import StyledGrid from "../styles/StyledGrid";
import ReactJson from "react-json-view";
import { OwnEvent } from "../types";
import { getTime } from "../utils";
import { useEffect } from "react";

const InfoText = css({ color: "white", fontFamily: "monospace", padding: "0px 10px", margin: 0 });

export default (props: {system:any, operationId: string, server: string }) => {
    const {system, operationId, server} = props;
    const events: OwnEvent[] = system.websocketSelectors.getEvents(server, parseInt(operationId));

    useEffect(() => {
        const el = document.getElementById("event-info-" + operationId);
        if (el) {
            el.scrollTo({ left: 0, top: el.scrollHeight });

        }
    });
    
    return  <>
        <div className="opblock-section-header" style={{ display: "flex", flexDirection: "row" }}>
            <h4>WebSocket message history</h4>
            <div style={{ flex: "1 1 0px" }}></div>
            <button
                className="btn execute"
                onClick={() => {
                    system.websocketActions.clearEvents(server, parseInt(operationId));
                }}
                disabled={events.length == 0}
            >
            Clear history
            </button>
        </div>
        <StyledDiv padding="20px">
            <StyledDiv
                id={"event-info-" + operationId}
                className="highlight-code"
                style={{
                    background: "rgb(51, 51, 51)",
                    resize: "vertical",
                    borderRadius: "4px",
                    overflowY: "scroll",
                    height: "200px",
                    minHeight: "200px",
                }}
                fullWidth
            >
                <StyledGrid
                    rows={["min-content", "min-content", "min-content"]}
                    style={{
                        alignContent: "end",
                        minHeight: "100%",
                    }}
                >
                    {events.slice(-100).map((item, index) => {
                        return (
                            <>
                                <StyledGrid gridColumn={"1/1000"} columns={["subgrid"]}>
                                    <p className={InfoText}>{item.direction}</p>
                                    <p className={InfoText}>{item.type}</p>
                                    <p className={InfoText}>{getTime(item.time)}</p>
                                </StyledGrid>
                                <StyledDiv gridColumn={"1/1000"} style={{ padding: "0px 10px" }}>
                                    <ReactJson
                                        key={index}
                                        name={false}
                                        collapsed
                                        style={{ background: "none", borderBottom: "1px solid white", padding: "10px 0px" }}
                                        theme={"monokai"}
                                        src={item.payload}
                                    />
                                </StyledDiv>
                            </>
                        );
                    })}
                </StyledGrid>
            </StyledDiv>
        </StyledDiv>
    </>;
};