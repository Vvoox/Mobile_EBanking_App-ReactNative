import { StyleSheet } from 'react-native';
import React, {useEffect, useState} from "react";
import {Div} from "react-native-magnus";
import {
    ActionSheet,
    Button,
    Container,
    Content,
    Icon,
    Input,
    Item,
    Label,
    Left,
    List,
    ListItem,
    Right,
    Subtitle,
    Text,
    Title
} from "native-base";
// var t = require('tcomb-form-native');
import { View } from '../components/Themed';
// var Form = t.form.Form;

// here we are: define your domain model
// var Person = t.struct({
//   name: t.String,              // a required string
//   surname: t.maybe(t.String),  // an optional string
//   age: t.Number,               // a required number
//   rememberMe: t.Boolean        // a boolean
// });
var options = {}; // optional rendering options (see documentation)

export default function FormScreen(props:any) {


  const [saving, setSaving] = useState(false);
  return (
    <View style={styles.container}>
      <Container>
        <Content padder>
             {/* display */}
        {/*<Form*/}

        {/*  type={Person}*/}
        {/*  options={options}*/}
        {/*/>*/}
            <Div style={{height: 20}}/>
            <Button style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} primary
                  >
                 <Text style={{textAlign: 'center'}}>
                    Enregistrer
                </Text>
            </Button>
        </Content>
    </Container>
    </View>
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
});
