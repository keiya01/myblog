import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { useCanSubmit } from "../../hooks/form";

const { useState } = React;

export default function BlogForm(props) {
    const { mutation, history } = props;
    const [title, changeTitle] = useState('');
    const [body, changeBody] = useState('');
    const canSubmit = useCanSubmit([title, body])

    const handleChangeTitle = event => {
        changeTitle(event.target.value);
    }

    const handleChangeBody = event => {
        changeBody(event.target.value);
    }

    const handleOnSubmit = () => {
        if (canSubmit) {
            mutation({ variables: { title, body } }).then((data) => {
                history.push("/")
            });
        }
    }

    return (
        <div className={css(styles.form)}>
            <button
                disabled={!canSubmit}
                className={css(styles.createButton)}
                onClick={handleOnSubmit}>
                Create
            </button>
            <input
                className={css(styles.title)}
                placeholder='Please enter title...'
                value={title}
                onChange={handleChangeTitle} />
            <textarea
                className={css(styles.body)}
                placeholder='Please enter body...'
                value={body}
                onChange={handleChangeBody} />
        </div>
    )
}

const styles = StyleSheet.create({
    form: {
        position: 'relative',
        width: '90%',
        maxWidth: 600,
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        boxShadow: '0 0 5px #aaa',
        margin: '30px auto',
        padding: '50px 30px'
    },
    createButton: {
        position: 'absolute',
        top: 10,
        right: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: "#516C9D",
        marginBottom: 20,
        padding: '5px 10px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 5,
        boxShadow: '0 1px 3px #aaa',
        ':disabled': {
            backgroundColor: '#ccc',
            boxShadow: 'none',
        },  
        ':focus': {
            outline: 'none'
        },
        ':active': {
            transform: 'translateY(1px)',
            boxShadow: 'none',
        }
    },
    title: {
        width: '100%',
        backgroundColor: '#fff',
        border: 'none',
        borderBottom: '1px solid #aaa',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        padding: '10px 0',
        letterSpacing: '0.1em',
        '::placeholder': {
            fontSize: 16,
            color: '#ddd',
            fontWeight: 'normal'
        }
    },
    body: {
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        border: 'none',
        marginTop: 20,
        fontSize: 16,
        color: '#555',
        lineHeight: '1.5em',
        letterSpacing: '0.1em',
        '::placeholder': {
            color: '#ddd',
            fontSize: 16,
        }
    }
})