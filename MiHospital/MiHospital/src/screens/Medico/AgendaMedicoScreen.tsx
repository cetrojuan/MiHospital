import React, { useState, useEffect, useCallback  }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MedicoRootTabParamList } from '../../navigation/medicoTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import ListaAgendas from '../../components/ListaAgendas'
import { useFocusEffect } from '@react-navigation/native';

type Props = BottomTabScreenProps<MedicoRootTabParamList, 'Agenda'>;

const AgendaMedicoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nombre, dni } = route.params;
  /*const [puedeEnviar, setPuedeEnviar] = useState(true);
  const VerificarAgenda  = async () => {
    const agendasGuardadas = await AsyncStorage.getItem('agendas');
      const agendas = agendasGuardadas
          ? JSON.parse(agendasGuardadas)
          : [];

    const agendaProfesional = agendas.find(
        (agenda: { id: string }) =>
          agenda.id === dni
      );
    
    setPuedeEnviar(!agendaProfesional);
  }

  useFocusEffect(
    useCallback(() => {
      VerificarAgenda();
    }, [dni])
  );*/
  
  return(
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.bienvenido}>¡Bienvenido a agenda {nombre}!</Text>
          <View>
            <ListaAgendas nombre={nombre} dni={dni}/>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={[styles.nuevaAgendaBoton/*, !puedeEnviar && styles.botonOut*/]} onPress={() => navigation.getParent()?.navigate('NuevaAgenda', {nombre: nombre, dni: dni})} /*disabled={!puedeEnviar}*/>
        <Text style={styles.nuevaAgenda}>NUEVA AGENDA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AgendaMedicoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  bienvenido: { color: '#004aad', fontSize: 19, fontWeight: '500' },
  nuevaAgendaBoton: { alignSelf:'center',alignItems: 'center', backgroundColor:'#004aad', width:'90%', padding:15, borderRadius:10, marginBottom:15},
  botonOut: { alignSelf:'center',alignItems: 'center', backgroundColor:'#8d8d8d', width:'90%', padding:15, borderRadius:10, marginBottom:15},
  nuevaAgenda: {color:'white', fontSize:20, fontWeight: '500'}
});