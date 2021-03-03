// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as React from "react";
import Editor from "rich-markdown-editor";
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from "../store";
import { RouteComponentProps, withRouter } from "react-router";
import {updateCompleted, updateLocalBody} from "../store/noteService/noteService_inplace_actions";
import {updateNoteBody} from "../store/noteService/noteService_actions";


const mapStoreStateToProps = (store: RootState) => ({
    body: store.note.body,
    needUpdate: store.note.needUpdate,
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateLocalBody: (body: string) => dispatch(updateLocalBody(body)),
        updateNoteBody: (note_id: string, body: string) => dispatch(updateNoteBody(note_id, body)),
        updateCompleted: () => dispatch(updateCompleted()),
    }
};
const connector = connect(mapStoreStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export interface NoteBodyState {}


export type NoteBodyProps = PropsFromRedux & RouteComponentProps<{}> & {
    mode: "edit" | "view",
    note_id: string,
}


class NoteBody extends React.Component<NoteBodyProps, NoteBodyState> {

    constructor(props: NoteBodyProps) {
        super(props);
        this.state = {};
    }

    // renderView(): React.ReactNode {
    //     const { body, mode } = this.props;
    //     if (mode !== "view") {
    //         return null;
    //     }
    //     return (
    //         <div key={ `body-state` }>
    //             <Editor
    //                 readOnly
    //                 placeholder="No any body yet"
    //                 defaultValue={ body }
    //                 value={ body }
    //                 onChange={(value: () => string) => null}
    //                 onClickLink={(href: string) => {
    //                     if (href.includes("/note/")) {
    //                         this.props.history.push(`/note/${href.split("/note/")[1]}`);
    //                         return;
    //                     }
    //                     if (href.includes("/tag/")) {
    //                         this.props.history.push(`/tag/${href.split("/tag/")[1]}`);
    //                         return;
    //                     }
    //                     window.open(href, "_blank")
    //                 }}
    //             />
    //         </div>
    //     )
    // }

    // renderEdit(): React.ReactNode {
    //     const { body, mode } = this.props;
    //     if (mode !== "edit") {
    //         return null;
    //     }
    //     return (
    //         <CKEditor
    //             editor={ ClassicEditor }
    //             data={ this.props.body }
    //             onReady={ (editor: any) => {
    //                 console.log( 'Editor is ready to use!', editor );
    //             } }
    //             onChange={ ( event: any, editor: any ) => {
    //                 const data = editor.getData();
    //                 this.props.updateLocalBody(data);
    //                 // this.props.onChange(data);
    //             } }
    //             onBlur={ ( event: any, editor: any ) => {
    //                 // console.log( 'Blur.', editor );
    //             } }
    //             onFocus={ ( event: any, editor: any ) => {
    //                 // console.log( 'Focus.', editor );
    //             } }
    //         />
    //     )
    // }

    render(): React.ReactNode {
        const { body, mode } = this.props;
        if (this.props.needUpdate) {
            // @ts-ignore
            this.props.updateNoteBody(this.props.note_id, this.props.body);
            this.props.updateCompleted();
        }
        return (
            <div style={{ marginTop: "10px" }}>
                {/*{ this.renderView() }*/}
                {/*{ this.renderEdit() }*/}
                <CKEditor
                    editor={ ClassicEditor }
                    data={ this.props.body }
                    disabled={ mode === "view" }
                    onReady={ (editor: any) => {
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event: any, editor: any ) => {
                        const data = editor.getData();
                        this.props.updateLocalBody(data);
                    } }
                    onBlur={ ( event: any, editor: any ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event: any, editor: any ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    }
}

export default withRouter(connector(NoteBody));