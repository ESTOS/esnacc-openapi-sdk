import ServerWrapper from "./components/ServerWrapper";
import EmptyWrapper from "./components/EmptyWrapper";
import LiveResponseWrapper from "./components/LiveResponseWrapper";
import OperationWrapper from "./components/OperationWrapper";
import ResponsesWrapper from "./components/ResponsesWrapper";
import ExecuteWrapper from "./components/ExecuteWrapper";
import ClearWrapper from "./components/ClearWrapper";
import CollapseWrapper from "./components/CollapseWrapper";
import OperationSummaryPathWrapper from "./components/OperationSummaryPathWrapper";
import { executeRequestWrapper, userExecute } from "./fn/execute";
import * as websocketActions from "./websocket/actions";
import * as websocketReducers from "./websocket/reducers";
import * as websocketSelectors from "./websocket/selectors";

/**
 *
 * @param system
 */
const Plugin = function (rootInjects?: any) {
    return {
        wrapComponents: {
            Servers: ServerWrapper,
            OperationSummaryMethod: EmptyWrapper,
            OperationSummaryPath: OperationSummaryPathWrapper,
            operation: OperationWrapper,
            responses: ResponsesWrapper,
            liveResponse: LiveResponseWrapper,
            execute: ExecuteWrapper,
            clear: ClearWrapper,
            Collapse: CollapseWrapper,
        },
        fn: {
            execute: userExecute,
        },
        statePlugins: {
            spec: {
                wrapActions: {
                    executeRequest: executeRequestWrapper,
                },
            },
            websocket: {
                actions: {
                    ...websocketActions,
                },
                reducers: {
                    ...websocketReducers,
                },
                selectors: {
                    ...websocketSelectors,
                },
            },
        },
        rootInjects
    };
};

export default Plugin;
