import { css } from "goober";

// Wee need this class to hide the h4 after the life response that just contains "Response" https://github.com/swagger-api/swagger-ui/blob/master/src/core/components/responses.jsx#L119
const HideSibling = css({
    "& + h4": {
        display: "none",
    },
});

const Comp = (Original: any, system: any) => (props: any) => {
    const server = system.oas3Selectors.selectedServer();
    const isWs = (server && (server.startsWith("ws") || server.startsWith("wss"))) || system.ucconnect;
    if (isWs) {
        return <div className={HideSibling}></div>;
    }
    return <Original {...props}></Original>;
};

export default Comp;
