'use strict';

var React = require('React');
var Platform = require('Platform');
var StyleSheet = require('StyleSheet');
//var { Text } = require('F8Text');
import { Text } from 'react-native'
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Image = require('Image');
var ToolbarAndroid = require('ToolbarAndroid');

import Icon from 'react-native-vector-icons/Ionicons';

import {StatusBar, PixelRatio} from 'react-native';



class F8HeaderAndroid extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {leftItem, rightItem, extraItems} = this.props;
        let actions = [];
        if (rightItem) {
            const {title, icon, layout} = rightItem;
            actions.push({
                icon: layout !== 'title' ? icon : undefined,
                title: title,
                show: 'always',
            });
        }
        if (extraItems) {
            actions = actions.concat(extraItems.map((item) => ({
                title: item.title,
                show: 'never',
            })));
        }

        const textColor = this.props.foreground === 'dark'
            ? '#000000'
            : 'white';

        let content;
        if (React.Children.count(this.props.children) > 0) {
            content = (
                <View collapsable={false} style={{flex: 1}}>
                    {this.props.children}
                </View>
            );
        }

        return (
            <View style={[styles.toolbarContainer, this.props.style]}>
                <ToolbarAndroid
                    navIcon={leftItem && leftItem.icon}
                    onIconClicked={leftItem && leftItem.onPress}
                    title={this.props.title}
                    titleColor={textColor}
                    subtitleColor={textColor}
                    actions={actions}
                    onActionSelected={this.handleActionSelected.bind(this)}
                    style={styles.toolbar}>
                    {content}
                </ToolbarAndroid>
            </View>
        );
    }

    handleActionSelected(position: number) {
        let items = this.props.extraItems || [];
        if (this.props.rightItem) {
            items = [this.props.rightItem, ...items];
        }
        const item = items[position];
        item && item.onPress && item.onPress();
    }
}


class F8HeaderIOS extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {leftItem, title, rightItem, foreground, rightItemColor, notificationsCounter} = this.props;
        const titleColor = rightItemColor ? rightItemColor : foreground === 'dark' ? '#D53E3D' : 'white';
        const itemsColor = rightItemColor ? rightItemColor : foreground === 'dark' ? '#000000' : 'white';
        const headerStyle = this.props.blue ? styles.blueHeader : styles.header;
        const titleStyle = this.props.blue ? styles.blueHeaderTitle : styles.titleText;
        const statusBarStyle = this.props.blue ? 'light-content' : 'default';
        const content = React.Children.count(this.props.children) === 0
            ?
            <Text style={[titleStyle, {color: titleColor}]}>
                {title}
            </Text>
            :
            this.props.children;
        Platform.OS === 'ios' ? StatusBar.setBarStyle(statusBarStyle): null;
        return (
            <View style={[headerStyle, this.props.style]}>
                <StatusBar hidden={this.props.showStatusBar}/>
                <View style={styles.leftItem}>
                    <ItemWrapperIOS color={itemsColor} item={leftItem} />
                </View>
                <View
                    accessible={true}
                    accessibilityLabel={title}
                    accessibilityTraits="header"
                    style={styles.centerItem}>
                    {content}
                </View>

                <View style={styles.rightItem}>
                    <ItemWrapperIOS color={itemsColor} item={rightItem} />
                </View>
                {this.props.notificationsCounter > 0 ? <View style={styles.notifications}><Text style={styles.notificationText}>{this.props.notificationsCounter}</Text></View>: null}
            </View>
        );
    }

}

class ItemWrapperIOS extends React.Component {
    render() {
        const {item, color} = this.props;
        if (!item) {
            return null;
        }

        let content;
        const {title, icon, image, layout, onPress} = item;

        if (layout !== 'icon' && title) {
            content = (
                <Text style={[styles.itemText, {color}, {paddingLeft:0,textAlign:'center', justifyContent:'center', alignSelf:'center', fontSize: PixelRatio.get() <= 2 ? 14 : 17}]}>
                    {title}
                </Text>
            );
        } else if (image) {
            content = <Image source={image} />;
        }
        else if (icon) {
            content = (
                <View  style={{flex:1,flexDirection:'row', alignSelf:'flex-start'}}>
                    <Text style={[styles.itemText, {color}]}>
                        {icon}
                    </Text>
                    <Text style={[styles.itemText, {color}, {paddingLeft:6,textAlign:'center', justifyContent:'center', alignSelf:'center', fontSize:17}]}>
                        {title ? title : null}
                    </Text>

                </View>

            );
        }

        return (
            <TouchableOpacity
                accessibilityLabel={title}
                accessibilityTraits="button"
                onPress={onPress}
                style={styles.itemWrapper}>
                {content}
            </TouchableOpacity>
        );
    }
}


var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
//var STATUS_BAR_HEIGHT = 20;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;
//var HEADER_HEIGHT = 44 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
    toolbarContainer: {
        paddingTop: STATUS_BAR_HEIGHT,
    },
    toolbar: {
        height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    },
    notifications:{
        position: 'absolute',
        right: 20,
        width: 20,
        height: 20,
        borderRadius: 20/2,
        backgroundColor: 'red',

    },
    notificationText:{
        textAlign: 'center',
        marginTop: 2,
        backgroundColor: 'transparent',

        color: 'white'
    },
    header: {
        backgroundColor: 'transparent',
        //paddingTop: STATUS_BAR_HEIGHT,
        //height: HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    blueHeader: {
        backgroundColor: 'rgb(0,164,220)',
        paddingTop: STATUS_BAR_HEIGHT,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    blueHeaderTitle: {
        color: 'white',
        fontFamily: 'Lato-Bold',
        fontSize: 13 ,
        textAlign: 'center'
    },
    titleText: {
        color: 'white',
        //fontWeight: 'bold',
        fontSize: 13 * 1.2,
        textAlign: 'center'

    },
    leftItem: {
        flex: 1,
        alignItems: 'flex-start',
        //alignItems: 'center',

    },
    centerItem: {
        flex: 2,
        alignItems: 'center',
    },
    rightItem: {
        flex: 1,
        alignItems: 'flex-end',
    },
    itemWrapper: {
        //padding: 11,
        paddingLeft:11,
        paddingRight:11,
    },
    itemText: {
        letterSpacing: 1,
        fontSize: 12,
        color: 'white',
    },
});

//const Header = Platform.OS === 'ios' ? F8HeaderIOS : F8HeaderAndroid;
const Header = F8HeaderIOS;
Header.height = HEADER_HEIGHT;


module.exports = Header;