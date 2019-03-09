import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import BlogTopScreen from './BlogTopScreen';
import BlogNewScreen from './BlogNewScreen';

export default function AppRoute() {
    return (
        <Router>
            <>
                <Route path='/new' component={BlogNewScreen} />
                <Route path='/' exact component={BlogTopScreen} />
            </>
        </Router>
    )
}