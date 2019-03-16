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
                <div className={css(styles.optionBox)}>
                    <p className={css(styles.edit)}>編集</p>
                    <p className={css(styles.delete)}>削除</p>
                </div>
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
        position: 'relative',
        width: '90%',
        maxWidth: 600,
        minHeight: '100vh',
        margin: '0 auto',
        padding: '100px 0',
        '@media(max-width: 480px)': {
            padding: '50px 0'
        }
    },
    optionBox: {
        position: 'absolute',
        top: 50,
        right: 50,
        display: 'flex',
        flexDirection: 'row'
    },
    edit: {
        fontSize: 16,
        color: '#84eb86',
        marginRight: 20,
        cursor: 'pointer',
        transition: 'color 300ms',
        ':hover': {
            color: '#1ba71d'
        }
    },
    delete: {
        fontSize: 16,
        color: '#EB8686',
        cursor: 'pointer',
        transition: 'color 300ms',
        ':hover': {
            color: '#c11f1f'
        }
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