import {
    View,
    AppRegistry
} from 'react-native';

import React, {Component} from 'react';

import { Provider } from 'react-redux';
import Chat from './app/containers/MainChat';
import style from './app/styles';
import store from './app/store';

import Setup from './app/setup';

export default class messenger extends React.Component{
  constructor() {
    super();
    console.log('test')
  }



  render() {
    return (
      <Provider store={store}>
        <Chat />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('messenger', () => messenger);
