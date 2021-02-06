import {View } from '../components/Themed';
import React, {useEffect, useState} from "react";
import {loadUserInfo} from "../services/auth.service";
import {
    ActionSheet,
    Body,
    Button, Card,
    CardItem,
    Container,
    Content,
    Left,
    ListItem, Right,
    Subtitle,
    Text,
    Title
} from 'native-base';
import {useKeycloak} from "expo-keycloak";
import {Div} from "react-native-magnus";
import {Image, StyleSheet} from "react-native";
import {config} from "../constants/api";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import FormScreen from "../views/FormScreen";
import {Client} from "../entities/client";

export default function ProfilScreen(props: any) {
      const [currentUser, setCurrentUser] = useState({} as any);
      const {
          ready,
          login,
          isLoggedIn,
          token,
          logout,
      } = useKeycloak();
      useEffect(() => {
              if (ready)
                  loadUserInfo(token)
                      .then(response =>
                      {
                          setCurrentUser(response.data)
                          console.log(response.data)

                      }
                      )
          }
          , [ready]);
  return (
    // <View style={styles.container}>
      <Container>
        <Content padder>
            <Card>
                <CardItem>
                    <Left>
                        <Image style={styles.thumbnail} source={require('../assets/icons/profile1.png')} />
                        <Body>
                            <Text style={styles.title}>Votre Profil</Text>
                            <Text note style={styles.dispo}>Les informations personnels</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
            <Card>
                <ListItem>
                    <Left>
                        <Image style={styles.logo} source={require('../assets/icons/name.png')} />
                        <Text style={styles.titleCreancier}>Prénom et Nom : </Text>
                    </Left>
                    <Text style={styles.sous}> {currentUser.name}</Text>
                </ListItem>
                <ListItem>
                    <Left>
                        <Image style={styles.logo} source={require('../assets/icons/email.png')} />
                        <Text style={styles.titleCreancier}>Email : </Text>
                    </Left>
                        <Text style={styles.sous}> {currentUser.email}</Text>
                </ListItem>
                <ListItem>
                    <Left>
                        <Image style={styles.logo} source={require('../assets/icons/phone.png')} />
                        <Text style={styles.titleCreancier}>Téléphone : </Text>
                    </Left>
                    <Text style={styles.sous}> {currentUser.preferred_username}</Text>
                </ListItem>
            </Card>

            <Button style={{ width: '100%',backgroundColor:'#b7b5b5', display: 'flex',marginTop:"10%", alignItems: 'center', justifyContent: 'center' }} warning
                    onPress={() => props.route.params.navigate('FormScreen',)}>
                <Text style={{ textAlign: 'center',color:"#997118" }}>
                    Voir Tous Les Factures
                </Text>
            </Button>
           
            <Button style={{ width: '100%', backgroundColor:'#b7b5b5',display: 'flex',marginTop:"5%", alignItems: 'center', justifyContent: 'center' }} primary
             onPress={() => WebBrowser.openBrowserAsync(`${config.AUTH_SERVER}/realms/ensapay/account`)} >
                <Text style={{ textAlign: 'center',color:"#4c7586" }}>
                    Modifier vos informations
                </Text>
            </Button>

            <Button style={{ width: '100%',backgroundColor:'#b7b5b5', marginTop:"5%", display: 'flex' ,alignItems: 'center', justifyContent: 'center' }} danger  onPress={() => {logout()}}>
                <Text style={{ textAlign: 'center' ,color:"#794343"}}>
                    Deconnexion
                </Text>
            </Button>

        </Content></Container>
    // </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight : 20,
        resizeMode : "contain"
        // objectFit : "cover"
    }, list: {
        marginTop:10
    },thumbnail: {
        height:60,
        width:60,
        resizeMode : "contain"

    },
    posMontant:{
        color: 'green'
    },
    dispo: {
        fontFamily: "Cochin",
        color: 'gray',
        fontSize:15,
        marginTop:10,
        fontWeight: 'bold'
    },
    sous: {
        fontFamily: "Cochin",
        color: 'gray',
    },
    titleCreancier: {
        fontSize: 17,
        fontWeight: 'bold',
    },payement: {
        fontSize: 15,
    },
});
