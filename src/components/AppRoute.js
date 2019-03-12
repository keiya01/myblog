import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import BlogTopScreen from './blog/BlogTopScreen';
import BlogNewScreen from './blog/BlogNewScreen';
import UserNewScreen from './user/UserNewScreen';

const { useEffect } = React;

const AuthComponent = props => {
    const { component } = props;
    const id = localStorage.getItem('id');
    if (id) {
        return component(props)
    } else {
        return <Redirect to='/signup' />
    }
}

const ScrollToTop = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return props.children
}

export default function AppRoute() {
    return (
        <Router>
            <ScrollToTop>
                <Route path='/signup' component={UserNewScreen} />
                <Route path='/new' render={props => <AuthComponent {...props} component={BlogNewScreen} />} />
                <Route path='/' exact component={BlogTopScreen} />
            </ScrollToTop>
        </Router>
    )
}