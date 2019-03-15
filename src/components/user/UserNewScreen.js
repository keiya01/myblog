import * as React from 'react';
import { Redirect } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import UserSignup from './UserSignup';
import UserLogin from './UserLogin';

export default function UserNewScreen(props) {
    const { history, isLogin } = props;
    const id = localStorage.getItem('id');

    if (id) {
        return <Redirect to='/' />
    }

    return (
        <div className={css(styles.container)}>
            {
                isLogin
                    ?
                    <UserLogin
                        history={history} />
                    :
                    <UserSignup
                        history={history} />
            }
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#fff'
    },
})