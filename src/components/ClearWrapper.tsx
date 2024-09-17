import { css } from "goober";

const ButtonStyle = css({
    flex: "1 1 0px",
    "& button": {
        width: "100%",
        flex: "1 1 0px",
    },
});

const Comp = (Original: any, system: any) => (props: any) => {
    const server = system.oas3Selectors.selectedServer();
    if ((server && (server.startsWith("ws") || server.startsWith("wss"))) || system.ucconnect) {
        return <></>;
    }
    return (
        <div className={ButtonStyle}>
            <Original {...props}></Original>
        </div>
    );
};

export default Comp;
