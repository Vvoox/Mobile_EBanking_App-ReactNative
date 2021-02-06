
import React, {useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet, View, Image} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {Container, Header, Content, Card, CardItem, Text, Icon, Right, Thumbnail, Body} from 'native-base';
import { Table, Row, Rows } from 'react-native-table-component';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import Modal from 'react-native-modal';
import {
  ActionSheet,
  Button,
  Form,
  Input,
  Item,
  Label,
  Left,
  List,
  ListItem,
  Picker,
  Subtitle,
  Title
} from "native-base";
import {Compte} from "../entities/compte";
import {Div} from "react-native-magnus";
import {connect, Provider} from 'react-redux';
import {bindActionCreators} from "redux";
import {useKeycloak} from "expo-keycloak";
import {Client} from "../entities/client";
import {CreancierActions} from "../redux/reducers/creancier-reducer";
// import {fetchCreanciers} from "../services/creanciers-service";
// import {fetchAllCreanciers, fetchCreancier} from "../services/factures-service";
import {Creancier} from "../entities/creancier";
import {applyMiddleware, createStore} from 'redux';
import rootReducer from "../redux/reducers";
import thunk from "redux-thunk";
import {getCreanciers} from "../redux/actions/creanciers-actions";
import {green50} from "react-native-paper/lib/typescript/styles/colors";
import images from '../images'
import {Creance} from "../entities/creance";
import {checkFacture, fetchAllCreanciers, fetchCreancier, fetchFactures} from "../services/factures-service";
import {fetchCreanciers} from "../services/creanciers-service";
import {Facture} from "../entities/facture";
import {getFactures} from "../redux/actions/factures-actions";
import image from "../image";
import RNPickerSelect from 'react-native-picker-select';
import {fetchComptes} from "../services/comptes-service";


