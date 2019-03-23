import React from "react";
import { StyleSheet, css } from 'aphrodite';
import { Editor, EditorState, RichUtils } from "draft-js";

const { useState } = React;

export default function FormEditor(props) {
    const [editorState, changeEditorState] = useState(EditorState.createEmpty());

    const keyBindingFn = e => {
        switch (e.keyCode) {
            case 32 /* this code is Shift */: {
                return "myList"
            }
            default: {
                return
            }
        }
    }

    const handleKeyCommand = (command, editorState) => {
        if (command === "myList") {
            const newState = RichUtils.toggleBlockType(editorState, 'unordered-list-item');
            changeEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    return (
        <div className={css(styles.container)}>
            <Editor
                editorState={editorState}
                onChange={e => changeEditorState(e)}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={keyBindingFn} />
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        maxWidth: 480,
        height: "100%",
        minHeight: "100vh",
    }
})