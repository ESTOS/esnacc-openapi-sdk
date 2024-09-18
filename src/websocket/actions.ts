import { getUcWebWebsocket } from "../lib/ucweb";
import { OwnEvent, RoseMessage } from "../types";

export const setWebsocket = (ws: WebSocket, server: string) => {
    return {
        type: "WEBSOCKET_ADD_WEBSOCKET",
        payload: { ws, server },
    };
};

export const initWebsocket = (server: string) => (system: any) => {
    if (server.startsWith("ws") || server.startsWith("wss") || system.ucconnect) {
        const ws: WebSocket | undefined = system.websocketSelectors.getWebsocket(server);

        // Only create if closed or not open yet
        if (ws == undefined || ws.readyState == ws.CLOSED) {
            const newWS = system.ucconnect ? getUcWebWebsocket() : new WebSocket(server);
            if (newWS) {
                newWS.addEventListener("message", (m) => {
                    try {
                        const payloadData: RoseMessage<any> | Array<RoseMessage<any>> = JSON.parse(m.data);
                        const payloadArray = Array.isArray(payloadData) ? payloadData : [payloadData];
                        for (const payload of payloadArray) {
                            if (payload.invoke) {
                                system.websocketActions.addEvent(server, payload.invoke.operationID, {
                                    time: new Date(),
                                    direction: "IN",
                                    payload: structuredClone(payload.invoke.argument),
                                    type: "invoke",
                                });
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
    
                newWS.addEventListener("close", () => {
                    // Reconnect on ws close
                    system.websocketActions.initWebsocket(server);
                });
    
                system.websocketActions.setWebsocket(newWS, server);
            }
        }
    }

};

export const addEvent = (server: string, operationID: number, event: OwnEvent) => {
    return {
        type: "WEBSOCKET_ADD_EVENT",
        payload: { server, operationID, event }
    };
};

export const clearEvents = (server: string, operationID: number) => {
    return {
        type: "WEBSOCKET_CLEAR_EVENTS",
        payload: { server, operationID }
    };
};