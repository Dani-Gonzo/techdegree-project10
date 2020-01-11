import React from 'react';
import { Redirect } from 'react-router-dom';
import {Consumer} from './Context';

export default () => {
  
  return (
    <Consumer>
      {context => {
        context.actions.signOut();
        return (
          <Redirect to="/" />
        )
      }}
    </Consumer>
  );
}