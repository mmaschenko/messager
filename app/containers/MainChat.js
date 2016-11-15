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

let Log = require('../components/Log');
let AuthorEntry = require('../components/AuthorEntry');
let MessageEntry = require('../components/MessageEntry');

var ImagePicker = require('react-native-image-picker');
const {height, width} = Dimensions.get('window');

class Chat extends Component {
  constructor(props) {
    super(props);

  }

  _onAuthorSubmit(name) {
    this.props.userActions.createUser({name});
  }

  _onMessageSubmit(text, attachment) {
    if ((!this.props.author || !text ) || (!this.props.author || !text)  ) return;

    this.props.chatActions.createMessage(this.props.author ? this.props.author : 'Tester', text, attachment);
  }

  _onImagePick(){
    ImagePicker.showImagePicker({
      allowsEditing: true,
      maxHeight: 95,
      maxWidth: 95
    },(response) => {
      if (typeof response.data === "undefined"){
        return;
      }
      this._onMessageSubmit(null, {image: response.data})
    });
  }

  nextButton(){
    return {
      layout:'icon',
      icon: <Icon name="plus-square" size={30} color="#D53E3D"/>,
      onPress: () => {Actions.chat_list()}
    }
  }



  render() {
    let screen;

    if (!this.props.author.name) {
      screen = (<AuthorEntry onSubmit={(author) => this._onAuthorSubmit(author)}/>);
    } else {
      screen = (
        <View style={{flex:1}}>
          <Header foreground={'dark'} title="MAIN CHAT" rightItemColor="#D53E3D" rightItem={this.nextButton()}></Header>
          <Log messages={this.props.messages} main_user={this.props.author.name}/>
          <MessageEntry onAttachmentAdd={this._onImagePick} onSubmit={(message) => this._onMessageSubmit(message)} />
        </View>
      );
    }

    return (
      <View {...style('page')}>
        {screen}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.chat,
    author: state.user
  };
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
)(Chat);