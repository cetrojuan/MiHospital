import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type ListaTurnosPacienteProps = {
  dni?: string;
  estado?: string;
};

const ListaTurnosPaciente: React.FC<ListaTurnosPacienteProps> = ({ dni, estado }) => {
  const [turnos, setTurnos] = useState<any[]>([]);

  const CargarTurnos = async () => {
    try {
      const TurnosGuardados = await AsyncStorage.getItem('turnos');
      const todosLosTurnos = TurnosGuardados
        ? JSON.parse(TurnosGuardados)
        : [];

      const turnosPendientes = todosLosTurnos.filter(
        (turno: { pacienteDni: string, estado: string }) =>
          turno.pacienteDni === dni && turno.estado === 'pendiente'
      );

      const turnosPasados = todosLosTurnos.filter(
        (turno: { pacienteDni: string, estado: string }) =>
          turno.pacienteDni === dni && turno.estado !== 'pendiente'
      );

      if (estado === 'pendiente') {
        setTurnos(turnosPendientes);
      } else {
        setTurnos(turnosPasados);
      }

    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los turnos.');
      console.error(error);
    }
  }

  const turnosAsc = [...turnos].sort((a, b) => {
    const fechaA = new Date(a.dia);
    const fechaB = new Date(b.dia);

    const [horaA, minutosA] = a.hora.split(':').map(Number);
    const [horaB, minutosB] = b.hora.split(':').map(Number);

    fechaA.setHours(horaA, minutosA, 0, 0);
    fechaB.setHours(horaB, minutosB, 0, 0);

    return fechaA.getTime() - fechaB.getTime();
  });

  const turnosDesc = [...turnos].sort((a, b) => {
    const fechaA = new Date(a.dia);
    const fechaB = new Date(b.dia);

    const [horaA, minutosA] = a.hora.split(':').map(Number);
    const [horaB, minutosB] = b.hora.split(':').map(Number);

    fechaA.setHours(horaA, minutosA, 0, 0);
    fechaB.setHours(horaB, minutosB, 0, 0);

    return fechaB.getTime() - fechaA.getTime();
  });

  const OrdernarTurnos = () => {
    if (estado === 'pendiente') {
      return turnosAsc;
    } else {
      return turnosDesc;
    }
  };

  const ConfirmarCancelacion = (id: number) => {
    Alert.alert('Cancelar Turno', '¿Estás seguro de que querés cancelar el turno?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí',
          style: 'destructive',
          onPress: () => CancelarTurno(id),
        },
      ]
    );
  };

  const CancelarTurno = async (id: number) => {
    try {
      const TurnosGuardados = await AsyncStorage.getItem('turnos');
      const todosLosTurnos = TurnosGuardados
        ? JSON.parse(TurnosGuardados)
        : [];

      const turnosActualizados = todosLosTurnos.map((turno: { id: number; estado: string }) =>
        turno.id === id
          ? { ...turno, estado: 'cancelado' }
          : turno
      );

      await AsyncStorage.setItem('turnos', JSON.stringify(turnosActualizados));
      CargarTurnos()

    } catch (error) {
      Alert.alert('Error', 'No se pudo cancelar el turno.');
      console.error(error);
    }

  }

  useFocusEffect(
    useCallback(() => {
      CargarTurnos();
    }, [dni])
  );


  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      {turnos.length === 0 ? (
        <View style={styles.sinTurnos}>
          <Ionicons
            name="calendar-outline"
            size={45}
            color="#7a8ba5"
          />
          <Text style={styles.textoSinTurnos}>
            No tenés turnos registrados
          </Text>
          <Text style={styles.descripcionSinTurnos}>
            Cuando solicites un turno, aparecerá acá.
          </Text>
        </View>
      ) : (
        OrdernarTurnos().map((turno) => (
          <View key={turno.id} style={styles.tarjetaTurno}>
            <View style={styles.encabezado}>
              <View style={[styles.icono, turno.estado === 'cancelado' && styles.iconoCancelado, turno.estado === 'atendido' && styles.iconoAtendido]}>
                <Ionicons name="calendar-number-outline" size={24} color="#ffffff" />
              </View>
              <View style={styles.infoTurno}>
                <Text style={styles.titulo}>{turno.especialidad}</Text>
                <View style={styles.filaProfesional}>
                  <Ionicons name="person-outline" size={20} color="#004aad" />
                  <Text style={styles.nombreProfesional}>{turno.profesional}</Text>
                </View>
              </View>
              <View style={[styles.estado, turno.estado === 'cancelado' && styles.estadoCancelado, turno.estado === 'atendido' && styles.estadoAtendido]}>
                <Text style={[styles.textoEstado, turno.estado === 'cancelado' && styles.textoCancelado, turno.estado === 'atendido' && styles.textoAtendido]}>{turno.estado}</Text>
              </View>
              {estado === 'pendiente' && (
                <View style={{ display: 'flex', alignSelf: 'flex-start' }}>
                  <TouchableOpacity style={{ backgroundColor: '#ff0000', borderRadius: 5 }} onPress={() => ConfirmarCancelacion(turno.id)}>
                    <Ionicons name="close" size={24} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              )
              }
            </View>

            <View style={styles.separador} />
            <View style={styles.filaDatos}>
              <View style={styles.bloqueDato}>
                <View style={styles.bloque}>
                  <Ionicons name="today-outline" size={21} color="#004aad" />
                  <Text style={styles.etiqueta}>FECHA</Text>
                </View>
                <Text style={[styles.valorDato, turno.estado === 'cancelado' && styles.valorDatoCancelado, turno.estado === 'atendido' && styles.valorDatoAtendido]}>{new Date(turno.dia).toLocaleDateString('es-AR')}</Text>
              </View>
              <View style={styles.bloqueDato}>
                <View style={styles.bloque}>
                  <Ionicons name="time-outline" size={21} color="#004aad" />
                  <Text style={styles.etiqueta}>HORARIO</Text>
                </View>
                <Text style={[styles.valorDato, turno.estado === 'cancelado' && styles.valorDatoCancelado, turno.estado === 'atendido' && styles.valorDatoAtendido]}>{turno.hora}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );

};

export default ListaTurnosPaciente;

const styles = StyleSheet.create({
  contenedor: { padding: 18, paddingBottom: 30, },
  tarjetaTurno: { backgroundColor: '#eaf1fb', padding: 18, borderRadius: 20, marginBottom: 18, borderWidth: 1, borderColor: '#d5e1f2', },
  encabezado: { flexDirection: 'row', alignItems: 'center', gap: 12, },
  icono: { width: 46, height: 46, borderRadius: 13, backgroundColor: '#004aad', alignItems: 'center', justifyContent: 'center', },
  infoTurno: { flex: 1, gap: 4, },
  titulo: { fontSize: 17, fontWeight: '700', color: '#12305a', },
  subtitulo: { fontSize: 13, color: '#526782', },
  estado: { backgroundColor: '#c3eed2', paddingVertical: 6, paddingHorizontal: 9, borderRadius: 10, },
  textoEstado: { color: '#207044', fontSize: 12, fontWeight: '700', textTransform: 'capitalize', },

  estadoCancelado: { backgroundColor: '#fde2e2', },
  textoCancelado: { color: '#b42318', },
  iconoCancelado: { width: 46, height: 46, borderRadius: 13, backgroundColor: '#797979', alignItems: 'center', justifyContent: 'center', },
  valorDatoCancelado: { fontSize: 18, fontWeight: '700', color: '#747474', },

  estadoAtendido: { backgroundColor: '#c2d3f7', },
  textoAtendido: { color: '#004aad', },
  iconoAtendido: { width: 46, height: 46, borderRadius: 13, backgroundColor: '#9ac0f3', alignItems: 'center', justifyContent: 'center', },
  valorDatoAtendido: { fontSize: 18, fontWeight: '700', color: '#5382c0', },

  separador: { height: 1, backgroundColor: '#cfdaeb', marginVertical: 18, },
  etiqueta: { fontSize: 11, fontWeight: '700', color: '#526782', letterSpacing: 0.6, },
  filaProfesional: { flexDirection: 'row', alignItems: 'center', gap: 8, },
  nombreProfesional: { fontSize: 14, color: '#12305a', fontWeight: '500', flexShrink: 1, },
  filaDatos: { flexDirection: 'row', gap: 10, },
  bloque: { flexDirection: 'row', alignItems: 'center', gap: 3, },
  bloqueDato: { flex: 1, backgroundColor: '#ffffff', padding: 13, borderRadius: 14, gap: 7, },
  valorDato: { fontSize: 18, fontWeight: '700', color: '#004aad', },
  sinTurnos: { alignItems: 'center', marginTop: 40, gap: 10, },
  textoSinTurnos: { fontSize: 18, fontWeight: '700', color: '#12305a', textAlign: 'center', },
  descripcionSinTurnos: { fontSize: 14, color: '#526782', textAlign: 'center', },
});