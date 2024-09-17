import EventViewer from "./EventViewer";

const Comp = (Original: any, system: any) => (props: any) => {
 
    try {
        if (props.children.props.className.includes("opblock-body") && props.isOpened) {
            
            let path = "";
            const children = props.children.props.children;
            
            
            for (let index = 0; index < children.length; index++) {
                const el = children[index];
                try {
                    if (el.props.pathMethod[0] && !path) {
                        path = el.props.pathMethod[0];
                    } 
                } catch (err) { /* empty */ }
                
            }

           
            if (path) {
                
                const server = system.oas3Selectors.selectedServer();
                const isWs = (server && (server.startsWith("ws") || server.startsWith("wss"))) || system.ucconnect;
                
                if (isWs) {
                    
                    let isEvent = true;
                    try {
                        isEvent = system.spec().get("json").get("paths").get(path).get("post").get("responses") == undefined;
                    } catch (error) {
                        /* empty */ 
                    }
                   
                    if (isEvent) {
                        const operationId = system.spec().get("json").get("paths").get(path).get("post").get("operationId");
                        return <>
                            <Original {...props}/>
                            <EventViewer server={server} operationId={operationId} system={system}></EventViewer>
                        </>;
                    }
                }

            }

        }
  
    } catch (err) { /* empty */ }


    
    return <Original {...props}/>;
};

export default Comp;
