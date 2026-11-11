import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

type NuevaAgendaRouteProp = RouteProp<RootStackParamList, 'NuevaAgenda'>;
type NuevaAgendaNavProp = NativeStackNavigationProp<RootStackParamList, 'NuevaAgenda'>;

type Props = {
  route: NuevaAgendaRouteProp;
  navigation: NuevaAgendaNavProp;
};

const NuevaAgendaScreen: React.FC<Props> = ({ route, navigation }) => {
  const {nombre, dni} = route.params;

  const diasSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
  ]);

  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('12:00');

  const cambiarDia = (dia: string) => {
    if (diasSeleccionados.includes(dia)) {
      setDiasSeleccionados(
        diasSeleccionados.filter((d) => d !== dia)
      );
    } else {
      setDiasSeleccionados([...diasSeleccionados, dia]);
    }
  };

  const generarHoras = () => {
    const horas = [];

    for (let hora = 0; hora < 24; hora++) {
      for (let minuto of [0, 30]) {
        const h = String(hora).padStart(2, '0');
        const m = String(minuto).padStart(2, '0');

        horas.push(`${h}:${m}`);
      }
    }

    return horas;
  };

const horasDisponibles = generarHoras();

const puedeEnviar = 
  diasSeleccionados.length > 0 && 
  horaFin !== '' && 
  horaInicio !== '' &&
  horaFin > horaInicio 
;

const CrearAgenga = async () => {
  try{
    if (diasSeleccionados.length === 0 || !horaFin || !horaInicio || horaFin <= horaInicio) {
          Alert.alert('Error', 'Completá todos los campos.');
          return;
        }

    const agendasGuardadas = await AsyncStorage.getItem('agendas');
    const agendas = agendasGuardadas
        ? JSON.parse(agendasGuardadas)
        : [];

    const existeAgenda = agendas.find(
        (agenda: { id: string }) =>
          agenda.id === dni
      );

    if (existeAgenda) {
      Alert.alert('Error', 'Ya hay una agenda existente!');
      return;
    }

    const nuevaAgenda = {
        id: dni.trim(),
        profesional: nombre,
        dias: diasSeleccionados,
        horaInicio: horaInicio,
        horaFin: horaFin
      };

    agendas.push(nuevaAgenda);

    await AsyncStorage.setItem('agendas', JSON.stringify(agendas));

    Alert.alert('Éxito', 'La agenda se guardó correctamente.');
    navigation.goBack();
  }
  catch (error) {
    Alert.alert('Error', 'No se pudo guardar la agenda.');
    console.error(error);
  }
}

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{fontSize:30, alignSelf:'center', fontWeight:'bold', color:'#004aad', marginBottom:20}}>Nueva Agenda</Text>
        <Text style={styles.label}>Días de atención:</Text>
          {diasSemana.map((dia) => {
            const seleccionado = diasSeleccionados.includes(dia);
              return (
                <TouchableOpacity key={dia} style={styles.diaFila} onPress={() => cambiarDia(dia)}>
                  <Text style={{color: seleccionado ? '#004aad' : '#777', fontSize: 16}}>{dia}</Text>
                  <Text style={{color: seleccionado ? '#004aad' : '#777',fontWeight: '500',}}>
                    {seleccionado ? '✓' : ''}
                  </Text>
                </TouchableOpacity>
              );
          })}
        <Text style={styles.label}>Horario de atención:</Text>
        <Text style={styles.labelTall}>Desde:</Text>
        <View>
          <Dropdown
            style={styles.horaDropdown}
            containerStyle={styles.dropdownLista}
            data={horasDisponibles.map((hora) => ({
              label: hora,
              value: hora,
            }))}
            labelField="label"
            valueField="value"
            placeholder="Seleccionar hora"
            value={horaInicio}
            onChange={(item) => setHoraInicio(item.value)}
            maxHeight={200}
          />
        </View>
        <Text style={styles.labelTall}>Hasta:</Text>
        <View>
          <Dropdown
            style={styles.horaDropdown}
            containerStyle={styles.dropdownLista}
            data={horasDisponibles.map((hora) => ({
              label: hora,
              value: hora,
            }))}
            labelField="label"
            valueField="value"
            placeholder="Seleccionar hora"
            value={horaFin}
            onChange={(item) => setHoraFin(item.value)}
            maxHeight={200}
          />
        </View>
        <TouchableOpacity style={[styles.botonEnviar,!puedeEnviar && styles.botonDeshabilitado]} onPress={CrearAgenga} disabled={!puedeEnviar}>
          <Text style={[styles.textoEnviar,!puedeEnviar && styles.textoDeshabilitado]}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NuevaAgendaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30 },
  title: { textAlign: 'center', fontSize: 19, fontWeight: '500', marginBottom: 5, marginTop: 20, color: '#004aad' },
  label: {fontSize: 20,marginBottom: 8, marginTop:20},
  labelTall: {fontSize:15, marginBottom:10},
  diaFila: {backgroundColor: '#e4e4e4',borderRadius: 10,padding: 10,marginBottom: 8,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'},
  horaDropdown: {backgroundColor: '#e4e4e4',borderRadius: 10,paddingHorizontal: 15,height: 50,marginBottom: 20},
  dropdownLista: {borderRadius: 10},
  botonEnviar: {backgroundColor:'#2075e4',borderRadius: 10,padding:15, alignItems: 'center', marginBottom: 80, marginTop: 20},
  textoEnviar: {color: '#ffffff', fontSize: 16, fontWeight: 'bold'},
  textoDeshabilitado: {color: '#969696'},
  botonDeshabilitado: {backgroundColor: '#cccccc'},
});