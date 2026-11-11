
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    dni: string;
}

const EditarDatosUsuario: React.FC<Props> = ({ dni }) => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const puedeEnviar = email.trim() !== '';


    useEffect(() => {
        CargarUsuario();
    }, []);

    const CargarUsuario = async () => {
        try {
            const datos = await AsyncStorage.getItem('usuarios');
            const usuarios = datos ? JSON.parse(datos) : [];

            const usuario = usuarios.find((item: any) => item.id === dni);

            if (usuario) {
                setEmail(usuario.email);
            }

        } catch (error) {
            Alert.alert('Error', 'No se pudieron cargar los datos del usuario.');
        }
    };

    const GuardarCambios = async () => {
        try {
            if (!email.trim() && !contraseña.trim()) {
                Alert.alert('Error', 'Completá todos los campos.');
                return;
            }

            const datos = await AsyncStorage.getItem('usuarios');
            const usuarios = datos ? JSON.parse(datos) : [];

            const nuevosUsuarios = usuarios.map((item: any) => {
                if (item.id === dni) {
                    return {
                        ...item,
                        email: email.trim().toLowerCase(),
                        contraseña: contraseña.trim() !== ''
                            ? contraseña
                            : item.contraseña
                    };
                }

                return item;
            });

            await AsyncStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));

            Alert.alert('Éxito', 'Los datos se actualizaron correctamente.');
            setContraseña('');

        } catch (error) {
            Alert.alert('Error', 'No se pudieron guardar los cambios.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Datos de la cuenta</Text>

            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Nuevo correo electrónico"
            />

            <Text style={styles.label}>Nueva contraseña</Text>
            <TextInput
                style={styles.input}
                value={contraseña}
                onChangeText={setContraseña}
                secureTextEntry
                placeholder="Dejar vacío para mantener la actual"
            />

            <TouchableOpacity style={[styles.boton,!puedeEnviar && styles.botonDeshabilitado]} onPress={GuardarCambios} disabled={!puedeEnviar}>
                        <Text style={[styles.textoBoton,!puedeEnviar && styles.textoDeshabilitado]}>Enviar</Text>
                      </TouchableOpacity>
        </View>
    );
};

export default EditarDatosUsuario;

const styles = StyleSheet.create({
    container: {
        marginTop:30,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 7,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 18,
    },
    boton: {
        backgroundColor: '#004aad',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textoDeshabilitado: {color: '#969696'},
    botonDeshabilitado: {backgroundColor: '#cccccc'},
});
