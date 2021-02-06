import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../views/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import {Provider} from "react-redux";
// import {store} from "../App";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../redux/reducers";
import thunk from "redux-thunk";
import {LoginView} from "../views/LoginScreen";
import {authState, keycloak, login} from "../services/auth.service";
import {useEffect, useState} from "react";
import {KeycloakProvider, useKeycloak} from 'expo-keycloak';
import {Image, StyleSheet} from "react-native";


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export const store = createStore(rootReducer, applyMiddleware(thunk));
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  // return (
  //   <NavigationContainer
  //     linking={LinkingConfiguration}
  //     theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  //       <Provider store={store}>
  //           <RootNavigator />
  //       </Provider>
  //
  //   </NavigationContainer>
  // );
    return (
        <KeycloakProvider{...keycloak}>
            <NavigationContainer>
        <Provider store={store}>
            {/*<AppearanceProvider>*/}
            <RootNavigator/>
            {/*</AppearanceProvider>*/}
        </Provider>
            </NavigationContainer>

        </KeycloakProvider>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
    const colorScheme = useColorScheme();

    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle =
        colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const {
        ready, // If the discovery is already fetched
        login, // The login function - opens the browser
        isLoggedIn, // Helper boolean to use e.g. in your components down the tree
        token, // Access token, if available
        logout, // Logs the user out
    } = useKeycloak();
    const [authenticated, setAuthenticated] = useState(isLoggedIn);


    useEffect(() => {
        setAuthenticated(isLoggedIn);
        authState.token = token;
    }, [isLoggedIn, token, ready]);

    const handleLogout = () => {
        logout();
    }
  return !authenticated ? <LoginView login={login}/> :
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightContainer: {
        backgroundColor: '#D0D0C0',
    },
    darkContainer: {
        backgroundColor: '#242C40',
    },
    lightThemeText: {
        color: '#242C40',
    },
    darkThemeText: {
        color: '#D0D0C0',
    },
});
