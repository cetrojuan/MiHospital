import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;
type LoginNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


type Props = {
  route: LoginRouteProp;
  navigation: LoginNavProp;
};

const LoginScreen: React.FC<Props> = ({ route, navigation }) => {
  const { rol }  = route.params;
  const [nombre, setNombre] = useState(""); 
  const [contraseña, setContraseña] = useState("");
  const puedeEnviar = nombre.trim() !== "" && contraseña.trim() !== "";

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.iconoContainer}>
          <Ionicons name="fitness-outline" size={70} color="#004aad"/>
        </View>
        <Text style={styles.title}>Ingreso como {rol}</Text>
        <Text style={{textAlign: 'center', marginBottom: 50}}>Ingrese sus credenciales para continuar</Text>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          value={nombre}                
          onChangeText={setNombre}      
          placeholder="Nombre de usuario"
          style={{ backgroundColor: '#e4e4e4', borderRadius: 10, padding: 15, marginBottom: 20}}/>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          secureTextEntry
          value={contraseña}                
          onChangeText={setContraseña}      
          placeholder="Contraseña"
          style={{ backgroundColor: '#e4e4e4', borderRadius: 10, padding: 15, marginBottom: 25}}/>
        <TouchableOpacity style={[styles.botonEnviar,!puedeEnviar && styles.botonDeshabilitado]} onPress={() => {}} disabled={!puedeEnviar}>
          <Text style={[styles.textoEnviar,!puedeEnviar && styles.textoDeshabilitado]}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <Text style={{textAlign: 'center', marginTop: 70, marginBottom: 5 }}>¿No tienes cuenta?</Text>
      <TouchableOpacity style={{ alignItems: 'center', marginBottom: 50}} onPress={() => navigation.navigate('Register')}>
        <Text style={{color: '#004aad', fontSize: 16, fontWeight: 'bold'}}>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  iconoContainer: { alignItems: 'center'},
  formContainer: {flex: 1, justifyContent: 'center'},
  title: { textAlign: 'center', fontSize: 19, fontWeight: '500', marginBottom: 5, marginTop: 20, color: '#004aad' },
  label: { fontSize: 16, marginBottom: 8 },
  botonEnviar: {backgroundColor:'#2075e4',borderRadius: 10,padding:15, alignItems: 'center', marginBottom: 20 },
  textoEnviar: {color: '#ffffff', fontSize: 16, fontWeight: 'bold'},
  textoDeshabilitado: {color: '#969696'},
  botonDeshabilitado: {backgroundColor: '#cccccc'},
});