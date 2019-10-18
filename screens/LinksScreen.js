import React from 'react';
import { View, Image,Text,Dimensions, TextInput ,TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import { Expo,SQLite, Constants } from 'expo';
import { red, green } from 'ansi-colors';
import HomeScreen from './HomeScreen';
//import { FileSystem } from 'expo';
const db = SQLite.openDatabase('db.db');

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
 
  static navigationOptions = {
    headerTitle: (  <Image source={require( '../assets/images/ic_launcher/web_hi_res_512.png')} style={{marginLeft:10,width: 60, height: 40}} />
                     ),
    headerRight: (
      <Text style={{paddingRight:10,color:'black',fontWeight:'bold',fontSize:24,}}>
        Add Task
      </Text>
      ),
  };
  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderContent = () => (
    <View style={styles.texttyper}>
     <TextInput
            style={
              styles.textinput
            }
            allowFontScaling={true}
            autoCorrect
            autoCapitalize={"sentences"}
            multiline={true}
            numberOfLines={5}
            placeholder="what do you need to do?"
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
            
          />
         
    
    </View>
  );
  render() {
    return (
        

         <View style={styles.container}>
          {this._renderContent()}
        
          
          {this._renderButton('Submit Task', () => {
              this.add(this.state.text);
              this.setState({ text: null });
              
              
            }
          )}
        </View>

    );
  }


  add(text) {
    db.transaction(
      tx => {
        tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
        tx.executeSql('select * from items', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      this.update,
      
    );
  }
}

update = () => {
  this.todo && this.todo.update();
  this.done && this.done.update();
  
};


//styles
let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  texttyper:{
    flex: 1,
    padding:5,
    margin:5,
    backgroundColor: '#fffffe',
  },
  textinput:{
    flex: 1,
    padding: 10,
    fontSize:18,
    textAlign:'left',
    textAlignVertical:'top',
    height: ScreenHeight,
    borderColor:'#fff',
    backgroundColor:'#f8f8ff',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#ffbf00',
    padding: 12,
    margin: 5,
    fontSize:20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'red',
    shadowOpacity: 1.0,
  },
});
