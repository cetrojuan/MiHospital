import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TurnosMedRootTabParamList } from '../../../navigation/turnosMedNavigator';
import ListaTurnosMedico from '../../../components/ListaTurnosMedico';

type Props = BottomTabScreenProps<TurnosMedRootTabParamList, 'TurnosPrev'>;

const TurnosPreviosMedScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nombre, dni }  = route.params;
  return(
    <View>
      <ListaTurnosMedico dni={dni} estado='ambos'/>
    </View>
  );
};

export default TurnosPreviosMedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500' },
  cerrarSesionBoton: { color: '#da0e0e', fontSize:30, fontWeight: '500', marginTop: 20, alignSelf: 'center' },
});