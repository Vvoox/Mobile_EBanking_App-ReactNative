import { useKeycloak } from "expo-keycloak";
import React, { useState } from "react";
import {Text, View, StyleSheet, TextInput, ActivityIndicator, Image, ImageBackground} from "react-native";
import { Div } from "react-native-magnus";
import {keycloak, login} from "../services/auth.service";
import {AuthSession} from "expo/build/removed.web";
import {Button, Card, Icon, Left, Right} from "native-base";

const initialState = {
  username: "",
  password: "",
};

export const LoginView = (props: any) => {
  const [credentials, setCredentials] = useState(initialState);
  const {ready, login, isLoggedIn, token, logout,} = useKeycloak();
  if (!ready) return <ActivityIndicator />;
  const handleLogin = async () => {
    props.login();
  };

  return (
  <View style={styles.container1}>
    <ImageBackground source={require('../assets/images/background.jpeg')} style={styles.image}>
      <Text style={styles.text}>Bienvenue à ENSAPAY</Text>
      <Button style={styles.mainButton}  onPress={handleLogin} >
        <Text style={styles.connect}>Se connecter</Text>
        <Icon name="arrow-forward"/>
      </Button>
    </ImageBackground>
  </View>



  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginRight:20,
    marginLeft:20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '30%',
  },
  inputField: {
    width: "80%",
    backgroundColor: "#eee",
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
    fontSize: 18,
  },
  mainButton: {
    width: "79%",
    color:"white",
    // backgroundColor: "blue",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    padding: 20,
    marginLeft:40,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  container1: {
    flex: 1,
    flexDirection: "column"
  },
  loginButton: {
    backgroundColor: 'blue',
    color: 'white',
    resizeMode: "cover",

  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "black",
    fontSize: 35,
    fontWeight: "900",

    // textAlign: "center",
    // backgroundColor: "#000000a0",
    marginLeft:20,
    marginRight:40,
    // fontFamily:'Futura-Medium',
    marginBottom:380
  },
  connect: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginLeft:40,
    marginRight:40,


  }
});
