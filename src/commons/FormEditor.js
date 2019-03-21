import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

const { useState } = React;

export default function FormEditor(props) {
    const [editorState, changeEditorState] = useState(EditorState.createEmpty());

    const handleOnBold = () => {
        changeEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
    }

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          changeEditorState(newState);
          return 'handled';
        }
        return 'not-handled';
      }

    return (
        <>
            <button onClick={handleOnBold}>BOLD</button>
            <Editor 
            editorState={editorState} 
            onChange={e => changeEditorState(e)} 
            handleKeyCommand={handleKeyCommand}/>
        </>
    );
}