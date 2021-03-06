import * as React from 'react';
import { StyleSheet, css } from "aphrodite";
import { Mutation } from "react-apollo";
import { CREATE_BLOG } from "../../graphql/blog";
import BackButton from '../BackButton';
import BlogForm from './BlogForm';

const { useState, useEffect } = React;

export default function BlogNewScreen(props) {
    const { history } = props;
    const [isEdit, setIsEdit] = useState(false);
    const blog = history.location.state;

    useEffect(() => {
        if (blog) {
            setIsEdit(true);
            return setIsEdit(false);
        }
    }, [blog])

    return (
        <Mutation mutation={CREATE_BLOG}>
            {(createBlog, { data }) => (
                <>
                    <BackButton history={history} />
                    <div className={css(styles.container)}>
                        <BlogForm
                            history={history}
                            mutation={createBlog}
                            isEdit={isEdit}
                            blog={blog} />
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