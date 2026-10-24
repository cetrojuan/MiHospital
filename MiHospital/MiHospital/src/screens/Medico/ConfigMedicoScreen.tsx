import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { PacienteRootTabParamList } from '../../navigation/pacienteTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = BottomTabScreenProps<PacienteRootTabParamList, 'Configuracion'>;

const ConfigPacienteScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nombre }  = route.params;
  return(
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.bienvenido}>¡Bienvenido a Configuracion {nombre}!</Text>
        <TouchableOpacity onPress={() => { navigation.getParent()?.reset({index: 0,routes: [{name: 'Home'}]})} }>
          <Text style={styles.cerrarSesionBoton}>Cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ConfigPacienteScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500' },
  cerrarSesionBoton: { color: '#da0e0e', fontSize:30, fontWeight: '500', marginTop: 20, alignSelf: 'center' },
});