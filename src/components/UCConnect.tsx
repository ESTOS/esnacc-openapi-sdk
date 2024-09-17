import StyledGrid from "../styles/StyledGrid";
import { useEffect, useState } from "react";
import "swagger-ui/dist/swagger-ui.css";
import { connectToUcWeb, disconnectUcWeb, getUcWebWebsocket } from "../lib/ucweb";

const Comp = () => {
    const [ucsId, setUcsId] = useState<string>("");
    const [uccontroller, setUccontroller] = useState<string>("https://devuccontroller.ucconnect.de");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [lastError, setLastError] = useState<string>("");
    const [connected, setConnected] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        setTimer(setInterval(() => {
            if (getUcWebWebsocket() !== undefined) {
                setConnected(true);
            } else
                setConnected(false);
        }, 3000));
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <StyledGrid columns={["max-content", "auto"]} style={{ gap: "5px", paddingBottom: "5px" }}>
            <label>ucsid</label>
            <input type="text" value={ucsId} onChange={(ev) => setUcsId(ev.target.value)}></input>
            <label>uccontroller</label>
            <input type="text" value={uccontroller} onChange={(ev) => setUccontroller(ev.target.value)}></input>
            <label>username</label>
            <input type="text" value={username} onChange={(ev) => setUsername(ev.target.value)}></input>
            <label>password</label>
            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)}></input>
            <button
                onClick={() => {
                    if (connected)
                        disconnectUcWeb().then(() => {
                            setLastError("");
                            setConnected(false);
                        });
                    else
                        connectToUcWeb(uccontroller, ucsId, username, password).then(() => {
                            setLastError("");
                            setConnected(true);
                        }).catch((err): any => {
                            console.log(err);
                            if (err instanceof Error)
                                setLastError(err.message);
                        });
                }

                }
            >
                {connected ? "Disconnect" : "Connect"}
            </button>
            <div>{lastError}</div>
        </StyledGrid>
    );
};

export default Comp;
