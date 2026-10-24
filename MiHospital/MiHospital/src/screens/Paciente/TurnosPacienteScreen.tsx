import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { PacienteRootTabParamList } from '../../navigation/pacienteTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TurnosPacRootTabParamList} from '../../navigation/turnosPacNavigator';
import ProxTurnosScreen from './Turnos/ProximosTurnosScreen';
import TurnosPrevScreen from './Turnos/TurnosPreviosScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

type Props = BottomTabScreenProps<PacienteRootTabParamList, 'Turnos'>;
const Tab = createMaterialTopTabNavigator<TurnosPacRootTabParamList>();

const TurnosPacienteScreen: React.FC<Props> = ({ route }) => {
  const { nombre }  = route.params;
  const { dni }  = route.params;
  return(
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.bienvenido}>Turnos de {nombre}</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
        tabBarActiveTintColor: '#004aad',
        tabBarInactiveTintColor: '#777',
      }}
      >
        <Tab.Screen name="ProxTurnos" component={ProxTurnosScreen} initialParams={{ nombre, dni }} options={{ title: 'Próximos turnos' }}/>
        <Tab.Screen name="TurnosPrev" component={TurnosPrevScreen} initialParams={{ nombre, dni }} options={{ title: 'Turnos previos' }}/>
      </Tab.Navigator>
    </View>
  );
};

export default TurnosPacienteScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: '#ffffff', padding: 15},
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500', textAlign:'center' },
});