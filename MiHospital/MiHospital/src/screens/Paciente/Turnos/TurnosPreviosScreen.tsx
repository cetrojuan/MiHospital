import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TurnosPacRootTabParamList } from '../../../navigation/turnosPacNavigator';
import ListaTurnos from '../../../components/ListaTurnosPaciente';

type Props = BottomTabScreenProps<TurnosPacRootTabParamList, 'TurnosPrev'>;

const TurnosPreviosScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nombre, dni }  = route.params;
  return(
    <View>
      <ListaTurnos dni={dni} estado='ambos'/>
    </View>
  );
};

export default TurnosPreviosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500' },
  cerrarSesionBoton: { color: '#da0e0e', fontSize:30, fontWeight: '500', marginTop: 20, alignSelf: 'center' },
});