import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import BlogTopScreen from './blog/BlogTopScreen';
import BlogNewScreen from './blog/BlogNewScreen';
import UserNewScreen from './user/UserNewScreen';

const AuthComponent = props => {
    const {component} = props;
    const id = localStorage.getItem('id');
    if(id) {
        return component(props)
    }else {
        return <Redirect to='/signup'/>
    }
}

export default function AppRoute() {
    return (
        <Router>
            <>
                <Route path='/signup' component={UserNewScreen} />
                <Route path='/new' render={props => <AuthComponent {...props} component={BlogNewScreen}/>} />
                <Route path='/' exact component={BlogTopScreen} />
            </>
        </Router>
    )
}