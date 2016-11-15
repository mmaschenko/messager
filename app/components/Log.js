import React, {Component} from 'react';
import {View, Image, Text, ScrollView, StatusBar, Dimensions} from 'react-native';
let { style } = require('../styles');

const {height, width} = Dimensions.get('window');

class Log extends Component {
  constructor(props) {
    super(props);
  }

  _renderUploadImage(image){
    if (image){
      const imageSource = "data:image/png;base64,"+ image;
      return(
          <Image source={{uri: imageSource}} style={Content.imagePickUp.selectedImage}/>
      )
    }else{
      return null
    }
  }

  render() {
    if (!this.props.messages || !this.props.messages.length) {
      return this._renderEmptyMessage();
    }

    return (
      <ScrollView 
        automaticallyAdjustContentInsets={false}
        {...style('log')}
        scrollEventThrottle={200}>
        <View>
          {this.props.messages.map((message, i)=>{
            if (message.text){
              return(
                  <View key={i} style={{height: 40, flex: 1, alignItems: this.props.main_user !== message.author.name ? 'flex-end' : 'flex-start'}}>
                    <Text>{message.author.name ? message.author.name: 'TESTER' } says {message.text}</Text>
                  </View>
              )
            }else if (message.attachment){
                 return (
                     <View key={i} style={{height: 120, flex: 1, alignItems: this.props.main_user !== message.author.name ? 'flex-end' : 'flex-start'}}>
                       <Text>{message.author.name ? message.author.name: 'TESTER' } added image</Text>
                       <View style={Content.imagePickUp.imagePickContainer}>
                         {this._renderUploadImage(message.attachment.image)}
                       </View>
                     </View>
                 )
            }
          })}
        </View>
      </ScrollView>
    );
  }

  _renderEmptyMessage() {
    return (
      <View {...style('log')}>
        <Text>There are currently no messages.</Text>
      </View>
    );
  }
}

const Content = {
  imagePickUp: {
    container: {
      height: 110,
      width: width,
      borderBottomWidth: 1,
      borderBottomColor: 'rgb(232,232,232)',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 28
    },
    imagePickContainer: {
      height: 96,
      width: 96,
      borderRadius: 48,
      borderColor: 'rgb(1,162,217)',
      borderWidth: 1,
      marginLeft: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    selectedImage: {
      height: 95,
      width: 95,
      borderRadius: 5
    },
  }
};

module.exports = Log;