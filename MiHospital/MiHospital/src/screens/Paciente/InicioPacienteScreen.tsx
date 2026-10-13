import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../navigation/pacienteTabNavigator';
import Credencial from '../../components/Credencial';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = BottomTabScreenProps<RootTabParamList, 'Inicio'>;

const InicioPacienteScreen: React.FC<Props> = ({ route }) => {
  const { nombre }  = route.params;
  return(
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.bienvenido}>¡Bienvenido {nombre}!</Text>
        <Credencial nombre={nombre}/>
        <View style={styles.turnosContainer}>
          <Text style={{fontSize:30}}>Proximos Turnos:</Text>
          <Text style={{color: '#004aad', fontSize:30}}>10 de Octubre</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default InicioPacienteScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500', marginBottom: 20 },
  credencial: { flex: 1, justifyContent: 'center', backgroundColor: '#004aad' , padding: 20, height: 200, borderRadius: 20, marginBottom: 20},
  turnosContainer: {}
});