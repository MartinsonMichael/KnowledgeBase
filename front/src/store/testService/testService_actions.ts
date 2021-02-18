// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

import axios from "../client"
import * as msg from "../generated_messages"


export const getSimpleMsg_START = "getSimpleMsg_START";
interface getSimpleMsg_START_Action {
    type: typeof getSimpleMsg_START
    payload: undefined
}
export const getSimpleMsg_SUCCESS = "getSimpleMsg_SUCCESS";
interface getSimpleMsg_SUCCESS_Action {
    type: typeof getSimpleMsg_SUCCESS
    payload: msg.SimpleMsg
}
export const getSimpleMsg_REJECTED = "getSimpleMsg_REJECTED";
interface getSimpleMsg_REJECTED_Action {
    type: typeof getSimpleMsg_REJECTED
    payload: string
}

export const getSimpleMsg = () => {
    return async (dispatch: any) => {
        dispatch({type: getSimpleMsg_START, payload: undefined});

        const response = await axios.get(
            'getSimpleMsg',
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: getSimpleMsg_SUCCESS, payload: msg.construct_SimpleMsg(response.data)});
        } else {
            dispatch({type: getSimpleMsg_REJECTED, payload: response.data});
        }
    }
};


export const getComplexMsg_START = "getComplexMsg_START";
interface getComplexMsg_START_Action {
    type: typeof getComplexMsg_START
    payload: undefined
}
export const getComplexMsg_SUCCESS = "getComplexMsg_SUCCESS";
interface getComplexMsg_SUCCESS_Action {
    type: typeof getComplexMsg_SUCCESS
    payload: msg.ComplexMsg
}
export const getComplexMsg_REJECTED = "getComplexMsg_REJECTED";
interface getComplexMsg_REJECTED_Action {
    type: typeof getComplexMsg_REJECTED
    payload: string
}

export const getComplexMsg = () => {
    return async (dispatch: any) => {
        dispatch({type: getComplexMsg_START, payload: undefined});

        const response = await axios.get(
            'getComplexMsg',
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: getComplexMsg_SUCCESS, payload: msg.construct_ComplexMsg(response.data)});
        } else {
            dispatch({type: getComplexMsg_REJECTED, payload: response.data});
        }
    }
};


export const getComplexBySimple_START = "getComplexBySimple_START";
interface getComplexBySimple_START_Action {
    type: typeof getComplexBySimple_START
    payload: undefined
}
export const getComplexBySimple_SUCCESS = "getComplexBySimple_SUCCESS";
interface getComplexBySimple_SUCCESS_Action {
    type: typeof getComplexBySimple_SUCCESS
    payload: msg.ComplexMsg
}
export const getComplexBySimple_REJECTED = "getComplexBySimple_REJECTED";
interface getComplexBySimple_REJECTED_Action {
    type: typeof getComplexBySimple_REJECTED
    payload: string
}

export const getComplexBySimple = (integer_field: number, float_field: number, string_field: string, boolean_field: boolean[]) => {
    return async (dispatch: any) => {
        dispatch({type: getComplexBySimple_START, payload: undefined});

        const response = await axios.post(
            'getComplexBySimple',
            {
                'integer_field': integer_field,
                'float_field': float_field,
                'string_field': string_field,
                'boolean_field': boolean_field,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: getComplexBySimple_SUCCESS, payload: msg.construct_ComplexMsg(response.data)});
        } else {
            dispatch({type: getComplexBySimple_REJECTED, payload: response.data});
        }
    }
};


export const postComplex_START = "postComplex_START";
interface postComplex_START_Action {
    type: typeof postComplex_START
    payload: undefined
}
export const postComplex_SUCCESS = "postComplex_SUCCESS";
interface postComplex_SUCCESS_Action {
    type: typeof postComplex_SUCCESS
    payload: undefined
}
export const postComplex_REJECTED = "postComplex_REJECTED";
interface postComplex_REJECTED_Action {
    type: typeof postComplex_REJECTED
    payload: string
}

export const postComplex = (simpleMsgList: msg.SimpleMsg[], string_list: string[], singleSimple: msg.SimpleMsg, single_boolean: boolean) => {
    return async (dispatch: any) => {
        dispatch({type: postComplex_START, payload: undefined});

        const response = await axios.post(
            'postComplex',
            {
                'simpleMsgList': simpleMsgList,
                'string_list': string_list,
                'singleSimple': singleSimple,
                'single_boolean': single_boolean,
            },
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: postComplex_SUCCESS, payload: undefined});
        } else {
            dispatch({type: postComplex_REJECTED, payload: response.data});
        }
    }
};


export const postNull_START = "postNull_START";
interface postNull_START_Action {
    type: typeof postNull_START
    payload: undefined
}
export const postNull_SUCCESS = "postNull_SUCCESS";
interface postNull_SUCCESS_Action {
    type: typeof postNull_SUCCESS
    payload: undefined
}
export const postNull_REJECTED = "postNull_REJECTED";
interface postNull_REJECTED_Action {
    type: typeof postNull_REJECTED
    payload: string
}

export const postNull = () => {
    return async (dispatch: any) => {
        dispatch({type: postNull_START, payload: undefined});

        const response = await axios.get(
            'postNull',
            {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            },
        );

        if (response.status === 200) {
            dispatch({type: postNull_SUCCESS, payload: undefined});
        } else {
            dispatch({type: postNull_REJECTED, payload: response.data});
        }
    }
};



export type TestServiceActionType = (
    getSimpleMsg_START_Action |
    getSimpleMsg_SUCCESS_Action |
    getSimpleMsg_REJECTED_Action |
    getComplexMsg_START_Action |
    getComplexMsg_SUCCESS_Action |
    getComplexMsg_REJECTED_Action |
    getComplexBySimple_START_Action |
    getComplexBySimple_SUCCESS_Action |
    getComplexBySimple_REJECTED_Action |
    postComplex_START_Action |
    postComplex_SUCCESS_Action |
    postComplex_REJECTED_Action |
    postNull_START_Action |
    postNull_SUCCESS_Action |
    postNull_REJECTED_Action 
)