import React from 'react';
import { StyleSheet, css } from "aphrodite";
import { Link } from "react-router-dom";
import { CurrentUser } from "../contexts/user";

const { useContext } = React;

export default function Header(props) {
    const { user: current_user, setUser } = useContext(CurrentUser);
    const isLogin = Object.keys(current_user).length !== 0;

    const handleOnLogout = () => {
        localStorage.removeItem('id');
        setUser({});
    }

    return (
        <div className={css(styles.headerContainer)}>
            {
                isLogin
                    ?
                    <>
                        <div className={css(styles.leftLink)}>
                            <Link to='/new' className={css(styles.createButton)}>Create</Link>
                        </div>
                        <Link
                            to='/'
                            className={css(styles.link, styles.logoutButton)}
                            onClick={handleOnLogout}>
                            Logout
                        </Link>
                    </>
                    :
                    <>
                        <div className={css(styles.leftLink)} />
                        <Link to='/signup' className={css(styles.link, styles.signupButton)}>Signup</Link>
                        <Link to='/login' className={css(styles.link, styles.loginButton)}>Login</Link>
                    </>
            }
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
        textDecoration: 'none',
        lineHeight: '50px',
    },
    logoutButton: {
        color: '#777',
        margin: '0 20px',
        transition: 'color 100ms',
        ':hover': {
            color: 'tomato',
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
    },
    signupButton: {
        color: '#516c9d',
        fontWeight: 'bold',
        margin: '0 20px',
        marginRight: 30,
    },
    loginButton: {
        color: '#7b9ad0',
        margin: '0 20px',
        fontWeight: 'bold',
    }
})