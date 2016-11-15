'use strict';

//var React = require('React');
import React, { Component } from 'react';

import Navigator from './navigator';

import {AppState, StyleSheet, View, StatusBar} from 'react-native';

var { connect } = require('react-redux');

export default class App extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    translucent={true}
                    backgroundColor="rgba(0, 255, 255, 0.8)"
                    barStyle="default"
                    />
                <Navigator />
            </View>
        );
    }

};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});

function select(store) {
    return {

    };
}


module.exports = connect(select)(App);