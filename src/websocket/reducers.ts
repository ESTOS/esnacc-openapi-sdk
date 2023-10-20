export const WEBSOCKET_ADD_WEBSOCKET = (state: any, { payload }: any) => {
    return state.setIn([payload.server, "ws"], payload.ws);
};

export const WEBSOCKET_ADD_EVENT = (state: any, { payload }: any) => {
    const check = state.getIn([payload.server, payload.operationID]);
    if (check)
        return state.updateIn([payload.server, payload.operationID], (arr: any) => {

            return arr.concat(payload.event);
        });
    return state.setIn([payload.server, payload.operationID], [payload.event]);
};

export const WEBSOCKET_CLEAR_EVENTS = (state: any, { payload }: any) => {
    return state.setIn([payload.server, payload.operationID], []);
};