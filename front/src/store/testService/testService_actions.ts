// This file is generated, DO NOT EDIT IT
// Michael Martinson http generator (c)

import axios from "../client"
import * as msg from "../generated_messages"


export const getTestList_START = "getTestList_START";
interface getTestList_START_Action {
    type: typeof getTestList_START
    payload: undefined
}
export const getTestList_SUCCESS = "getTestList_SUCCESS";
interface getTestList_SUCCESS_Action {
    type: typeof getTestList_SUCCESS
    payload: undefined
}
export const getTestList_REJECTED = "getTestList_REJECTED";
interface getTestList_REJECTED_Action {
    type: typeof getTestList_REJECTED
    payload: string
}

export const getTestList = (list: msg.TestOne[]) => {
    return async (dispatch: any) => {
        dispatch({type: getTestList_START, payload: undefined});

        const response = await axios.post(
            'getTestList',
            {
                'list': list,
            },
        );

        if (response.status === 200) {
            dispatch({type: getTestList_SUCCESS, payload: undefined});
        } else {
            dispatch({type: getTestList_REJECTED, payload: response.data});
        }
    }
};


export const getComplexByComplex_START = "getComplexByComplex_START";
interface getComplexByComplex_START_Action {
    type: typeof getComplexByComplex_START
    payload: undefined
}
export const getComplexByComplex_SUCCESS = "getComplexByComplex_SUCCESS";
interface getComplexByComplex_SUCCESS_Action {
    type: typeof getComplexByComplex_SUCCESS
    payload: msg.Complex
}
export const getComplexByComplex_REJECTED = "getComplexByComplex_REJECTED";
interface getComplexByComplex_REJECTED_Action {
    type: typeof getComplexByComplex_REJECTED
    payload: string
}

export const getComplexByComplex = (testList: msg.Test[], id: string, singleTest: msg.TestOne) => {
    return async (dispatch: any) => {
        dispatch({type: getComplexByComplex_START, payload: undefined});

        const response = await axios.post(
            'getComplexByComplex',
            {
                'testList': testList,
                'id': id,
                'singleTest': singleTest,
            },
        );

        if (response.status === 200) {
            dispatch({type: getComplexByComplex_SUCCESS, payload: msg.construct_Complex(response.data)});
        } else {
            dispatch({type: getComplexByComplex_REJECTED, payload: response.data});
        }
    }
};


export const getBasicComplex_START = "getBasicComplex_START";
interface getBasicComplex_START_Action {
    type: typeof getBasicComplex_START
    payload: undefined
}
export const getBasicComplex_SUCCESS = "getBasicComplex_SUCCESS";
interface getBasicComplex_SUCCESS_Action {
    type: typeof getBasicComplex_SUCCESS
    payload: msg.Complex
}
export const getBasicComplex_REJECTED = "getBasicComplex_REJECTED";
interface getBasicComplex_REJECTED_Action {
    type: typeof getBasicComplex_REJECTED
    payload: string
}

export const getBasicComplex = () => {
    return async (dispatch: any) => {
        dispatch({type: getBasicComplex_START, payload: undefined});

        const response = await axios.get('getBasicComplex');

        if (response.status === 200) {
            dispatch({type: getBasicComplex_SUCCESS, payload: msg.construct_Complex(response.data)});
        } else {
            dispatch({type: getBasicComplex_REJECTED, payload: response.data});
        }
    }
};


export const changeMisterPresident_START = "changeMisterPresident_START";
interface changeMisterPresident_START_Action {
    type: typeof changeMisterPresident_START
    payload: undefined
}
export const changeMisterPresident_SUCCESS = "changeMisterPresident_SUCCESS";
interface changeMisterPresident_SUCCESS_Action {
    type: typeof changeMisterPresident_SUCCESS
    payload: undefined
}
export const changeMisterPresident_REJECTED = "changeMisterPresident_REJECTED";
interface changeMisterPresident_REJECTED_Action {
    type: typeof changeMisterPresident_REJECTED
    payload: string
}

export const changeMisterPresident = () => {
    return async (dispatch: any) => {
        dispatch({type: changeMisterPresident_START, payload: undefined});

        const response = await axios.get('changeMisterPresident');

        if (response.status === 200) {
            dispatch({type: changeMisterPresident_SUCCESS, payload: undefined});
        } else {
            dispatch({type: changeMisterPresident_REJECTED, payload: response.data});
        }
    }
};



export type TestServiceActionType = (
    getTestList_START_Action |
    getTestList_SUCCESS_Action |
    getTestList_REJECTED_Action |
    getComplexByComplex_START_Action |
    getComplexByComplex_SUCCESS_Action |
    getComplexByComplex_REJECTED_Action |
    getBasicComplex_START_Action |
    getBasicComplex_SUCCESS_Action |
    getBasicComplex_REJECTED_Action |
    changeMisterPresident_START_Action |
    changeMisterPresident_SUCCESS_Action |
    changeMisterPresident_REJECTED_Action 
)