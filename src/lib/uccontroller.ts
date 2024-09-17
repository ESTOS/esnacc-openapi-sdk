export async function getUCWeb(ucController:string, ucsId: string): Promise<string> {
    const resp = await fetch(`${ucController}/controller/client/ucws?ucsid=${ucsId}`, {
        method: "GET",
        signal: AbortSignal.timeout(10000)
    });

    // On 204 no response body e.g. no UCServer connected
    if (resp.status === 204) 
        throw new Error(`UCServer with ucsId not connected`);
    try {
        const data = await resp.json();
        if (data && data.redirect) 
            return data.redirect;
        throw new Error(`Invalid UCController redirect response: ${resp.text}`);
    } catch (error) {
        throw new Error(`Failed processing UCController redirect response: ${(error as Error).message}`);
    }
}