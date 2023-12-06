import React, { useState, useEffect } from 'react';
import socketio, { Socket } from 'socket.io-client'
import { Alert, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';


export default function List({navigation}) {
  const [techs, setTechs] = useState([]);

  useEffect(() =>{
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.10.112:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada':'Rejeitada'}`)
      })
    })
  }, [])



  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);

  async function handleLogin(){
        await AsyncStorage.setItem('user', '')
        await AsyncStorage.setItem('techs', '')

    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={handleLogin}>
            <Image style={styles.logo} source={logo} />
          </TouchableOpacity>

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 40,
  },
});