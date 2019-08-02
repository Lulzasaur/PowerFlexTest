import React, { Component } from 'react';
import Scanner from './Scanner'
import { Alert, Text, TextInput, View, Button, Modal,TouchableHighlight } from 'react-native';

export default class TextForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        text: '',
        savedStrings:[],
        modalVisible:false
    };

    this.onPressSaveString = this.onPressSaveString.bind(this)
    this.onPressRetrieveString = this.onPressRetrieveString.bind(this)
    this.onPressSetString = this.onPressSetString.bind(this)
    this.hideTextModal = this.hideTextModal.bind(this)
  }

  async onPressSaveString(){

    let newSavedStrings = [...this.state.savedStrings],
        newSavedText = this.state.text

    if(newSavedStrings.length>4){
        while(newSavedStrings.length>4){
            newSavedStrings.shift()
        }
    }

    if(newSavedText.length===10){
        if(newSavedText == +newSavedText){
          await this.setState({
            text:'',
            savedStrings:[...newSavedStrings,newSavedText]
          })
        } else{
          Alert.alert('Alert', 'For text 10 digits in length, all items must be numeric');
          return;
        }  
    } else if(newSavedText.length===8 || newSavedText.length===16){
      await this.setState({
        text:'',
        savedStrings:[...newSavedStrings,newSavedText]
      })
    } else{
        Alert.alert('Alert', 'Please enter a valid input');
        return;
    } 
  }

  async onPressRetrieveString(){
    await this.setState({
        modalVisible:true
    })
  }

  async onPressSetString(str){
    await this.setState({
        modalVisible:false,
        text:str
    })
  }

  hideTextModal(){
    this.setState({
        modalVisible:false
    })
  }

  render() {
    let textSavedStrings = []

    for(let item of this.state.savedStrings){
        textSavedStrings.push(

        <TouchableHighlight
            key={item}
            onPress={this.onPressSetString.bind(this,item)}
        >
            <Text>{item}</Text>
        </TouchableHighlight>
        )
    }

    return (
      <View style={{padding: 10}}>
        <TextInput
            style={{height: 40}}
            placeholder="Type here!"
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
        />
        <Button
            onPress={this.onPressSaveString}
            title="Save Here"
            color="#841584"
            accessibilityLabel="Save Here"
            />
         <Button
            onPress={this.onPressRetrieveString}
            title="Retrieve Here"
            color="#841584"
            accessibilityLabel="Retrieve Here"
            />
        {/* <Scanner
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          scannedText={this.onPressSetString}
        /> */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
             <View style={{
                flex:1,
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'stretch'
                }}>
            <View>
              {textSavedStrings}
              <TouchableHighlight
                onPress={this.hideTextModal}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}