import gql from "graphql-tag";

export const GET_BLOGS = gql`
{
    blogList {
        id
        title
        body
        created_at
    }
}
`
export const CREATE_BLOG = gql`
    mutation CreateBlog($title: String!, $body: String!){
        createBlog(title: $title, body: $body) {
            id
            title
            body
            created_at
        }
    }
`
