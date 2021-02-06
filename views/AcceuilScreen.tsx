import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {  View } from '../components/Themed';
import {Body, Text ,Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right} from "native-base";
import {Compte} from "../entities/compte";
import {useEffect, useState} from "react";
import {Div} from "react-native-magnus";
import {Payment} from "../entities/payment";
import {connect} from "react-redux";
import {fetchComptes} from "../services/form-service";
import {fetchPayment} from "../services/payment-service";
import {useKeycloak} from "expo-keycloak";
import {loadUserInfo} from "../services/auth.service";


export default function AcceuilScreen (props: any) {
  // const compte = props.route.params.compte as Compte
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


  return <Container>
    <Content padder>
      <Card>
        <CardItem>
          <Left>
            <Image style={styles.thumbnail} source={require('../assets/icons/user.png')} />
            <Body>
              <Text style={styles.title}> Bonjour {currentUser.family_name}</Text>
              <Text note style={styles.dispo}>{currentUser.preferred_username}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
      <Div style={{height: 20}}/>

      <List style={styles.list}>

        <Card>
          <CardItem>
            <Left>
              <Image style={styles.logo} source={require('../assets/icons/tasks.png')} />
              {/*<Body>*/}
                <Text style={styles.dispo}>Les activités anciennes: </Text>
                {/*<Text note style={styles.sous}></Text>*/}
              {/*</Body>*/}
            </Left>
            <Right>
              <Icon name="arrow-down"/>
            </Right>
          </CardItem>
        </Card>

      </List>
    </Content>
  </Container>
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
    color:"black"
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
    fontSize:18,
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