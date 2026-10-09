import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type RegisterRouteProp = RouteProp<RootStackParamList, 'Register'>;

type Props = {
  route: RegisterRouteProp;
};

const RegisterScreen: React.FC = () => {
  const [nombre, setNombre] = useState(""); 
  const [contraseña, setContraseña] = useState("");
  const puedeEnviar = nombre.trim() !== "" && contraseña.trim() !== "";

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registrarse</Text>
        <TextInput
          value={nombre}                
          onChangeText={setNombre}      
          placeholder="Nombre de usuario"
          style={{ backgroundColor: '#e4e4e4', borderRadius: 10, padding: 15, marginBottom: 20, width: 220, maxWidth: 220,}}/>
        <TextInput
          secureTextEntry 
          value={contraseña}         
          onChangeText={setContraseña}      
          placeholder="Contraseña"
          style={{ backgroundColor: '#e4e4e4', borderRadius: 10, padding: 15, marginBottom: 25, width: 220, maxWidth: 220,}}/>
        <TouchableOpacity style={[styles.botonEnviar,!puedeEnviar && styles.botonDeshabilitado]} onPress={() => {}} disabled={!puedeEnviar}>
            <Text style={[styles.textoEnviar,!puedeEnviar && styles.textoDeshabilitado]}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  formContainer: { alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#ffffff', borderRadius: 10, shadowOpacity: 0.15, shadowColor: '#000' ,shadowOffset: { width: 0, height: 3 },shadowRadius: 6, elevation: 5, width: '70%', height: '50%', maxWidth: 300, maxHeight: 300 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 95 },
  title: { fontSize: 19, fontWeight: '500', marginBottom: 30, marginTop: 20, color: '#004aad' },
  label: { fontSize: 16, marginBottom: 8 },
  botonEnviar: {backgroundColor:'#2075e4',borderRadius: 10,padding:15,width: 220, alignItems: 'center', marginBottom: 20 },
  textoEnviar: {color: '#ffffff', fontSize: 16, fontWeight: 'bold'},
  textoDeshabilitado: {color: '#969696'},
  botonDeshabilitado: {backgroundColor: '#cccccc'},
});