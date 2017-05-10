import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />}
  />
)
