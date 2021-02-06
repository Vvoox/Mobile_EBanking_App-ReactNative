import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
    BottomTabParamList,
    AcceuilParamList,
    ProfilParamList,
    FacturesParamList, ComptesParamList
} from '../types';
import AcceuilScreen from "../views/AcceuilScreen";
import FormScreen from "../views/FormScreen";

import ProfilScreen from "../views/ProfilScreen";
// import FacturesScreen from "../views/FacturesScreen";
import {CompteListState, ComptesListState} from "../views/ComptesScreen";
import {CreancesListState, CreancierListState, FactureDetailState, FacturesListState} from "../views/FacturesScreen";
import {Icon} from "native-base";
import ActionBarImage from "../views/ActionBarImage";
import ActionBarLogOut from "../views/ActionBarlogOut";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();


  return (

    <Tab.Navigator
      initialRouteName="Accueil"
      // tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>

      >
        <Tab.Screen
            name="Accueil"
            component={AcceuilNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            }}
        />
      <Tab.Screen
        name="Profil"
        component={ProfilNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
        <Tab.Screen
            name="Comptes"
            component={ComptesNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="wallet" color={color} />,
            }}
        />
      <Tab.Screen
        name="Factures"
        component={FacturesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="clipboard" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const AcceuilStack = createStackNavigator<AcceuilParamList>();

function AcceuilNavigator() {
    return (
        <AcceuilStack.Navigator
            // screenOptions={{headerLeft: () => <ActionBarImage />}}
            screenOptions={{headerRight: () => <ActionBarLogOut />,headerLeft: () => <ActionBarImage />}}
        >
            <AcceuilStack.Screen
                name="AcceuilScreen"
                component={AcceuilScreen}
                options={{ headerTitle: 'Acceuil' }}

            />
        </AcceuilStack.Navigator>
    );
}

const ProfilStack = createStackNavigator<ProfilParamList>();

function ProfilNavigator() {
    return (
        <ProfilStack.Navigator
            screenOptions={{headerRight: () => <ActionBarLogOut />,headerLeft: () => <ActionBarImage />}}
        >
            <ProfilStack.Screen
                name="ProfilScreen"
                component={ProfilScreen}
                options={{ headerTitle: 'Profil' }}
            />
        </ProfilStack.Navigator>
    );
}

const FacturesStack = createStackNavigator<FacturesParamList>();

function FacturesNavigator() {
    return (
        <FacturesStack.Navigator
            screenOptions={{headerRight: () => <ActionBarLogOut />}}
        >
            <FacturesStack.Screen
                name="FacturesScreen"
                component={CreancierListState}
                options={{ headerTitle: 'Creanciers',headerLeft:()=><ActionBarImage /> }}
            />
            <FacturesStack.Screen
                name="CreancesScreen"
                component={CreancesListState}
                options={{ headerTitle: 'Creances' }}
            />
            <FacturesStack.Screen
                name="FactureScreen"
                component={FacturesListState}
                options={{ headerTitle: 'Factures' }}
            />
            <FacturesStack.Screen
                name="FactureDetail"
                component={FactureDetailState}
                options={{ headerTitle: 'Facture' }}
            />
        </FacturesStack.Navigator>
    );
}


const ComptesStack = createStackNavigator<ComptesParamList>();

function ComptesNavigator() {
    return (
        <ComptesStack.Navigator
            screenOptions={{headerRight: () => <ActionBarLogOut />}}
        >
            <ComptesStack.Screen
                name="ComptesScreen"
                component={ComptesListState}
                options={{ headerTitle: 'Comptes' ,headerLeft:()=><ActionBarImage />}}
            />
            <ComptesStack.Screen
                name="CompteScreen"
                component={CompteListState}
                options={{ headerTitle: 'Compte' }}
            />
        </ComptesStack.Navigator>
    );
}