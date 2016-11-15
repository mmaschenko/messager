'use strict';

import React, { Component } from 'react';

import { Platform, BackAndroid, Navigator, StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';

import MainScreen from './containers/MainChat';
import ChatList from './containers/ChatList';

import {Actions, Scene, Router, ActionConst} from 'react-native-router-flux';


const scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        <Scene key="main" component={MainScreen} initial={true}/>
        <Scene key="chat_list" component={ChatList}/>
    </Scene>
);


class AppNavigator extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return <Router isLoggedIn={this.props.isLoggedIn} token={this.props.token} dispatch={this.props.dispatch} style={styles.container} scenes={scenes}/>
    }
}
AppNavigator.childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    }
});

function select(store) {
    return {
        //token:store.auth.token,
        //isLoggedIn: store.auth.isLoggedIn
    };
}

module.exports = connect(select)(AppNavigator);