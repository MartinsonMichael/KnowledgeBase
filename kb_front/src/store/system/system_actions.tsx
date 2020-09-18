import { LinkSearchMode } from "../../components/LinkDialogSearch";


export const ChangeLinkSearchDialogType = 'ChangeLinkSearchDialogType';
interface ChangeLinkSearchDialogAction {
    type: typeof ChangeLinkSearchDialogType
    payload: LinkSearchMode
}

export const OpenNewTagCreator = "OpenNewTagCreator";
interface OpenNewTagCreatorAction {
    type: typeof OpenNewTagCreator
}

export const CloseNewTagCreator = "CloseNewTagCreator";
interface CloseNewTagCreatorAction {
    type: typeof CloseNewTagCreator
}

export const ToggleNewNoteCreator = "ToggleNewNoteCreator";
interface ToggleNewNoteCreatorAction {
    type: typeof ToggleNewNoteCreator
}


export type SystemActionTypes = ChangeLinkSearchDialogAction | OpenNewTagCreatorAction | CloseNewTagCreatorAction | ToggleNewNoteCreatorAction


export const toggleNewNoteCreator = () => {
    return (dispatch: any) => dispatch({
      type: ToggleNewNoteCreator,
  });
};

export const OpenNewTagCreatorSystemAction = () => {
  return (dispatch: any) => dispatch({
      type: OpenNewTagCreator,
  });
};

export const CloseNewTagCreatorSystemAction = () => {
  return (dispatch: any) => dispatch({
      type: CloseNewTagCreator,
  });
};

export const ChangeLinkDialogState = (state: LinkSearchMode) => {
  return (dispatch: any) => dispatch({
      type: ChangeLinkSearchDialogType,
      payload: state,
  });
};