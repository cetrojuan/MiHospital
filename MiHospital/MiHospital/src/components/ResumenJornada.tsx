
import React, { useState, useCallback } from 'react';
import {StyleSheet,Text,View,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type ResumenProps = {
    dni?: string;
};

const ResumenJornada: React.FC<ResumenProps> = ({ dni }) => {

    const [total, setTotal] = useState(0);
    const [atendidos, setAtendidos] = useState(0);
    const [pendientes, setPendientes] = useState(0);

    const CargarResumen = async () => {
        try {
            const turnosGuardados = await AsyncStorage.getItem('turnos');

            const todosLosTurnos = turnosGuardados
                ? JSON.parse(turnosGuardados)
                : [];

            const hoy = new Date();

            const turnosHoy = todosLosTurnos.filter(
                (turno: {
                    profesionalDni: string;
                    dia: string;
                    estado: string;
                }) =>
                    turno.profesionalDni === dni &&
                    new Date(turno.dia).toDateString() === hoy.toDateString() &&
                    (turno.estado === 'pendiente' || turno.estado === 'atendido')
            );

            const cantidadAtendidos = turnosHoy.filter(
                (turno: { estado: string }) => turno.estado === 'atendido'
            ).length;

            const cantidadPendientes = turnosHoy.filter(
                (turno: { estado: string }) => turno.estado === 'pendiente'
            ).length;

            setTotal(turnosHoy.length);
            setAtendidos(cantidadAtendidos);
            setPendientes(cantidadPendientes);

        } catch (error) {
            Alert.alert('Error', 'No se pudo cargar el resumen de la jornada.');
            console.error(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            CargarResumen();
        }, [dni])
    );

    return (
        <View style={styles.container}>
            <View style={styles.encabezado}>
                <View>
                    <Text style={styles.titulo}>Resumen de la jornada</Text>
                </View>
            </View>

            {total === 0 ? (
                <View style={styles.contenido}>
                    <View style={styles.sinTurnos}>
                        <Ionicons name="time-outline" size={45} color="#7a8ba5" />
                        <Text style={styles.textoSinTurnos}>
                        No hay tareas pendientes
                        </Text>
                    </View>
                </View>
            ) : (
            <View style={styles.contenido}>
                <View style={styles.contenedorDatos}>

                    <View style={styles.datoTotal}>
                        <Text style={styles.numeroTotal}>{total}</Text>
                        <Text style={styles.etiquetaTotal}>Turnos de hoy</Text>
                    </View>

                    <View style={styles.dato}>
                        <Text style={styles.numeroAtendido}>{atendidos}</Text>
                        <Text style={styles.etiqueta}>Atendidos</Text>
                    </View>

                    <View style={styles.dato}>
                        <Text style={styles.numeroPendiente}>{pendientes}</Text>
                        <Text style={styles.etiqueta}>Pendientes</Text>
                    </View>

                </View>

                <View style={styles.progresoContainer}>
                    <View style={styles.progresoTexto}>
                        <Text style={styles.textoProgreso}>Progreso de la jornada</Text>
                        <Text style={styles.porcentaje}>{total > 0 ? Math.round((atendidos / total) * 100) : 0}%</Text>
                    </View>
                    <View style={styles.barraFondo}>
                        <View style={[styles.barraProgreso, { width: `${total > 0 ? (atendidos / total) * 100 : 0}%` }]} />
                    </View>
                </View>
            </View>
            )}
        </View>
    );
};

export default ResumenJornada;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 20,
    },

    encabezado: {
        marginBottom: 15
    },

    titulo: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#202b3c'
    },

    contenido: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
    },

    contenedorDatos: {
        flexDirection: 'row',
        gap: 10,
    },

    datoTotal: {
        flex: 1.2,
        backgroundColor: '#eaf1fb',
        padding: 15,
        borderRadius: 15,
        justifyContent: 'center'
    },

    dato: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        padding: 13,
        borderRadius: 15,
        justifyContent: 'center'
    },

    numeroTotal: {
        fontSize: 29,
        fontWeight: 'bold',
        color: '#004aad'
    },

    numeroAtendido: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#218653'
    },

    numeroPendiente: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#c47b24'
    },

    etiquetaTotal: {
        fontSize: 11,
        color: '#526782',
        marginTop: 3
    },

    etiqueta: {
        fontSize: 11,
        color: '#78869a',
        marginTop: 3
    },

    progresoContainer: {
        marginTop: 18
    },

    progresoTexto: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },

    textoProgreso: {
        fontSize: 12,
        color: '#526782',
        fontWeight: '500'
    },

    porcentaje: {
        fontSize: 12,
        color: '#004aad',
        fontWeight: 'bold'
    },

    barraFondo: {
        height: 7,
        backgroundColor: '#e8edf4',
        borderRadius: 10,
        overflow: 'hidden'
    },

    barraProgreso: {
        height: '100%',
        backgroundColor: '#004aad',
        borderRadius: 10
    },

    sinTurnos: {
        alignItems: 'center',
        gap: 10,
    },
  
    textoSinTurnos: {
        fontSize: 18,
        fontWeight: '700',
        color: '#12305a',
        textAlign: 'center',
    },
});
