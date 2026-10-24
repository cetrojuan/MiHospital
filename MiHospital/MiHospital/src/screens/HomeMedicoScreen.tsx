import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InicioScreen from '../screens/Medico/InicioMedicoScreen'
import TurnosScreen from '../screens/Medico/TurnosMedicoScreen' 
import AgendaScreen from '../screens/Medico/AgendaMedicoScreen'
import ConfiguracionScreen from '../screens/Medico/ConfigMedicoScreen'
import { MedicoRootTabParamList } from '../navigation/medicoTabNavigator';
import { RootStackParamList } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeMedicoRouteProp = RouteProp<RootStackParamList, 'HomeMedico'>;
const Tab = createBottomTabNavigator<MedicoRootTabParamList>();

type Props = {
  route: HomeMedicoRouteProp; 
};

const HomeMedicoScreen: React.FC<Props> = ({ route }) => {
  const { nombre }  = route.params;
  const { dni } = route.params;
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {backgroundColor: '#004aad'},
        headerTintColor: '#ffffff',
        tabBarStyle: {backgroundColor: '#004aad',},
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#b3cfff',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Inicio':
              iconName = 'home-outline';
              break;
            case 'Turnos':
              iconName = 'calendar-outline';
              break;
            case 'Agenda':
              iconName = 'clipboard-outline';
              break;
            case 'Configuracion':
              iconName = 'settings-outline';
              break;
            default:
              iconName = 'help-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} initialParams={{ nombre, dni }}/>
      <Tab.Screen name="Turnos" component={TurnosScreen} initialParams={{ nombre, dni }}/>
      <Tab.Screen name="Agenda" component={AgendaScreen} initialParams={{ nombre, dni }}/>
      <Tab.Screen name="Configuracion" component={ConfiguracionScreen} initialParams={{ nombre, dni }}/>
    </Tab.Navigator>
  );
};

export default HomeMedicoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500',marginTop: 100 },
});