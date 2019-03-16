import * as React from 'react';
import { Link } from 'react-router-dom';
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
        nickname: "",
        password: "",
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
                        nickname: "ユーザーが見つかりませんでした",
                        password: "",
                    });
                    break;
                case error.includes("Password is invalid"):
                    setErrors({
                        nickname: "",
                        password: "パスワードが一致しません",
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
                    <Link to='/signup' className={css(styles.link)}>Signup</Link>
                    <h3 className={css(styles.formTitle)}>Login</h3>
                    <p className={css(styles.label)}>nickname</p>
                    <input
                        type='text'
                        value={nickname}
                        onChange={handleOnChange('nickname')} />
                    <br />
                    <p className={css(styles.error)}>{errors.nickname}</p>
                    <p className={css(styles.label)} style={{ marginTop: 40, }}>password</p>
                    <input
                        type='password'
                        value={password}
                        onChange={handleOnChange('password')} />
                    <br />
                    <p className={css(styles.error)}>{errors.password}</p>
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
        position: 'relative',
        width: '90%',
        maxWidth: 500,
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px #aaa',
        padding: '50px',
        ':nth-child(n) > input': {
            width: '100%',
            padding: '10px',
            borderRadius: 5,
            border: '1px solid #ccc',
            fontSize: 16
        },
    },
    link: {
        position: 'absolute',
        top: 10,
        right: 30,
        fontSize: 16,
        color: '#555',
        textDecoration: 'none',
        borderBottom: '1px solid #333',
        paddingBottom: 1,
        letterSpacing: '0.1em',
        ":hover": {
            opacity: 0.8
        }
    },
    labe: {
        color: '#777',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 5,
        marginBottom: 10
    },
    error: {
        color: '#ff6161',
        fontSize: 15,
        textAlign: 'center'
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
