import gql from "graphql-tag";

export const CREATE_USER = gql`
    mutation CreateUser($name: String!, $nickname: String!, $password: String!) {
        createUser(name: $name, nickname: $nickname, password: $password) {
            name
            nickname
            public_id
        }
    }
`