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
//import { FileSystem } from 'expo';
const db = SQLite.openDatabase('db.db');



export default class Items extends React.Component {
  
   
    state = {
        items:null,
      
    };

 
  
  componentDidMount() {
    this.update();
   
  }

  render() {
    const { items } = this.state;
    if (items === null || items.length === 0) {
      return null;
    }

    return (
      <View style={{ margin: 5 }}>
        
         {items.map(({ id, done, value,Timestamp }) => (
              <TouchableOpacity
                key={id}
                onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
                style={{
                  padding: 10,
                  margin:5,
                  backgroundColor:'#fffffe',
                  borderTopWidth: 0,
                  borderBottomColor:'gray',
                  borderBottomWidth: 1,
                }}>
                <Text><Text style={{  color:'gray'}}>{Timestamp+ '  :  '}</Text>{value}</Text>
                
              </TouchableOpacity>
            ))}
      </View>
    );
  }

  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }
}
