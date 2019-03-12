import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { formatDateTime } from "../../commons/date";

const { useRef, useEffect } = React;

export default function BlogItem(props) {
    const {
        title,
        body,
        created_at
    } = props;

    return (
        <div className={css(styles.blogList)}>
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
        ':hover': {
            boxShadow: '0px 1px 3px #aaa'
        }
    },
    title: {
        color: '#333',
        fontSize: 20,
    },
    body: {
        color: '#555',
        fontSize: 16,
        marginTop: 20,
        marginLeft: 15,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: window.innerWidth * 0.5,
        height: '100%'
    },
    createdAt: {
        color: '#999',
        fontSize: 14,
        textAlign: 'right',
        marginTop: 10,
        marginRight: 10
    }
})