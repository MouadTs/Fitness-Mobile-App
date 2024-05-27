import React,{useContext,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../Pages/Context/UsernameContext';

const ProfileCard = () => {
  const { weight,setweight}=useContext(UserContext);
  console.log(weight);
  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <View style={styles.cardHead}>
      <Text style={styles.text}>Weight: </Text>
      <FontAwesome5 name="weight" size={28} color="black" />
      </View>
      <View style={styles.cardText}>
      <Text style={styles.Weight}>{weight} </Text>
      <Text style={styles.WeightMesure}>kg</Text></View>
      <View style={styles.cardfooter}>
        <Text style={styles.textideal}>Ideal </Text>
        <Ionicons name="thumbs-up-outline" size={24} color="black" />
      </View>
    </View></View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    
  },
  card: {
    width: "auto",
    height: 200,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#bcc982',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardHead:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  Weight:{
    fontSize: 68,
    fontWeight: 'bold',
    color: 'black',
    
  },
  WeightMesure:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  cardText:{
    flexDirection: 'row',
    alignItems:'center'
  },
  cardfooter:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  textideal:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  }
});
