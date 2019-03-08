import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Query, Mutation } from "react-apollo";
import { GET_BLOGS, CREATE_BLOG } from "../graphql/blog";

const formatDateTime = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    const format = (date) => {
        if (date < 10) {
            return `0${date}`
        }

        return date
    }

    const visible = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let currentDay = currentDate.getDay();
        let currentHours = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();
        switch (true) {
            case year < currentYear:
            case month < currentMonth:
            case day < currentDay:
                const visibleDay = currentDay - day;
                if(visibleDay === 1) {
                    return 'yesterday';
                }
                if(visibleDay > 5) {
                    break;
                }
                return `${visibleDay} day ago`;
            case hours < currentHours:
                const visibleHours = currentHours - hours;
                return `${visibleHours} hours ago`;
            case minutes < currentMinutes:
                const visibleMinutes = currentMinutes - minutes;
                return `${visibleMinutes} minutes ago`;
            case minutes >= currentMinutes:
                return 'now';
        }
        return `${year}-${format(month)}-${format(day)}`
    }
    
    return visible()

}

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
                                        <div className={css(styles.blogList)}>
                                            <h3 className={css(styles.title)}>{blog.title}</h3>
                                            <p className={css(styles.body)}>However, I also feel more pressure now to stay on top of the scrutiny that comes when you mark something as stable. Hooks are very new, we are still figuring out “best practices” for some of the less common patterns — both internally at Facebook and in GitHub discussions. But the longer it takes to document and enforce them (e.g. with warnings), the more risk there is that someone will create a course or write an article using a broken pattern without realizing that. It’s hard not to feel at least partially responsible when that happens.{blog.body}</p>
                                            <p className={css(styles.createdAt)}>{formatDateTime(blog.created_at)}</p>
                                        </div>
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
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff'
    },
    bodyContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        width: '90%',
        maxWidth: 600,
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        paddingTop: 30
    },
    blogList: {
        width: '100%',
        padding: '30px 15px',
        cursor: 'pointer',
        ':hover': {
            boxShadow: '0px 1px 3px #aaa'
        }
    },
    title: {
        color: '#333',
        fontSize: 20,
    },
    body: {
        color: '#555',
        fontSize: 16,
        marginTop: 20,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    createdAt: {
        color: '#999',
        fontSize: 14,
        textAlign: 'right',
        marginTop: 10,
        marginRight: 10
    }
})
