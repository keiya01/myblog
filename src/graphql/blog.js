import gql from "graphql-tag";

export const GET_BLOGS = gql`
{
    blogList {
        id
        title
        body
    }
}
`
export const CREATE_BLOG = gql`
    mutation createBlog($title: String, $body: String){
        createBlog(title: $title, body: $body) {
            id
            title
            body
        }
    }
`
