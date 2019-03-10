import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { useCanSubmit } from "../../hooks/form";

const { useReducer, useState } = React;

const initialState = {
    user: {
        name: '',
        nickname: '',
        password: '',
    },
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'name':
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.value
                }
            }
        case 'nickname':
            return {
                ...state,
                user: {
                    ...state.user,
                    nickname: action.value
                }
            }
        case 'password':
            return {
                ...state,
                user: {
                    ...state.user,
                    password: action.value
                }
            }
    }
}

export default function UserForm(props) {
    const { mutation, history } = props;

    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        name,
        nickname,
        password,
    } = state.user;
    const canSubmit = useCanSubmit([name, nickname, password]);

    const handleOnChange = type => event => {
        dispatch({ type, value: event.target.value });
    }

    const handleOnSubmit = () => {
        mutation({ variables: { name, nickname, password } }).then(({data}) => {
            const id = data.createUser.public_id;
            localStorage.setItem('id', id);
            console.log(localStorage.getItem('id'))
            history.push('/');
        })
    }

    return (
        <div className={css(styles.form)}>
            <h3 className={css(styles.formTitle)}>Signup</h3>
            <p>name</p>
            <input
                type='text'
                value={name}
                onChange={handleOnChange('name')} />
            <br />
            <p>nickname</p>
            <input
                type='text'
                value={nickname}
                onChange={handleOnChange('nickname')} />
            <br />
            <p>password</p>
            <input
                type='password'
                value={password}
                onChange={handleOnChange('password')} />
            <br />
            <button
                disabled={!canSubmit}
                className={css(styles.submitButton)}
                onClick={handleOnSubmit}>
                SignUp
            </button>
        </div>
    )
}

const styles = StyleSheet.create({
    form: {
        width: '90%',
        maxWidth: 500,
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px #aaa',
        padding: '50px',
        ':nth-child(n) > input': {
            width: '100%',
            padding: '10px',
            marginBottom: 40,
            borderRadius: 5,
            border: '1px solid #ccc',
            fontSize: 16
        },
        ':nth-child(n) > p': {
            color: '#777',
            fontWeight: 'bold',
            fontSize: 15,
            marginLeft: 5,
            marginBottom: 10
        }
    },
    formTitle: {
        fontSize: 30,
        color: '#516C9D',
        textAlign: 'center',
        marginBottom: 50
    },
    submitButton: {
        width: '100%',
        border: 'none',
        borderRadius: 30,
        backgroundColor: '#516C9D',
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        padding: '15px 0',
        marginTop: 30,
        ':disabled': {
            backgroundColor: '#aaa'
        }
    }
})
