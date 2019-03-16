import * as React from 'react';
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { useCanSubmit } from "../../hooks/form";
import { Mutation } from 'react-apollo';
import { CREATE_USER } from '../../graphql/user';
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

export default function UserSignup(props) {
    const { mutation, history } = props;
    const { setUser } = useContext(CurrentUser);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        nickname,
        password,
    } = state.user;
    const [errors, setErrors] = useState({
        nickname: "",
        password: "",
    });

    const validateLength = () => {
        if (nickname.length > 3 && password.length > 5) {
            return true
        }

        return false
    }

    const canSubmit = useCanSubmit([nickname, password], validateLength);

    const handleOnChange = type => event => {
        dispatch({ type, value: event.target.value });
    }

    const handleOnSubmit = (mutation) => async () => {
        const query = await mutation({ variables: { name: nickname, nickname, password } }).catch(err => {
            const error = err.toString();
            console.log(error)
            switch (true) {
                case error.includes("UNIQUE"):
                    setErrors(errors => ({
                        ...errors,
                        nickname: "このnicknameはすでに使われています",
                    }));
                    break;
                default:
                    setErrors({
                        nickname: "",
                        password: "",
                    });
                    break;
            }
        });

        if (!query) {
            return
        }

        const { data } = query;

        const id = data.createUser.public_id;
        setUser(data.createUser);
        localStorage.setItem('id', id);
        history.push('/');
    }

    return (
        <Mutation mutation={CREATE_USER}>
            {mutation => (
                <div className={css(styles.form)}>
                    <Link to='/login' className={css(styles.link)}>Login</Link>
                    <h3 className={css(styles.formTitle)}>Signup</h3>
                    <p className={css(styles.label)}>nickname<span className={css(styles.warningMsg)}>※他のアカウントと異なる値 / 最低3文字</span></p>
                    <input
                        type='text'
                        value={nickname}
                        onChange={handleOnChange('nickname')} />
                    <br />
                    <p className={css(styles.error)}>{errors.nickname}</p>
                    <p className={css(styles.label)} style={{ marginTop: 40, }}>password<span className={css(styles.warningMsg)}>※最低5文字</span></p>
                    <input
                        type='password'
                        value={password}
                        onChange={handleOnChange('password')} />
                    <br />
                    <p className={css(styles.error)}>{errors.password}</p>
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
    label: {
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
    formTitle: {
        fontSize: 30,
        color: '#516C9D',
        textAlign: 'center',
        marginBottom: 50
    },
    warningMsg: {
        color: '#aaa',
        fontSize: 13,
        marginLeft: 10,
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
