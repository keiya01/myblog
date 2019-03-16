import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import BackButton from '../BackButton';

const { useState, useEffect, useContext } = React;

export default function BlogDetailScreen(props) {
    const {
        history,
    } = props;

    const [blog, setBlog] = useState({
        title: "",
        body: ""
    });

    useEffect(() => {
        if (history.location.state) {
            setBlog(history.location.state);
        } else {

        }
    }, [history.location.state])

    return (
        <div className={css(styles.container)}>
            <BackButton history={history} />
            <div className={css(styles.blogContainer)}>
                <h3 className={css(styles.title)}>{blog.title}</h3>
                <p className={css(styles.body)}>{blog.body}</p>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    blogContainer: {
        width: '90%',
        maxWidth: 600,
        minHeight: '100vh',
        margin: '0 auto',
        paddingTop: 100
    },
    title: {
        fontSize: 25,
        color: '#333',
    },
    body: {
        color: '#555',
        fontSize: 16,
        marginTop: 50,
        letterSpacing: '0.1em',
        lineHeight: '1.5em'
    }
})