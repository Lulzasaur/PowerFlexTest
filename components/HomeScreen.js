import React, { Component } from 'react';
import TextForm from './TextForm'
import { Text, TextInput, View } from 'react-native';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextForm />    
      </View>
    );
  }
}