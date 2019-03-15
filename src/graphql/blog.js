import gql from "graphql-tag";

export const GET_BLOGS = gql`
query GetBlogList($user_id: Int) {
    blogList(user_id: $user_id) {
        id
        title
        body
        user_id
        created_at
    }
}
`
export const CREATE_BLOG = gql`
    mutation CreateBlog($title: String!, $body: String!, $user_id: Int!){
        createBlog(title: $title, body: $body, user_id: $user_id) {
            id
            title
            body
            user_id
            created_at
        }
    }
`
