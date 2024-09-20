import { getUCWeb } from "./uccontroller";

let ws: WebSocket | undefined;
let session: string | undefined;

async function getUcWebSession(ucWeb: string, ucsId: string, username: string, password: string): Promise<[string, string]> {
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
        if ("ownContact" in data && typeof data.ownContact === "object" && data.ownContact && "u8sContactId" in data.ownContact && "u8sContactId" in data.ownContact &&
            typeof data.ownContact.u8sContactId === "string")
            return [data.sessionid, data.ownContact.u8sContactId];
        return [data.sessionid, ""];
    }

    throw new Error("Error getting session from UCWeb\nStatus code: " + resp.status + "\nBody:\n" + JSON.stringify(data, null, 4));
}

export async function connectToUcWeb(ucController: string, ucsId: string, username: string, password: string): Promise<string | undefined> {
    if (ws === undefined || ws.readyState == ws.CLOSED) {
        const ucWeb = await getUCWeb(ucController, ucsId);
        const [sessionId, contactId] = await getUcWebSession(ucWeb, ucsId, username, password);
        session = sessionId;
        ws = new WebSocket(ucWeb + "/ws/client/websocket/?x-ucsessionid=" + sessionId);
        return contactId;
    }
    return undefined;
}

export async function disconnectUcWeb() {
    if (ws) {
        ws.close();
        ws = undefined;
        session = undefined;
    }
}

export function getUcWebSessionId() {
    return session;
}

export function getUcWebWebsocket() {
    return ws;
}