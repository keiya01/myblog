import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Query } from "react-apollo";
import { GET_BLOGS, CREATE_BLOG } from "../../graphql/blog";
import BlogItem from './BlogItem';
import Header from '../Header';

export default function BlogScreen(props) {
    const {
        history
    } = props;

    const handleTransitionDetail = (blog) => () => {
        history.push(`/${blog.id}`, blog)
    }

    return (
        <>
            <Header />
            <div className={css(styles.bodyContainer)}>
                <Query
                    query={GET_BLOGS}
                    pollInterval={500}>
                    {(query) => {
                        const {
                            loading,
                            data,
                        } = query;

                        if (loading) {
                            return <p>Loading...</p>
                        }

                        const { blogList } = data;


                        return (
                            <>
                                {blogList.map(blog => {
                                    return (
                                        <BlogItem
                                            key={blog.id}
                                            {...blog}
                                            onClick={handleTransitionDetail(blog)} />
                                    )
                                })}
                            </>
                        )
                    }}
                </Query>
            </div>
        </>
    )
}

const hoverItem = [
    {
        'from': {
            boxShadow: '0px 0px 0px #aaa'
        },
        'to': {
            boxShadow: '0px 2px 5px #aaa'
        }
    }
]

const styles = StyleSheet.create({
    bodyContainer: {
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        paddingTop: 80
    },
})
