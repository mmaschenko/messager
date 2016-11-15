import React, {Component} from 'react';
import {View, Image, Text, TextInput, ScrollView, StatusBar, Dimensions, TouchableHighlight, Animated, TouchableOpacity, Platform} from 'react-native';
let { style, colors } = require('../styles');
import Icon from 'react-native-vector-icons/FontAwesome';

class AuthorEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  _onPress() {
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <View>
        <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
          <TouchableOpacity style={{width: 40, height: 40}} onPress={()=>this.props.onAttachmentAdd()}>
            <Icon name="plus-square" size={30} color="#900" style={{marginTop: 5, marginLeft: 5}}/>
          </TouchableOpacity>
          <TextInput
              style={{height: 40, width: 260, borderWidth: 1, borderColor: 'red', paddingLeft: 10}}
              value={this.state.text}
              placeholder='Enter your message'
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ text })}
              />
        </View>
        <TouchableHighlight
          onPress={() => this._onPress()}
          {...style('button')}
          underlayColor={colors.primaryHighlight}>
          <Text {...style('buttonLabel')}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

AuthorEntry.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

module.exports = AuthorEntry;