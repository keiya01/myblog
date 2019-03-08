import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import BlogTopScreen from './BlogTopScreen';

export default function AppRoute() {
    return (
        <Router>
            <Route path='/' component={BlogTopScreen}/>
        </Router>
    )
}