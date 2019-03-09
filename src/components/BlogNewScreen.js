import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { Mutation } from "react-apollo";
import { CREATE_BLOG } from "../graphql/blog";

const { useState, useRef } = React;

export default function BlogNewScreen(props) {
    const title = useRef(null)
    const body = useRef(null)

    const handleOnSubmit = createBlog => event => {
        event.preventDefault();
        createBlog({ variables: { title: title.current.value, body: body.current.value } }).then(() => {
            props.history.push("/")
        });
    }

    return (
        <div className={css(styles.container)}>
            <Mutation mutation={CREATE_BLOG}>
                {(createBlog, { data }) => (
                    <form
                        className={css(styles.form)}
                        onSubmit={handleOnSubmit(createBlog)}>
                        <input
                            className={css(styles.title)}
                            ref={title} />
                        <textarea
                            className={css(styles.body)}
                            ref={body} />
                    </form>
                )}
            </Mutation>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff'
    },
    form: {
        width: '90%',
        maxWidth: 600,
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        boxShadow: '0 0 5px #aaa',
        margin: '30px auto',
        padding: '50px 30px'
    },
    title: {
        width: '100%',
        backgroundColor: '#fff',
        border: 'none',
        borderBottom: '1px solid #aaa',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        padding: 10
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
        letterSpacing: '0.1em'
    }
})