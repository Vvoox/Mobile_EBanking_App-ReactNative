import React from 'react';

import {View, Image, TouchableHighlight} from 'react-native';
import {useKeycloak} from "expo-keycloak";

const ActionBarLogOut = () => {
    const {
        ready,
        login,
        isLoggedIn,
        token,
        logout,
    } = useKeycloak();
    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableHighlight onPress={() => logout()}>
            <Image
                source={require('../assets/icons/logout.png')}
                style={{
                    width: 30,
                    height: 30,
                    // borderRadius: 40 / 2,
                    marginRight: 15,
                    // resizeMode : "contain"

                }}
            />
            </TouchableHighlight>
        </View>
    );
};

export default ActionBarLogOut;