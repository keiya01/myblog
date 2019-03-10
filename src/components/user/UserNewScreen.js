import * as React from 'react';
import { Redirect } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { Mutation } from 'react-apollo';
import { CREATE_USER } from '../../graphql/user';
import UserForm from './UserForm';

export default function UserNewScreen(props) {
    const { history } = props;
    const id = localStorage.getItem('id');

    if (id) {
        return <Redirect to='/' />
    }

    return (
        <div className={css(styles.container)}>
            <Mutation mutation={CREATE_USER}>
                {(createUser, { data }) => (
                    <UserForm
                        mutation={createUser}
                        history={history} />
                )}
            </Mutation>
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