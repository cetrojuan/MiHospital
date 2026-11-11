
import React, { useState, useCallback } from 'react';
import {StyleSheet,Text,View,Alert,ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type TurnosProps = {
  dni?: string;
};

const Prox3turnosPaciente: React.FC<TurnosProps> = ({ dni }) => {
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

      setTurnos(turnosPendientes);

    }catch (error){
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

  const proximosTurnos = turnosAsc.slice(0, 3);

  useFocusEffect(
    useCallback(() => {
      CargarTurnos();
    }, [dni])
  );

  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <View>
          <Text style={styles.titulo}>Próximos turnos</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contenido}>

        {proximosTurnos.length === 0 ? (

          <View style={styles.sinTurnos}>
            <View style={styles.iconoVacio}>
              <Ionicons name="calendar-outline" size={30} color="#004aad"/>
            </View>
            <View style={styles.infoVacia}>
              <Text style={styles.textoSinTurnos}>No tenés próximos turnos</Text>
              <Text style={styles.descripcionSinTurnos}>Cuando solicites una consulta, aparecerá acá.</Text>
            </View>
          </View>
        ) : (
          proximosTurnos.map((turno) => (
            <View key={turno.id} style={styles.tarjetaTurno}>
              <View style={styles.fechaContainer}>
                <Text style={styles.dia}>{new Date(turno.dia).getDate()}</Text>
                <Text style={styles.mes}>
                  {new Date(turno.dia).toLocaleDateString('es-AR', { month: 'short' }).replace('.', '').toUpperCase()}
                </Text>
                <View style={styles.lineaFecha} />
                <Text style={styles.hora}>{turno.hora}</Text>
              </View>

              <View style={styles.infoTurno}>
                <Text style={styles.especialidad}>{turno.especialidad}</Text>
                <View style={styles.filaProfesional}>
                  <Ionicons name="person-outline" size={16} color="#6c83a1"/>
                  <Text style={styles.nombreProfesional} numberOfLines={1}>{turno.profesional}</Text>
                </View>
                <View style={styles.pieTarjeta}>
                  <Text style={styles.textoFecha}>
                    {new Date(turno.dia).toLocaleDateString('es-AR', {
                      weekday: 'long'
                    })}
                  </Text>

                  <Ionicons
                    name="arrow-forward-circle-outline"
                    size={21}
                    color="#004aad"
                  />
                </View>

              </View>
            </View>

          ))
        )}

      </ScrollView>
    </View>
  );
};

export default Prox3turnosPaciente;

const styles = StyleSheet.create({

  container: {
    marginBottom: 20
  },

  encabezado: {
    marginHorizontal: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  titulo: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#202b3c'
  },

  subtitulo: {
    fontSize: 13,
    color: '#8993a3',
    marginTop: 3
  },

  contenido: {
    paddingHorizontal: 20,
    gap: 12
  },

  tarjetaTurno: {
    width: 305,
    height: 120,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e3eaf3',
    elevation: 3
  },

  fechaContainer: {
    width: 90,
    backgroundColor: '#eaf1fb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },

  dia: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#004aad'
  },

  mes: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#54749e'
  },

  lineaFecha: {
    width: 35,
    height: 1,
    backgroundColor: '#bdcfe7',
    marginVertical: 9
  },

  hora: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#004aad'
  },

  infoTurno: {
    flex: 1,
    padding: 13,
    gap: 13
  },

  encabezadoTarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  especialidad: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#20334c',
    marginTop: 4
  },

  filaProfesional: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },

  nombreProfesional: {
    fontSize: 12,
    color: '#718096',
    flexShrink: 1
  },

  pieTarjeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#edf0f5',
    paddingTop: 7
  },

  textoFecha: {
    fontSize: 11,
    color: '#8290a2',
    textTransform: 'capitalize'
  },


  sinTurnos: {
    width: 305,
    height: 130,
    backgroundColor: '#f0f5fc',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: '#e0e9f5'
  },

  iconoVacio: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#dce9fa',
    justifyContent: 'center',
    alignItems: 'center'
  },

  infoVacia: {
    flex: 1,
    gap: 5
  },

  textoSinTurnos: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#203b60'
  },

  descripcionSinTurnos: {
    fontSize: 12,
    color: '#718096',
    lineHeight: 17
  }

});
