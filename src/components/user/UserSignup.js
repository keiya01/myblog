import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { useCanSubmit } from "../../hooks/form";
import { Mutation } from 'react-apollo';
import { CREATE_USER } from '../../graphql/user';
import { CurrentUser } from '../../contexts/user';

const { useReducer, useState, useContext } = React;

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

export default function UserSignup(props) {
    const { mutation, history } = props;

    const {setUser} = useContext(CurrentUser);
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

    const handleOnSubmit = (mutation) => async () => {
        const { data } = await mutation({ variables: { name, nickname, password } });
        const id = data.createUser.public_id;
        setUser(data.createUser);
        localStorage.setItem('id', id);
        history.push('/');
    }

    return (
        <Mutation mutation={CREATE_USER}>
            {mutation => (
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
                        onClick={handleOnSubmit(mutation)}>
                        Signup
            </button>
                </div>
            )}
        </Mutation>
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
