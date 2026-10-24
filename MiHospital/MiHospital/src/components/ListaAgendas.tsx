import React, { useState, useEffect, useCallback }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView, FlatList  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type ListaAgendasProps = {
  nombre?: string;
  dni?: string;
};



const ListaAgendas: React.FC<ListaAgendasProps> = ({nombre, dni}) => {
  const [dias, setDias] = useState([]);
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [HayAgenda, setHayAgenda] = useState(false);
  const CargarAgendas = async () => {
    try {
    const agendasGuardadas = await AsyncStorage.getItem('agendas');
      const agendas = agendasGuardadas
          ? JSON.parse(agendasGuardadas)
          : [];

    const agendaProfesional = agendas.find(
        (agenda: { id: string }) =>
          agenda.id === dni
      );

    if (agendaProfesional) {
      setDias(agendaProfesional.dias);
      setHoraInicio(agendaProfesional.horaInicio);
      setHoraFin(agendaProfesional.horaFin);
      setHayAgenda(true);
    } else {
      setDias([]);
      setHoraInicio('');
      setHoraFin('');
      setHayAgenda(false);
    }

    }catch (error){
      Alert.alert('Error', 'No se pudieron cargar las agendas.');
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      CargarAgendas();
    }, [dni])
  );

  const ConfirmarEliminacion = () => {
    Alert.alert('Eliminar agenda', '¿Estás seguro de que querés eliminar esta agenda?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          style: 'destructive',
          onPress: BorrarAgenda,
        },
      ]
    );
  };

  const BorrarAgenda = async () => {
    try {
      const agendasGuardadas = await AsyncStorage.getItem('agendas');
      const agendas = agendasGuardadas
          ? JSON.parse(agendasGuardadas)
          : [];

      const agendasActualizadas = agendas.filter(
        (agenda: { id: string }) => agenda.id !== dni
      );

      await AsyncStorage.setItem('agendas', JSON.stringify(agendasActualizadas));
      CargarAgendas();
      Alert.alert('Éxito', 'Agenda eliminada correctamente');
      

    }catch (error){
      Alert.alert('Error', 'No se pudo borrar la agenda');
      console.error(error);
    }

  }

  return (
    <View>
      <View style={[styles.Hay, !HayAgenda && styles.noHay]}>
        <Text style={styles.noHayLabel}>No Hay Agendas...</Text>
      </View>
        <View style={[styles.agendas, !HayAgenda && styles.agendasOculto]}>
          <View style={styles.encabezado}>
            <View style={styles.icono}>
              <Ionicons name="calendar-outline" size={24} color="#ffffff"/>
            </View>
            <View style={styles.infoMedico}>
              <Text style={styles.titulo}>Agenda médica</Text>
              <Text style={styles.nombre}>{nombre}</Text>
            </View>
            <View>
              <TouchableOpacity style={{backgroundColor:'#ff0000', borderRadius:5}} onPress={ConfirmarEliminacion}>
                <Ionicons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separador} />
          <Text style={styles.subtitulo}>DÍAS DE ATENCIÓN</Text>
          <View style={styles.listaDias}>
            {dias.map((dia) => (
              <View key={dia} style={styles.dia}>
                <Text style={styles.textoDia}>{dia}</Text>
              </View>
            ))}
          </View>
          <View style={styles.contenedorHorario}>
            <View style={styles.tituloHorario}>
              <Ionicons name="time-outline" size={20} color="#004aad" />
              <Text style={styles.subtitulo}>HORARIO DE ATENCIÓN</Text>
            </View>
            <View style={styles.filaHorario}>
              <View style={styles.bloqueHora}>
                <Text style={styles.etiquetaHora}>DESDE</Text>
                <Text style={styles.horas}>{horaInicio}</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#7a8ba5"/>
              <View style={styles.bloqueHora}>
                <Text style={styles.etiquetaHora}>HASTA</Text>
                <Text style={styles.horas}>{horaFin}</Text>
              </View>
            </View>
          </View>
        </View>
    </View>
  );
};

export default ListaAgendas;

const styles = StyleSheet.create({
  agendas: {backgroundColor: '#eaf1fb',padding: 18,borderRadius: 20,marginBottom: 18,borderWidth: 1,borderColor: '#d5e1f2',},
  encabezado: {flexDirection: 'row',alignItems: 'center',gap: 12,},
  icono: {width: 46,height: 46,borderRadius: 13,backgroundColor: '#004aad',alignItems: 'center',justifyContent: 'center',},
  infoMedico: {flex: 1,gap: 4,},
  titulo: {fontSize: 18,fontWeight: '700',color: '#12305a',},
  nombre: {fontSize: 14,color: '#526782',},
  separador: {height: 1,backgroundColor: '#cfdaeb',marginVertical: 18,},
  subtitulo: {fontSize: 12,fontWeight: '700',color: '#526782',letterSpacing: 0.6,},
  listaDias: {flexDirection: 'row',flexWrap: 'wrap',gap: 8,marginTop: 12,marginBottom: 18,},
  dia: {backgroundColor: '#ffffff',borderWidth: 1,borderColor: '#c8d9f2',paddingVertical: 8,paddingHorizontal: 12,borderRadius: 10,},
  textoDia: {fontSize: 13,fontWeight: '600',color: '#004aad',},
  contenedorHorario: {backgroundColor: '#ffffff',padding: 14,borderRadius: 15,gap: 14,},
  tituloHorario: {flexDirection: 'row',alignItems: 'center',gap: 8,},
  filaHorario: {flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',gap: 10,},
  bloqueHora: {flex: 1,backgroundColor: '#eaf1fb',paddingVertical: 12,borderRadius: 12,alignItems: 'center',gap: 5,},
  etiquetaHora: {fontSize: 10,fontWeight: '600',color: '#526782',},
  horas: {fontSize: 21,fontWeight: '700',color: '#004aad',},
  agendasOculto: {opacity:0},
  Hay:{opacity:0},
  noHay:{flex:1, opacity:1, alignSelf:'center', marginTop:20},
  noHayLabel:{fontSize:20}

});