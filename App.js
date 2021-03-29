import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import dictionary from './database'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      textEntered:"",
      searchPressed: false,
      word: "",
      definition: "",
      wordType: "",
    }
  }

  findWord = async (text) => {

    var word = dictionary[text]["word"]
    var type = dictionary[text]["lexicalCategory"]
    var definition = dictionary[text]["definition"]

    this.setState({
      word: word,
      wordType: type,
      definition: definition,
    })


    /*var word = text.toLowerCase();
    var url = 'https://rupinwhitehatjr.github.io/dictionary/' + word + '.json';
    return fetch(url)
    .then((data) => {
      if (data.status === 200) {
        return data.json();
        
      }
      else {
        return null;
      }
    })
    .then((response) => {
      var res = response
      if (res) {
        var wordInfo = res.definitions[0]
        var definition = wordInfo.description
        var wordType = wordInfo.wordtype
        this.setState({
          'definition': definition,
          'wordType': wordType,
        })
      }
      else {
        this.setState({
          definition: "Not found",
          wordType: "Not found"
        })
      }
    })*/
  }

  render(){
    return (
      <View style={styles.container}>
        <TextInput style = {styles.inputBox} onChangeText = {(text) => {
          this.setState({
            textEntered: text,
            searchPressed: false,
            word: "Loading",
            definition: "",
            wordType: "",
          })
        }}></TextInput>
        <TouchableOpacity style = {styles.goButton} onPress = {() => {
          this.setState({
            searchPressed: true,
            word: this.state.textEntered,
            definition: "Loading",
            wordType: "Loading",
          }),
          this.findWord(this.state.textEntered.toLowerCase())
        }}>
          <Text style = {styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <Text style = {styles.wordText}>
          {this.state.word}
        </Text>
        <Text style = {styles.definitionText}>
          Type: {this.state.wordType}
        </Text>
        <Text style = {styles.definitionText}>
          Definition: {this.state.definition}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  goButton: {
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 4,
    backgroundColor: 'red',
  },
  buttonText: {
    fontSize: 30,
    color: 'blue'
  },
  wordText: {
    fontSize: 35,
  },
  definitionText: {
    fontSize: 25,
    paddingLeft: 40,
    paddingRight: 40,
    color: 'orange'
  }
});
