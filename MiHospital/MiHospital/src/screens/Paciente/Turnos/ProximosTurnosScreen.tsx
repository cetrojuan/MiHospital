import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TurnosPacRootTabParamList } from '../../../navigation/turnosPacNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import ListaTurnos from '../../../components/ListaTurnosPaciente';

type Props = BottomTabScreenProps<TurnosPacRootTabParamList, 'ProxTurnos'>;

const ProximosTurnosScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nombre, dni }  = route.params;
  return(
    <View style={{flex: 1}}>
      <ListaTurnos dni={dni} estado={'pendiente'}/>
      <TouchableOpacity style={styles.nuevoTurnoBoton} onPress={() => navigation.getParent()?.navigate('NuevoTurno', {nombre: nombre, dni: dni})}>
        <Text style={styles.nuevoTurno}>NUEVO TURNO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProximosTurnosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500' },
  nuevoTurnoBoton: { alignSelf:'center',alignItems: 'center', backgroundColor:'#004aad', width:'90%', padding:15, borderRadius:10, marginBottom:15},
  nuevoTurno: {color:'white', fontSize:20, fontWeight: '500'}
});