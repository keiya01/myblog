import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { Mutation } from "react-apollo";
import { CREATE_BLOG } from "../../graphql/blog";
import BackButton from './BackButton';
import BlogForm from './BlogForm';

export default function BlogNewScreen(props) {
    const { history } = props;

    return (
        <Mutation mutation={CREATE_BLOG}>
            {(createBlog, { data }) => (
                <>
                    <BackButton history={props.history} />
                    <div className={css(styles.container)}>
                        <BlogForm history={history} mutation={createBlog}/>
                    </div>
                </>
            )}
        </Mutation>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff'
    },
})