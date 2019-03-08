import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Query, Mutation } from "react-apollo";
import { GET_BLOGS, CREATE_BLOG } from "../graphql/blog";

export default function BlogScreen(props) {
    return (
        <Query query={GET_BLOGS}>
            {({loading, data}) => {
                if(loading) {
                    return <p>Loading...</p>
                }
                
                return (
                    <p>Success!!!</p>
                )
            }}
        </Query>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff'
    },
    title: {
        color: '#555',
        fontSize: 15,
        textAlign: 'center'
    }
})
