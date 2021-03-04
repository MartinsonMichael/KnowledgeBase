const RemoveMsg = "RemoveMsg";
interface removeMsgAction {
    type: typeof RemoveMsg,
    payload: undefined
}
export function removeSuccessMsg() {
    return {
        type: RemoveMsg,
        payload: undefined,
    }
}

const updateLocalBodyType = "updateLocalBody";
interface updateLocalBodyAction {
    type: typeof updateLocalBodyType,
    payload: string
}
export function updateLocalBody(body: string) {
    return {
        type: updateLocalBodyType,
        payload: body,
    }
}

const needBodyUpdateType = "needBodyUpdate";
interface needBodyUpdateAction {
    type: typeof needBodyUpdateType,
    payload: undefined
}
export function needBodyUpdate() {
    return {
        type: needBodyUpdateType,
        payload: undefined,
    }
}

const noUpdateNeeded = "noUpdateNeeded";
interface noUpdateNeededAction {
    type: typeof noUpdateNeeded,
    payload: undefined
}
export function updateCompleted() {
    return {
        type: noUpdateNeeded,
        payload: undefined,
    }
}


export type noteServiceInplaceActionType = (
    removeMsgAction |
    updateLocalBodyAction |
    needBodyUpdateAction |
    noUpdateNeededAction
)