const CreanciersList = ({navigation, creanciers , fetchAllCreanciers }: any) => {
  const img: {[index: string]:any} = images

  useEffect(
      () => {
        fetchAllCreanciers().then(()=> console.log("Fetched Creanciers", creanciers))
            .catch((e:any)=> console.log("Error", e));
      }, []);
  return <Container>
    <Content padder>

      <Card>
      <CardItem>
        <Left>
          <Thumbnail style={styles.thumbnail} source={require('../assets/icons/services.png')} />
          <Body>
              <Text style={styles.title}>Les Creanciers</Text>
              <Text note style={styles.dispo}>Notre service externe desponible que vous pouvez obtenir votre facture et le payer. </Text>
          </Body>
        </Left>
      </CardItem>
        </Card>
      <Div style={{height: 20}}/>
      {creanciers && creanciers.length === 0 && <Text style={{textAlign: 'center'}}>
        Aucun creancier ajouté.
      </Text>}
        <List style={styles.list}>
        {creanciers && creanciers.map((creancier: Creancier, key: any) =>
            <ListItem button key={key}
                      onPress={() => navigation.push('CreancesScreen', {creancier, navigate: navigation.navigate})}>
            <Left>
              {creancier.codeCreancier &&
                <Image style={styles.logo} source={img[creancier.codeCreancier].uri} />

              }
              <Body>
                <Text style={styles.titleCreancier}>{creancier.name}</Text>
                <Text note style={styles.sous}>{creancier.codeCreancier}</Text>
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

const mapStateToCreanciersListProps = (state: any) => ({
    creanciers: state.client.creanciers
});


export const CreancierListState = connect(mapStateToCreanciersListProps, {fetchAllCreanciers})(CreanciersList);

const CreancesList = (props:any) => {
  const creancier = props.route.params.creancier as Creancier
  console.log(creancier)
  const img: {[index: string]:any} = images
  const imgCreance: {[index: string]:any} = image


  return (<Container>
    <Content padder>
      <Card>
        <CardItem>
          <Left>
            {creancier.codeCreancier &&
              <Thumbnail style={styles.logo} source={img[creancier.codeCreancier].uri} />
            }
            <Body>
              <Text style={styles.title}>{creancier.name?.toUpperCase()}</Text>
              <Text note style={styles.dispo}>Notre creances disponible.</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
      <Div style={{height: 20}}/>
      {creancier.creances && creancier.creances?.length === 0 && <Text style={{textAlign: 'center'}}>
        Aucun creance ajouté.
      </Text>}
      <List style={styles.list}>
        {creancier.creances && creancier.creances?.map((creance: Creance, key: number) =>
            <ListItem button key={key}
                      onPress={() => props.navigation.navigate('FactureScreen',creance)}>
                          {/*.then(()=>props.navigation.navigate('FactureScreen')) }>*/}
              <Left>
                { creance.name && <Image style={styles.logo} source={imgCreance[creance.name].uri} />}
                <Body>
                  <Text style={styles.titleCreancier}>{creance.name?.toLocaleUpperCase()}</Text>
                  <Text note style={styles.sous}>{creance.category}</Text>
                </Body>
              </Left>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
        )}
      </List>


    </Content></Container>)
      ;
}

export const CreancesListState = connect(null, { fetchCreancier,fetchFactures })(CreancesList);

const FactureList = (props:any) => {
  // const creance = props.route.params.creance as Creance
  // console.log(props.route.params.name)

  useEffect(
      () => {
        props.fetchFactures(props.route.params.name)},[])


  return (<Container>
    <Content padder>
      <Card>
        <CardItem>
          <Left>
            <Image style={styles.thumbnail} source={require('../assets/icons/bill.png')} />
            <Body>
              <Text style={styles.title}>Factures</Text>
              <Text note style={styles.dispo}>Votre Factures.</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
      <Div style={{height: 20}}/>
      {props.factures && props.factures.length == 0 && <Text style={{textAlign: 'center'}}>
        Aucune facture ajoutée.
      </Text>}
      <List style={styles.list}>
        {props.factures && props.factures.filter((facture: Facture) => facture.payee == false)
            .map((facture: Facture, key: number) =>
            <ListItem button key={key}
                      onPress={() => props.navigation.navigate('FactureDetail', {facture})}>
              <Left>
                <Image style={styles.facture} source={require('../assets/icons/bill1.png')} />
                <Body>
                  <Text style={styles.titleCreancier}>{facture.creanceId}</Text>
                  <Text note style={styles.sous}>{facture.montant} dh | {facture.dateLimit}</Text>
                </Body>
              </Left>
              <Right>
                <Icon name="arrow-forward"/>
              </Right>
            </ListItem>
        )}
      </List>

    </Content></Container>)
      ;
}

const mapStateToFacturesListProps = (state: any) => ({
  factures: state.client.factures
});

export const FacturesListState = connect(mapStateToFacturesListProps, { fetchFactures })(FactureList);
const selectedItem = {
  title: 'Selected item title',
  description: 'Secondary long descriptive text ...',
};


const FactureDetail = (props:any) => {

  const [isModalVisible, setModalVisible] = useState(false);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const facture = props.route.params.facture as Facture

  useEffect(() => {
    props.fetchComptes().then((response: any) => console.log(response))
  }, [])

  const [compte, setCompte] = useState(props.comptes|| {} as Compte);

  const handleSelectedCompte = (numeroCompte: string) => {
    const selectedComptes = props.comptes?.filter((compte: Compte) => compte.numeroCompte === numeroCompte)[0];
    setCompte(selectedComptes);
  }

  const sendCheckFacture = () =>{
    // setTimeout(toggleModal(),300);
    checkFacture(facture.creanceId,facture.id,selectedValue)
        .then(response => {
          alert("Paiement effectué avec succès. Merci.")
          console.log(response)
          props.navigation.navigate('CreancesScreen')
          setTimeout( () => { toggleModal() }, 5000 );
        })
        .catch(e => {
          alert(JSON.stringify(e.response.data.message))
          console.log(JSON.stringify(e.response.data.message))
          // props.navigation.navigate('CreancesScreen')
          console.log(e.response.data.message)
        })

  }

  const [selectedValue, setSelectedValue] = useState(" ");
  return (<Container>
    <Content padder>
      <Card>
        <CardItem>
          <Left>
            <Image style={styles.thumbnail} source={require('../assets/icons/bill1.png')} />
            <Body>
              <Text style={styles.title}>Facture</Text>
              <Text note style={styles.dispo}>{facture.creanceId}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
      <List style={styles.list}>
            <ListItem >
                <Image style={styles.facture} source={require('../assets/icons/bill1.png')} />
                <Body>
                  <Text style={styles.titleCreancier}> Type : {facture.creanceId}</Text>
                </Body>
            </ListItem>
        <ListItem >
          <Left>
          <Body>
            <Text style={styles.titleCreancier}> Montant: </Text>
            </Body>
          </Left>
          <Body>
            <Text style={styles.factureData}>{facture.montant} dh</Text>
          </Body>
        </ListItem>
        <ListItem >
          <Left>
            <Body>
              <Text style={styles.titleCreancier}> Date Limite: </Text>
            </Body>
          </Left>
          <Body>
              <Text style={styles.factureData}>{facture.dateLimit}</Text>
          </Body>
        </ListItem>
        <ListItem >
          <Left>
            <Body>
              <Text style={styles.titleCreancier}> Frais de pénalité: </Text>
            </Body>
          </Left>
          <Body>
              <Text style={styles.factureData}>{facture.fraisPenalite} dh</Text>

          </Body>
        </ListItem>

        <ListItem >
          <Left>
            <Body>
              <Text style={styles.titleCreancier}> Description: </Text>
            </Body>
          </Left>
          <Body>
              <Text style={styles.factureData}>{facture.description}</Text>
          </Body>
        </ListItem>
        {/*<ListItem >*/}
        {/*  <Left>*/}
        {/*    <Body>*/}
        {/*      <Text style={styles.titleCreancier}> Choisi votre  </Text>*/}
        {/*      <Text style={styles.titleCreancier}> compte: </Text>*/}
        {/*    </Body>*/}
        {/*  </Left>*/}
        {/*  <Body>*/}
        {/*    <Right>*/}
              {/*{!compte.numeroCompte && <Item picker>*/}
              {/*  <Picker*/}
              {/*      mode="dropdown"*/}
              {/*      iosIcon={<Icon name="arrow-down"/>}*/}
              {/*      style={{width: undefined}}*/}
              {/*      placeholder="Selectionner un compte"*/}
              {/*      selectedValue={selectedValue}*/}
              {/*      // onValueChange={handleSelectedCompte}*/}
              {/*      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}*/}

              {/*  >*/}
              {/*    {props.comptes &&*/}
              {/*    props.comptes.map((compte: Compte) =>*/}
              {/*        <Picker.Item label={compte.numeroCompte   ?? ''} value={compte.numeroCompte ?? ''}/>*/}
              {/*    )*/}
              {/*    }*/}
              {/*  </Picker>*/}
              {/*</Item>}*/}
        {/*    </Right>*/}
        {/*  </Body>*/}
        {/*</ListItem>*/}
      </List>
      <Card>

      </Card>
      <Card>
        {/*<Button success iconRight block primary onPress={sendCheckFacture}>*/}
        <Button success iconRight block primary onPress={toggleModal}>
          <Text style={{color:"white"}}>Suivant</Text>
          <Icon name='ios-arrow-forward' style={{color:"white"}}/>
        </Button>
      </Card>
      <View style={{flex: 1}}>
        {/*<Button  onPress={toggleModal} >*/}
        {/*  <Text>Hello</Text>*/}
        {/*</Button>*/}

        <Modal isVisible={isModalVisible}>
          <View style={{flex: 1,backgroundColor:"white"}}>

            <Container>
              <Card>

                <List style={styles.list}>
                  <ListItem>
                <Left>
                  <Image style={styles.thumbnail} source={require('../assets/icons/form.png')} />
                  <Body>
                    <Text style={styles.title}>Formule de paiement</Text>
                    <Text note style={styles.dispo}>{facture.creanceId}</Text>
                  </Body>
                </Left>
                  </ListItem>
                  <ListItem>
                      <Item fixedLabel>
                        <Label>Compte : </Label>
                          {!compte.numeroCompte && <Item picker>
                            <Picker
                                mode="dropdown"
                                // iosIcon={<Icon name="arrow-down"/>}
                                style={{width: undefined}}
                                placeholder="Selectionner un compte"
                                selectedValue={selectedValue}
                                // onValueChange={handleSelectedCompte}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}

                            >
                              {props.comptes &&
                              props.comptes.map((compte: Compte) =>
                                  <Picker.Item label={compte.numeroCompte   ?? ''} value={compte.numeroCompte ?? ''}/>
                              )
                              }
                            </Picker>
                          </Item>}

                      </Item>
                  </ListItem>
                  <ListItem>
                      <Item fixedLabel>
                        <Label>Votre CIN : </Label>
                        <Input  textContentType="familyName"/>
                      </Item>
                  </ListItem>
                  <ListItem>
                    <Item fixedLabel>
                      <Label>Reference : </Label>
                      <Input  textContentType="familyName"/>
                    </Item>
                  </ListItem>
                  <ListItem>
                    <Item fixedLabel>
                      <Label>Remarque : </Label>
                      <Input  textContentType="familyName"/>
                    </Item>
                  </ListItem>
                </List>

                  <Div style={{height: 20}}/>
                <Div style={{height: 20}}/>


                <Button success iconRight block primary onPress={sendCheckFacture}>
                  <Text style={{color:"white"}}>Payer</Text>
                  <Icon name='checkmark-done-circle-outline' style={{color:"white"}}/>
                </Button>
                <Div style={{height: 20}}/>
                <Button success iconRight block danger onPress={toggleModal}>
                  <Text style={{color:"white"}}>Annuler</Text>
                  <Icon name='checkmark-done-circle-outline' style={{color:"white"}}/>
                </Button>
              </Card>


            </Container>



          </View>
        </Modal>
      </View>

    </Content></Container>)
      ;
}
const mapStateToComptesListProps = (state: any) => ({
  comptes: state.client.comptes
});
export const FactureDetailState = connect(mapStateToComptesListProps, {fetchFactures,fetchComptes,checkFacture})(FactureDetail);

const Forms = (props:any) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
      <Container style={{flex: 1}}>
        <Button  onPress={toggleModal} >
          <Text style={{color:"white"}}>Payer</Text>
        </Button>
        <Modal isVisible={isModalVisible}>


            <Text>Hello!</Text>
          <Form>
            <Item fixedLabel>
              <Label>Intitule</Label>
              <Input value="test" textContentType="familyName"/>
            </Item>
            <Div style={{height: 20}}/>
          </Form>
            <Button  onPress={toggleModal} >
              <Text style={{color:"white"}}>hide</Text>
            </Button>
        </Modal>
      </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor:"white",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },btn:{
    marginTop:20,
    marginRight:"50%"
},
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight : 20,
    resizeMode : "contain"
    // objectFit : "cover"
  },facture: {
    width: 40,
    height: 40,
    marginRight : 20,
    resizeMode : "contain"
    // objectFit : "cover"
  },
  list: {
    marginTop:10
  },thumbnail: {
    height:80,
    width:80
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
    fontWeight: 'bold'
  },factureData: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign:"right",
  },

});
