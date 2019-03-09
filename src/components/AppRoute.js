import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import BlogTopScreen from './BlogTopScreen';
import BlogNewScreen from './BlogNewScreen';
import NavigationScreen from './NavigationScreen';

export default function AppRoute() {
    return (
        <Router>
            <NavigationScreen>
                <Route path='/' component={BlogTopScreen} />
                <Route path='/new' component={BlogNewScreen} />
            </NavigationScreen>
        </Router>
    )
}