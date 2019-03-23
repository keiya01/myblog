import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "../styles/rich-editor.css";

const { useState, useRef, useEffect } = React;

const useTogglePlaceholder = (editorState, showPlaceholder, hidePlaceholder) => {
    const [className, setClassName] = useState(showPlaceholder);
    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                console.log("success!!!!")
                setClassName(`${showPlaceholder} ${hidePlaceholder}`);
                return
            }
            setClassName(showPlaceholder);
        }else {
            setClassName(`${showPlaceholder} ${hidePlaceholder}`);
        }
    }, [editorState.getCurrentContent()])

    return className
}

export default function FormEditor(props) {
    const [editorState, changeEditorState] = useState(EditorState.createEmpty());
    const className = useTogglePlaceholder(editorState, "richEditor", "richEditor-hidePlaceholder");
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
                return getDefaultKeyBinding(e);
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

    const placeholder = "Please enter body...";

    return (
        <div className={className} onClick={handleOnFocusEditor}>
            <Editor
                placeholder={placeholder}
                editorState={editorState}
                onChange={e => changeEditorState(e)}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={keyBindingFn}
                ref={editor} />
        </div>
    );
}