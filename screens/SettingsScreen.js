import React from 'react';
import {
  Image,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';

import { Header } from 'react-navigation';
import { Expo,SQLite, Constants } from 'expo';

import Items from '../components/Items';
//import { FileSystem } from 'expo';
const db = SQLite.openDatabase('db.db');


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: (  <Image source={require( '../assets/images/ic_launcher/web_hi_res_512.png')} style={{marginLeft:10,width: 60, height: 40}} />
                     ),
    headerRight: (
      <Text style={{paddingRight:10,color:'green',fontWeight:'bold',fontSize:24,}}>
        Completed Task
      </Text>
      ),
  };
  state = {
    text: null,
  };
  willFocus= this.props.navigation.addListener(
    'willFocus',()=>{
     this.update();
    }
  );

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, done int, value text);'
      );
    });
    this.props.navigation.addListener('willFocus', ()=>{
      this._renderItems()
    });
  }
  _renderItems=() => (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
         
    <Items
      done={true}
      ref={done => (this.done = done)}
      onPressItem={id =>{
        //console.log(id);
        db.transaction(
          tx => {
            tx.executeSql(`delete from items where id = ?;`, [id]);
          },
          null,
          this.update
        )}}
    />
  </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this._renderItems()}
       
      </View>
    );
  }

  

  update = () => {
    this.todo && this.todo.update();
    this.done && this.done.update();
  };


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 
  contentContainer: {
    paddingTop: 30,
  },
 
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    margin: 5,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
 
});
