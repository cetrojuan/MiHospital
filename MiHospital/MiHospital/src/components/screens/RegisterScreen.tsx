import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type RegisterRouteProp = RouteProp<RootStackParamList, 'Register'>;
type RegisterNavProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;


type Props = {
  route: RegisterRouteProp;
  navigation: RegisterNavProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [nombre, setNombre] = useState(""); 
  const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState('paciente')
  const puedeEnviar = nombre.trim() !== "" && contraseña.trim() !== "" && email.trim() !== "";

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.iconoContainer}>
          <Ionicons name="fitness-outline" size={70} color="#004aad"/>
        </View>
        <Text style={styles.title}>Registrarse</Text>
        <Text style={{textAlign: 'center', marginBottom: 50}}>Ingrese sus credenciales para Registrarse</Text>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          value={nombre}                
          onChangeText={setNombre}      
          placeholder="Nombre de usuario"
          style={{ backgroundColor: '#e4e4e4', borderRadius: 10, padding: 15, marginBottom: 20}}/>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          keyboardType="email-address"
          value={email}                
          onChangeText={setEmail}      
          placeholder="Email"
          style={{ backgroundColor: '#e4e4e4', borderRadius: 10, padding: 15, marginBottom: 20}}/>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          secureTextEntry
          value={contraseña}                
          onChangeText={setContraseña}      
          placeholder="Contraseña"
          style={{ backgroundColor: '#e4e4e4', borderRadius: 10, padding: 15, marginBottom: 25}}/>
        <Text style={styles.label}>Rol:</Text>
        <Picker style={styles.picker} selectedValue={tipo} onValueChange={(itemValue) => setTipo(itemValue)}>          
          <Picker.Item label="Paciente" value="paciente"/>
          <Picker.Item label="Medico" value="medico"/>
        </Picker>
        <Text>Seleccionaste: {tipo}</Text>
        <TouchableOpacity style={[styles.botonEnviar,!puedeEnviar && styles.botonDeshabilitado]} onPress={() => {}} disabled={!puedeEnviar}>
          <Text style={[styles.textoEnviar,!puedeEnviar && styles.textoDeshabilitado]}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, },
  iconoContainer: { alignItems: 'center'},
  formContainer: {flex: 1, justifyContent: 'center'},
  title: { textAlign: 'center', fontSize: 19, fontWeight: '500', marginBottom: 5, marginTop: 20, color: '#004aad' },
  label: { fontSize: 16, marginBottom: 8 },
  botonEnviar: {backgroundColor:'#2075e4',borderRadius: 10,padding:15, alignItems: 'center', marginBottom: 100, },
  textoEnviar: {color: '#ffffff', fontSize: 16, fontWeight: 'bold'},
  textoDeshabilitado: {color: '#969696'},
  botonDeshabilitado: {backgroundColor: '#cccccc'},
  picker: {height: 55, width:'100%'}
});