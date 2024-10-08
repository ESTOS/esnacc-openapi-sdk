import { getUcWebSessionId } from "../lib/ucweb";
import { RoseMessage } from "../types";
import { eventOperationId, getInvokeId } from "../utils";

export async function invokeRest(operationID: number, operationName: string, url: string, body: any) {
    const options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "invoke": {
                    "invokeID": getInvokeId(),
                    sessionID: getUcWebSessionId(),
                    operationID: operationID,
                    operationName,
                    "argument": body
                }
            }
        )
    };
    const resp = await fetch(url, options);
    return resp;
}

export function invokeWs(operationID: number, operationName: string, url: string, body: any, ws: WebSocket | undefined, system: any): Promise<{ status: 200 | 500, data: any }> {
    return new Promise((res, rej) => {
        const invokeID = getInvokeId();
        if (ws && ws.readyState == WebSocket.OPEN) {
            const timeout = setTimeout(() => {
                if (ws)
                    ws.removeEventListener("message", awaiter);
                system.websocketActions.addEvent(url, operationID, { time: new Date(), direction: "IN", payload: { message: "Remove listener after 10 Seconds (No response)", invokeID }, type: "error" });
                rej("Remove listener after 10 Seconds (No response)");
            }, 10000);
            const awaiter = (message: MessageEvent<any>) => {
                try {
                    const parsedData: RoseMessage<any> | Array<RoseMessage<any>> = JSON.parse(message.data);
                    const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
                    for (const data of dataArray) {
                        if (data.result && data.result.invokeID == invokeID) {
                            if (ws) {
                                ws.removeEventListener("message", awaiter);
                                clearTimeout(timeout);
                            }
                            system.websocketActions.addEvent(url, operationID, { time: new Date(), direction: "IN", payload: structuredClone(data.result.result.result), type: "result" });
                            res({ status: 200, data: data.result.result.result });
                        }
                        else if (data.reject && data.reject.invokedID.invokedID == invokeID) {
                            if (ws) {
                                ws.removeEventListener("message", awaiter);
                                clearTimeout(timeout);
                            }
                            system.websocketActions.addEvent(url, operationID, { time: new Date(), direction: "IN", payload: structuredClone(data.reject.details), type: "reject" });
                            res({ status: 500, data: data.reject.details });
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            ws.addEventListener("message", awaiter);
            const payload = {
                "invoke": {
                    invokeID,
                    sessionID: getUcWebSessionId(),
                    operationID: operationID,
                    operationName,
                    "argument": body
                }
            };
            ws.send(JSON.stringify(payload));
            system.websocketActions.addEvent(url, operationID, { time: new Date(), direction: "OUT", payload: structuredClone(body), type: "invoke" });
        }
        else {
            system.websocketActions.addEvent(url, operationID, { time: new Date(), direction: "OUT", payload: { message: "No websocket connection! Cant send request", invokeID }, type: "error" });
            rej(new Error("No websocket connection! Cant send request"));
        }
    });
}

export function eventWs(operationID: number, operationName: string, url: string, body: any, ws: WebSocket | undefined, system: any) {
    if (ws && ws.readyState == WebSocket.OPEN) {
        const payload = {
            "invoke": {
                invokeID: eventOperationId,
                sessionID: getUcWebSessionId(),
                operationID: operationID,
                operationName,
                "argument": body
            }
        };
        ws.send(JSON.stringify(payload));
        system.websocketActions.addEvent(url, operationID, { time: new Date(), direction: "OUT", payload: structuredClone(body), type: "invoke" });
    }
    else {
        throw new Error("Websocket not open!");
    }
}