import { getUCWeb } from "./uccontroller";

let ws: WebSocket | undefined;

async function getUcWebSession(ucWeb: string, ucsId: string, username: string, password: string): Promise<string> {
    const headers = new Headers();
    headers.append("X-Ucsid", ucsId);
    headers.append(
        "Authorization",
        `Basic ${btoa(username + ":" + password)}`
    );

    const url = ucWeb + "/ws/client/createsession?clientappid=15";
    const resp = await fetch(
        url,
        {
            headers
        }
    );
    const data = (await resp.json()) as unknown;

    if (
        typeof data === "object" &&
        data &&
        "sessionid" in data &&
        typeof data.sessionid === "string"
        
    ) {
        return data.sessionid;
    }
    
    throw new Error("Could not get sessionId from UcWeb");
}

export async function connectToUcWeb(ucController: string, ucsId: string, username: string, password: string) {
    if (ws === undefined || ws.readyState == ws.CLOSED) {
        const ucWeb = await getUCWeb(ucController, ucsId);
        const sessionId = await getUcWebSession(ucWeb, ucsId, username, password);
        ws = new WebSocket(ucWeb + "/ws/client/websocket/?x-ucsessionid=" + sessionId);
    }
}

export async function disconnectUcWeb() {
    if (ws) {
        ws.close();
        ws = undefined;
    }
}

export function getUcWebWebsocket() {
    return ws;
}