import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

import { bindActionCreators } from 'redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { style } from '../styles';
import  Header  from '../common/header';

const UserActions = require('../actions/user');
const ChatActions = require('../actions/chat');
//import {createMessage} from '../actions/chat';

let Log = require('../components/Log');
let AuthorEntry = require('../components/AuthorEntry');
let MessageEntry = require('../components/MessageEntry');

var ImagePicker = require('react-native-image-picker');
const {height, width} = Dimensions.get('window');

class ChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    nextButton(){
        return {
            layout:'icon',
            icon: <Icon name="plus" size={30} color="#1FA7DD"/>,
            onPress: () => {Actions.chat_list()}
        }
    }



    render() {
        let screen;

        screen = (
            <View style={{flex:1}}>
                <Header foreground={'dark'} title="CHAT LIST" rightItemColor="#01A4DD" rightItem={this.nextButton()}></Header>
                <View>
                    <Text>Chat list</Text>
                </View>
            </View>
        );

        return (
            <View {...style('page')}>
                {screen}
            </View>
        );
    }
}

//function mapStateToProps(state) {
//    return {
//        messages: state.chat,
//        author: state.user,
//    };
//}


function mapStateToProps(store) {
    const { messages } = store.chat;
    const { author } = store.user;
    return {
        messages,
        author
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chatActions: bindActionCreators(ChatActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch)
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatList);