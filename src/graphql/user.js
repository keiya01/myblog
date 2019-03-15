import gql from "graphql-tag";

export const CREATE_USER = gql`
    mutation CreateUser($name: String!, $nickname: String!, $password: String!) {
        createUser(name: $name, nickname: $nickname, password: $password) {
            id
            name
            nickname
            public_id
        }
    }
`

export const GET_USER = gql`
    query GetUser($public_id: String, $nickname: String, $password: String) {
        user(public_id: $public_id, nickname: $nickname, password: $password) {
            id
            name
            nickname
            public_id
        }
    }
`