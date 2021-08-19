import React from "react";
import { Redirect, Route } from "react-router-dom";
import Service from "../services/authService";

export const AdminRoute = ({ component: Component, ...rest }) => {
    const user = Service.getCurrentUser();
    return (
        <Route {...rest}
            render={props =>
                ( user && user.role === 'admin') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )} />
    )
};