import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Thumbnail,
  Body,
  Left,
  List,
  ListItem, Item, Input, Button
} from 'native-base';
import {useEffect, useState} from "react";
import {Div} from "react-native-magnus";
import {Creancier} from "../entities/creancier";
import images from "../images";
import {bindActionCreators} from "redux";
import {getCreanciers} from "../redux/actions/creanciers-actions";
import {connect} from "react-redux";
import {fetchAllCreanciers} from "../services/factures-service";
import {fetchComptes} from "../services/form-service";
import {getComptes} from "../redux/actions/compte-actions";
import {Client} from "../entities/client";
import {Compte} from "../entities/compte";
import {getPayments} from "../redux/actions/payement-actions";
import {fetchPayment} from "../services/payment-service";
import {Payment} from "../entities/payment";

const ComptesList = ({navigation, comptes , fetchComptes }: any) => {

  useEffect(
      () => {
        fetchComptes().then(()=> console.log("Fetch Comptes ", comptes))
            .catch((e:any)=> console.log("Error", e));
      }, []);


  return <Container>
    <Content padder>

      <Card>
        <CardItem>
          <Left>
            <Image style={styles.thumbnail} source={require('../assets/icons/account.png')} />
            <Body>
              <Text style={styles.title}>Les Comptes</Text>
              <Text note style={styles.dispo}>Votre comptes disponble. </Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
      <Div style={{height: 20}}/>
      {comptes && comptes.length === 0 && <Text style={{textAlign: 'center'}}>
        Aucun comptes ajouté.
      </Text>}
      <List style={styles.list}>
        {comptes && comptes.map((compte: Compte, key: any) =>
            <ListItem button key={key}
                      onPress={() => navigation.push('CompteScreen', {compte, navigate: navigation.navigate})}>
              <Left>
                <Image style={styles.logo} source={require('../assets/icons/wallet.png')} />
                <Body>
                  <Text style={styles.titleCreancier}>{compte.numeroCompte}</Text>
                  <Text note style={styles.sous}>{compte.intitule} </Text>
                </Body>
              </Left>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
        )}
      </List>
    </Content>
  </Container>
}

const mapStateToComptesListProps = (state: any) => ({
  comptes: state.client.comptes
});

const mapDispatchToComptesProps = (dispatch: any) => (
    bindActionCreators({
      getComptes,
    }, dispatch)
);

export const ComptesListState = connect(mapStateToComptesListProps, {fetchComptes})(ComptesList);

const CompteInfo = (props: any) => {
  const compte = props.route.params.compte as Compte

  useEffect(
      () => {
        props.fetchPayment(compte.numeroCompte).then(
        )},[])

  // console.log(props.payments)
  console.log(compte)


  // @ts-ignore
  return <Container>

    <Content padder>

      <Card>
        <CardItem>
          <Left>
            <Image style={styles.thumbnail} source={require('../assets/icons/account.png')} />
            <Body>
              <Text style={styles.title}> № : {compte.numeroCompte}</Text>
              <Text note style={styles.dispo}>{compte.intitule}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
      <Div style={{height: 20}}/>

      <List style={styles.list}>
        <Card>
            <ListItem>
              <Left>
                <Image style={styles.logo} source={require('../assets/icons/wallet.png')} />
                  <Text style={styles.titleCreancier}>Solde</Text>
              </Left>
              <Right>
                <Text style={styles.titleCreancier}> {compte.soldeFinal}</Text>
                <Text note style={styles.sous}>dh</Text>
              </Right>
            </ListItem>
        </Card>
        <Card>
          <CardItem>
          <Left>
            <Image style={styles.logo} source={require('../assets/icons/payement.png')} />
            <Body>
              <Text style={styles.payement}>Ancien paiement: </Text>
              {/*<Text note style={styles.sous}></Text>*/}
            </Body>
          </Left>
          <Right>
            <Icon name="arrow-down"/>
          </Right>
          </CardItem>
        </Card>
        <Div style={{height: 20}}/>
        {props.payments && props.payments.length === 0 && <Text style={{textAlign: 'center'}}>
          Aucun paiement ajouté.
        </Text>}
        <List style={styles.list}>
          {props.payments && props.payments.map((payment: Payment, key: any) =>
              <ListItem >
                <Left>
                  <Image style={styles.logo} source={require('../assets/icons/transfer.png')} />
                  <Body>
                    <Text  style={styles.titleCreancier}>{payment.date}</Text>
                  </Body>
                </Left>
                <Right>
                  <Body>
                    {payment.soldeFacture && payment?.soldeFacture <= 0 &&
                    <Text note style={{color: 'red',fontWeight:'bold'}}> {payment.soldeFacture} dh</Text>}
                    {payment.soldeFacture && payment?.soldeFacture >0 &&
                    <Text note style={{color: 'green',fontWeight:'bold'}}>+{payment.soldeFacture} dh</Text>}
                  </Body>
                </Right>
              </ListItem>
          )}
        </List>

      </List>
    </Content>
  </Container>
}

const mapStateToPaymentListProps = (state: any) => ({
  payments: state.client.payments
});

export const CompteListState = connect(mapStateToPaymentListProps, {fetchComptes,fetchPayment})(CompteInfo);


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
