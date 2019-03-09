import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { Link } from "react-router-dom";

export default function NavigationScreen(props) {
    return (
        <div className={css(styles.container)}>
            <div className={css(styles.headerContainer)}>
                <Link to='/new' className={css(styles.link)}>Create Post</Link>
                <Link to='/' className={css(styles.link)}>Show Follo List</Link>
                <Link to='/' className={css(styles.link)}>Logout</Link>
            </div>
            {props.children}
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    headerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: '30px 20px',
        textAlign: 'right',
    },
    link: {
        display: 'block',
        fontSize: 16,
        color: '#777',
        margin: '50px 0',
        textDecoration: 'none',
        ':hover': {
            color: '#333'
        }
    }
})