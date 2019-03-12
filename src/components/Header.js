import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { Link } from "react-router-dom";

export default function Header(props) {
    return (
        <div className={css(styles.headerContainer)}>
            <div className={css(styles.leftLink)}>
                <Link to='/new' className={css(styles.createButton)}>Create</Link>
            </div>
            <Link to='/' className={css(styles.link)}>Logout</Link>
        </div>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        height: 50,
        padding: '0 30px',
        boxShadow: '0 1px 3px #aaa',
        backgroundColor: '#fff'
    },
    link: {
        fontSize: 16,
        color: '#777',
        margin: '0 20px',
        textDecoration: 'none',
        lineHeight: '50px',
        ':hover': {
            color: '#516C9D',
            fontWeight: 'bold'
        }
    },
    leftLink: {
        display: 'flex',
        flex: 1,
        alignItems: 'center'
    },
    createButton: {
        display: 'inline-block',
        width: 70,
        height: 30,
        textAlign: 'center',
        lineHeight: '30px',
        backgroundColor: '#516C9D',
        color: '#fff',
        marginLeft: 20,
        textDecoration: 'none',
        fontSize: 15,
        borderRadius: 5,
        letterSpacing: '0.06em',
        fontWeight: 'bold',
        boxShadow: '0 1px 2px #aaa',
        ':active': {
            boxShadow: 'none',
            transform: 'translateY(1px)'
        }
    }
})