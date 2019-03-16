import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { formatDateTime } from "../../commons/date";

const { useRef, useEffect } = React;

export default function BlogItem(props) {
    const {
        title,
        body,
        created_at,
        onClick
    } = props;

    return (
        <div
            className={css(styles.blogList)}
            onClick={onClick}>
            <h3 className={css(styles.title)}>{title}</h3>
            <p className={css(styles.body)}>{body}</p>
            <p className={css(styles.createdAt)}>{formatDateTime(created_at)}</p>
        </div>
    )
}

const styles = StyleSheet.create({
    blogList: {
        width: '70%',
        margin: '10px auto',
        padding: '30px 15px',
        cursor: 'pointer',
        transition: 'box-shadow 100ms, transform 300ms',
        ':hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 1px 3px #aaa'
        },
        '@media(max-width: 480px)': {
            width: '90%'
        }
    },
    title: {
        color: '#333',
        fontSize: 20,
        letterSpacing: '0.1em',
        '@media(max-width: 480px)': {
            fontSize: 18
        }
    },
    body: {
        color: '#555',
        fontSize: 16,
        marginTop: 20,
        marginLeft: 15,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '95%',
        height: '100%',
        letterSpacing: '0.1em',
        '@media(max-width: 480px)': {
            fontSize: 15,
        }
    },
    createdAt: {
        color: '#999',
        fontSize: 14,
        textAlign: 'right',
        marginTop: 10,
    }
})