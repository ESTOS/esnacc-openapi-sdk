import EventViewer from "./EventViewer";

const Comp = (Original: any, system: any) => (props: any) => {
    const operationId = props.specSelectors.paths().get(props.path).get(props.method).get("operationId");
    const server = system.oas3Selectors.selectedServer();
    const isWs = server && (server.startsWith("ws") || server.startsWith("wss"));



    return (
        <>
            {isWs ? (
                <EventViewer system={system} server={server} operationId={operationId}></EventViewer>
            ) : null}

            <Original {...props}></Original>
        </>
    );
};

export default Comp;
