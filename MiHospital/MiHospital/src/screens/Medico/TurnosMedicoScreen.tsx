import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MedicoRootTabParamList } from '../../navigation/medicoTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TurnosMedRootTabParamList} from '../../navigation/turnosMedNavigator';
import ProxTurnosMedScreen from './Turnos/ProximosTurnosMedScreen';
import TurnosPrevMedScreen from './Turnos/TurnosPreviosMedScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

type Props = BottomTabScreenProps<MedicoRootTabParamList, 'Turnos'>;
const Tab = createMaterialTopTabNavigator<TurnosMedRootTabParamList>();

const TurnosMedicoScreen: React.FC<Props> = ({ route }) => {
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
        <Tab.Screen name="ProxTurnos" component={ProxTurnosMedScreen} initialParams={{ nombre, dni }} options={{ title: 'Próximos turnos' }}/>
        <Tab.Screen name="TurnosPrev" component={TurnosPrevMedScreen} initialParams={{ nombre, dni }} options={{ title: 'Turnos previos' }}/>
      </Tab.Navigator>
    </View>
  );
};

export default TurnosMedicoScreen;

const styles = StyleSheet.create({
  container: { backgroundColor: '#ffffff', padding: 15},
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500', textAlign:'center' },
});