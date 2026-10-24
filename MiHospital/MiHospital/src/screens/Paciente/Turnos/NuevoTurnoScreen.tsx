import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

type NuevoTurnoRouteProp = RouteProp<RootStackParamList, 'NuevoTurno'>;
type NuevoTurnoNavProp = NativeStackNavigationProp<RootStackParamList, 'NuevoTurno'>;

type Props = {
  route: NuevoTurnoRouteProp;
  navigation: NuevoTurnoNavProp;
};

const NuevoTurnoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { nombre } = route.params;
  const { dni } = route.params;

  const [profesionales, setProfesionales] = useState<any[]>([]);
  const [agenda, setAgenda] = useState<any>(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
  const [hora, setHora] = useState('');
  const especialidades = [
    { label: 'Cardiología', value: 'Cardiología' },
    { label: 'Cirugía general', value: 'Cirugía general' },
    { label: 'Clínica médica', value: 'Clínica médica' },
    { label: 'Dermatología', value: 'Dermatología' },
    { label: 'Gastroenterología', value: 'Gastroenterología' },
    { label: 'Ginecología', value: 'Ginecología' },
    { label: 'Neurología', value: 'Neurología' },
    { label: 'Oftalmología', value: 'Oftalmología' },
    { label: 'Otorrinolaringología', value: 'Otorrinolaringología' },
    { label: 'Pediatría', value: 'Pediatría' },
    { label: 'Psicología', value: 'Psicología' },
    { label: 'Psiquiatría', value: 'Psiquiatría' },
    { label: 'Traumatología', value: 'Traumatología' },
    { label: 'Urología', value: 'Urología' },
  ];
  const [especialidad, setEspecialidad] = useState("");
  const [profesional, setProfesional] = useState("");
  const profesionalesFiltrados = profesionales.filter(
    (profesional) => profesional.especialidad === especialidad
  );
  const [fecha, setFecha] = useState(new Date());

  /* ----- Cargar Profesionales ----- */
  useEffect(() => {
    const cargarProfesionales = async () => {
      try {
        const usuariosGuardados = await AsyncStorage.getItem('usuarios');

        const usuarios = usuariosGuardados
          ? JSON.parse(usuariosGuardados)
          : [];

        const listaProfesionales = usuarios.filter(
          (usuario: { tipo: string }) => usuario.tipo === 'Medico'
        );

        

        setProfesionales(listaProfesionales);
      } catch (error) {
        console.error('Error al cargar los médicos:', error);
      }
    };
    cargarProfesionales();
  }, []);

  /* ----- Cargar Agenda ----- */
  useEffect(() => {
    const cargarAgenda = async () => {
      setAgenda(null);
      setHora('');
      setHorariosDisponibles([]);

      if (!profesional) return;

      try {
        const agendasGuardadas = await AsyncStorage.getItem('agendas');
        const agendas = agendasGuardadas
          ? JSON.parse(agendasGuardadas)
          : [];

        const agendaEncontrada = agendas.find(
          (item: { id: string }) => item.id === profesional
        );

        setAgenda(agendaEncontrada ?? null);
      } catch (error) {
        console.error('Error al cargar la agenda:', error);
      }
    };

    cargarAgenda();
  }, [profesional]);

  /* ----- Cargar Horarios al Forms ----- */
  useEffect(() => {
    setHora('');

    if (!agenda) {
      setHorariosDisponibles([]);
      return;
    }

    const diasSemana = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ];

    const diaSeleccionado = diasSemana[fecha.getDay()];
    const trabajaEseDia = agenda.dias.includes(diaSeleccionado);

    if (!trabajaEseDia) {
      setHorariosDisponibles([]);
      return;
    }

    const horarios = generarHorarios(
      agenda.horaInicio,
      agenda.horaFin
    );

    setHorariosDisponibles(horarios);
  }, [agenda, fecha]);

  /* ----- Generar Horarios ----- */
  const generarHorarios = (horaInicio: string, horaFin: string) => {
    const horarios: string[] = [];

    let [hora, minutos] = horaInicio.split(':').map(Number);
    const [horaFinal, minutosFinal] = horaFin.split(':').map(Number);

    let minutosActuales = hora * 60 + minutos;
    const minutosFinales = horaFinal * 60 + minutosFinal;

    while (minutosActuales + 30 <= minutosFinales) {
      const horaFormateada = Math.floor(minutosActuales / 60)
        .toString()
        .padStart(2, '0');

      const minutosFormateados = (minutosActuales % 60)
        .toString()
        .padStart(2, '0');

      horarios.push(`${horaFormateada}:${minutosFormateados}`);

      minutosActuales += 30;
    }

    return horarios;
  };

  const puedeEnviar = 
    especialidad !== '' &&
    profesional !== '' &&
    hora !== '' 
    ;

  const CrearTurno = async () => {
    try{
      if (!especialidad || !profesional || !hora ) {
        Alert.alert('Error', 'Completá todos los campos.');
        return;
      }

      const turnosGuardados = await AsyncStorage.getItem('turnos');
      const turnos = turnosGuardados
        ? JSON.parse(turnosGuardados)
        : [];

      const nuevoTurno= {
        id: dni.trim(),
        paciente: nombre,
        especialidad: especialidad,
        profesional: profesional,
        dia: fecha,
        hora: hora
      };

      turnos.push(nuevoTurno);

      await AsyncStorage.setItem('turnos', JSON.stringify(turnos));

      Alert.alert('Éxito', 'El Turno se creó correctamente.');
      navigation.goBack();

    }catch (error) {
      Alert.alert('Error', 'No se pudo crear el Turno.');
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16, marginBottom: 8}}>Especialidad:</Text>
        <Dropdown
          data={especialidades}
          labelField="label"
          valueField="value"
          placeholder="Buscar especialidad..."
          search
          searchPlaceholder="Escribí una especialidad"
          value={especialidad}
          onChange={item => setEspecialidad(item.value)}
          style={{
            backgroundColor: '#e4e4e4',
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
          }}
        />
      <Text style={{fontSize: 16, marginBottom: 8}}>Profesional:</Text>
        <Dropdown
          data={profesionalesFiltrados}
          labelField="nombre"
          valueField="id"
          placeholder="Buscar profesional..."
          search 
          searchPlaceholder="Escribí un profesional"
          value={profesional}
          onChange={item => setProfesional(item.id)}
          style={{
            backgroundColor: '#e4e4e4',
            borderRadius: 10,
            padding: 15,
            marginBottom: 30,
          }}
        />
      <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
        <Text style={{fontSize: 18}}>Fecha:</Text>
          <DateTimePicker
            value={fecha}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={(event, fechaSeleccionada) => {
              if (fechaSeleccionada) {
                setFecha(fechaSeleccionada);
              }}}
          />
      </View>
      <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center', marginTop:25}}>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>Horario:</Text>
        <Dropdown
          data={horariosDisponibles.map(horario => ({
            label: horario,
            value: horario
          }))}
          labelField="label"
          valueField="value"
          placeholder="Seleccionar"
          value={hora}
          onChange={item => setHora(item.value)}
          disable={horariosDisponibles.length === 0}
          style={{
            backgroundColor: '#e4e4e4',
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
            width:140
          }}
        />
      </View>
      <TouchableOpacity style={[styles.botonEnviar,!puedeEnviar && styles.botonDeshabilitado]} onPress={CrearTurno} disabled={!puedeEnviar}>
        <Text style={[styles.textoEnviar,!puedeEnviar && styles.textoDeshabilitado]}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NuevoTurnoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { textAlign: 'center', fontSize: 19, fontWeight: '500', marginBottom: 5, marginTop: 20, color: '#004aad' },
  botonEnviar: {backgroundColor:'#2075e4',borderRadius: 10,padding:15, alignItems: 'center', marginBottom: 100},
  textoEnviar: {color: '#ffffff', fontSize: 16, fontWeight: 'bold'},
  textoDeshabilitado: {color: '#969696'},
  botonDeshabilitado: {backgroundColor: '#cccccc'},
});