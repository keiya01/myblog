import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { useCanSubmit } from "../../hooks/form";
import { GET_USER } from '../../graphql/user';
import { ApolloConsumer } from 'react-apollo';
import { CurrentUser } from '../../contexts/user';

const { useReducer, useState, useContext } = React;

const initialState = {
    user: {
        nickname: '',
        password: '',
    },
}

const reducer = (state, action) => {
    switch (action.type) {
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

export default function UserLogin(props) {
    const { history } = props;

    const { setUser } = useContext(CurrentUser);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        name,
        nickname,
        password,
    } = state.user;
    const canSubmit = useCanSubmit([nickname, password]);
    const [errors, setErrors] = useState({
        isError: false,
        message: "",
    })

    const handleOnChange = type => event => {
        dispatch({ type, value: event.target.value });
    }

    const handleOnSubmit = (client) => async () => {
        const query = await client.query({ query: GET_USER, variables: { nickname, password } }).catch((err) => {
            const error = err.toString()
            switch (true) {
                case error.includes("User not found"):
                    setErrors({
                        isError: true,
                        message: "User not found",
                    });
                    break;
                case error.includes("Password is invalid"):
                    setErrors({
                        isError: true,
                        message: "Password is invalid",
                    });
                    break
                default:
                    setErrors({
                        isError: false,
                        message: ""
                    });
                    break;
            }
        });

        if (!query) {
            return
        }

        const { data } = query;
        const id = data.user.public_id;
        setUser(data.user);
        localStorage.setItem('id', id);
        history.push('/');
    }

    return (
        <ApolloConsumer>
            {client => (
                <div className={css(styles.form)}>
                    <h3 className={css(styles.formTitle)}>Login</h3>
                    {
                        errors.isError
                        &&
                        <p>{errors.message}</p>
                    }
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
                        onClick={handleOnSubmit(client)}>
                        Login
            </button>
                </div>
            )}
        </ApolloConsumer>
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
        color: '#7b9ad0',
        textAlign: 'center',
        marginBottom: 50
    },
    submitButton: {
        width: '100%',
        border: 'none',
        borderRadius: 30,
        backgroundColor: '#7b9ad0',
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
