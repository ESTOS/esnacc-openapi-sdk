import { OwnEvent, RoseMessage } from "../types";

export const setWebsocket = (ws: WebSocket, server: string) => {
    return {
        type: "WEBSOCKET_ADD_WEBSOCKET",
        payload: { ws, server },
    };
};

export const initWebsocket = (server: string) => (system: any) => {
    if (server.startsWith("ws") || server.startsWith("wss")) {
        const ws: WebSocket | undefined = system.websocketSelectors.getWebsocket(server);

        // Only create if closed or not open yet
        if (ws == undefined || ws.readyState == ws.CLOSED) {
            const newWS = new WebSocket(server);
            newWS.addEventListener("message", (m) => {
                try {
                    const payload: RoseMessage<any> = JSON.parse(m.data);
                    if (payload.invoke) {
                        system.websocketActions.addEvent(server, payload.invoke.operationID, {
                            time: new Date(),
                            direction: "IN",
                            payload: structuredClone(payload.invoke.argument),
                            type: "invoke",
                        });
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