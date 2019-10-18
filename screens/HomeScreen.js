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


export default class HomeScreen extends React.Component {


  state = {
    items:null,
  
};

  static navigationOptions = {
    headerTitle: (  <Image source={require( '../assets/images/ic_launcher/web_hi_res_512.png')} style={{marginLeft:10,width: 60, height: 40}} />
                     ),
    headerRight: (
      <Text style={{paddingRight:10,color:'#ffbf00',fontWeight:'bold',fontSize:24,}}>
        Pending Task
      </Text>
      ),
  };
  

  willFocus= this.props.navigation.addListener(
    'willFocus',()=>{
     this.update();
    }
  );
  

  
  componentDidMount() {
    
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists items (id integer primary key not null, done int, value text,Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);'
      );
    });
    this.update();
  }
  

  onPressItem(id) {
    //console.log(id)
    db.transaction( tx=>{
        tx.executeSql(`update items set done = 1 where id = ?;`,
                       [id]
        )
      
    })

     this.update()
    
  }
 

  render() {
    const { items } = this.state;
    if (items === null || items.length === 0) {
      return null;
    }
    return (
      <View style={styles.container}>
        
            {items.map(({ id, done, value,Timestamp }) => (
              <TouchableOpacity
                key={id}
                onPress={() => this.onPressItem(id)}         
                style={{
                  padding: 10,
                  margin:5,
                  backgroundColor: '#fffffe',
                  borderTopWidth: 0,
                  borderBottomColor:'gray',
                  borderBottomWidth: 1,
                }}>
                <Text><Text style={styles.timestamp}>{Timestamp+ '  :  '}</Text>{value}</Text>
                
              </TouchableOpacity>
            ))}
        
         
      </View>
    );
  }



  update() {
    db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
  }

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
  timestamp:{
    color:'gray',
  },
 
});
