import React from "react";
import { StyleSheet, css } from 'aphrodite';
import { Editor, EditorState, RichUtils } from "draft-js";

const { useState, useRef } = React;

export default function FormEditor(props) {
    const [editorState, changeEditorState] = useState(EditorState.createEmpty());
    const editor = useRef(null)

    const handleOnFocusEditor = () => {
        editor.current.focus();
    }

    const keyBindingFn = e => {
        switch (e.keyCode) {
            case 32 /* this code is Shift */: {
                return "insertList";
            }
            case 13: {
                return "insertNewLine"
            }
            default: {
                return;
            }
        }
    }

    const handleKeyCommand = (command, editorState) => {
        switch (command) {
            case "insertList": {
                changeEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
                return 'handled';
            }
            case "insertNewLine": {
                changeEditorState(RichUtils.insertSoftNewline(editorState));
                return "handle"
            }
            default: {
                return 'not-handled';
            }
        }
    }

    return (
        <div className={css(styles.container)} onClick={handleOnFocusEditor}>
            <Editor
                editorState={editorState}
                onChange={e => changeEditorState(e)}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={keyBindingFn}
                ref={editor} />
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        maxWidth: 600,
        height: "100%",
        minHeight: "100vh",
        border: "1px solid #222",
        margin: "0 auto",
    }
})