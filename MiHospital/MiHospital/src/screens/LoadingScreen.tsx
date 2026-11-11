import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StartNavProp = NativeStackNavigationProp<RootStackParamList, 'Loading'>;

type Props = {
    navigation: StartNavProp;
};

const LoadingScreen: React.FC<Props> = ({ navigation }) => {

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const logueo = await AsyncStorage.getItem('sesion');
                await new Promise(resolve => setTimeout(resolve, 1000));

                if (logueo) {
                    const sesion = JSON.parse(logueo);
                    if (sesion.rol.toLowerCase() === 'paciente') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomePaciente', params: { nombre: sesion.nombre, dni: sesion.dni, rol: 'Paciente' } }]
                        });
                    } else if (sesion.rol.toLowerCase() === 'medico') {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeMedico', params: { nombre: sesion.nombre, dni: sesion.dni, rol: 'Medico' } }]
                        });
                    }
                }else{
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }]
                    });
                }


            } catch (error) {
                console.error('Error al recuperar la sesión:', error);
            }
        };

        verificarSesion();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/miHospital.png')} style={{ alignSelf: 'center', width: 350, height: 80, }} />
        </View>
    );

};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 }
});