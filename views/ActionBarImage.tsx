import React from 'react';

import {View, Image, TouchableHighlight} from 'react-native';
import AcceuilScreen from "./AcceuilScreen";

const ActionBarImage = (navigation:any) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {/*<TouchableHighlight onPress={() => AcceuilNavigator()}>*/}
            <Image
                source={require('../assets/icons/bank.png')}
                style={{
                    width: 30,
                    height: 30,
                    // borderRadius: 40 / 2,
                    marginLeft: 15,
                    // resizeMode : "contain"

                }}
            />
            {/*</TouchableHighlight>*/}
        </View>
    );
};

export default ActionBarImage;