import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Query, Mutation } from "react-apollo";
import { GET_BLOGS, CREATE_BLOG } from "../graphql/blog";
import BlogItem from './BlogItem';

const { useRef, useEffect } = React;

export default function BlogScreen(props) {
    return (
        <div className={css(styles.container)}>
            <div className={css(styles.bodyContainer)}>
                <Query query={GET_BLOGS}>
                    {({ loading, data }) => {
                        if (loading) {
                            return <p>Loading...</p>
                        }

                        const { blogList } = data;

                        return (
                            <>
                                {blogList.map(blog => {
                                    return (
                                        <BlogItem key={blog.id} {...blog}/>
                                    )
                                })}
                            </>
                        )
                    }}
                </Query>
            </div>
        </div>
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
    container: {
        display: 'flex',
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    bodyContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 30
    },
})
