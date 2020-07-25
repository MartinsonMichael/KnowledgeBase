import { NoteHeadList } from "../messages";

export interface SystemState {
    noteHeadList?: NoteHeadList
    tagList?: string[]
    isLoading: boolean
}
