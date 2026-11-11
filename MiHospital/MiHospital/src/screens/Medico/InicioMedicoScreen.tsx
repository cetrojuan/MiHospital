import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MedicoRootTabParamList } from '../../navigation/medicoTabNavigator';
import Novedades from '../../components/Novedades';
import Prox3turnosMedico from '../../components/Prox3turnosMedico';
import ResumenJornada from '../../components/ResumenJornada';

type Props = BottomTabScreenProps<MedicoRootTabParamList, 'Inicio'>;

const HomeMedicoScreen: React.FC<Props> = ({ route, navigation }) => {
  const {nombre, dni} = route.params;
  return(
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.bienvenido}>¡Bienvenido {nombre}! 👋</Text>
      </View>
      <ResumenJornada dni={dni}/>
      <Prox3turnosMedico dni={dni}/>
      <Novedades/>
    </ScrollView>
  );
};

export default HomeMedicoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500'},
})