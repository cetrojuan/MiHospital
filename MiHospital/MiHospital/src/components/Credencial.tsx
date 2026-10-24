import React, { useState }  from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CredencialProps = {
  nombre?: string;
  dni?: string;
};

const Credencial: React.FC<CredencialProps> = ({nombre, dni}) => {
    const [numeroSocio] = useState(() =>
        Math.floor(100000000000 + Math.random() * 900000000000)
    );
  return(
    <View style={styles.credencial}>
        <View style={{justifyContent: 'center'}}>
            <Text style={styles.nombre}>{nombre?.toUpperCase()}</Text>
            <Text style={styles.dni}>{dni}</Text>
            <Text style={styles.socio}>{numeroSocio}</Text>
            <Text style={styles.plan}>Plan: Premium</Text>
        </View>
        <View style={{marginLeft: 20,}}  >
            <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold',}}>miHospital</Text>
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'normal', textAlign:'center'}}>Tu Salud Digital</Text>
            <View style={styles.iconoContainer}>
                <Ionicons name="fitness-outline" size={100} color="#ffffffff"/>
            </View>
        </View>
    </View>
  );
};

export default Credencial;

const styles = StyleSheet.create({
  credencial: { flex: 1, flexDirection: 'row', backgroundColor: '#004aad' , padding: 20, height: 200, borderRadius: 20, marginBottom: 20},
  nombre: {color: 'white', fontSize: 20, maxWidth: 140, marginBottom: 5},
  dni: {color: 'white', fontSize: 20, maxWidth: 140, marginBottom: 5, fontWeight: 300},
  socio: {color: 'white', fontSize: 20, fontWeight: 100, marginTop: 5},
  plan: {color: 'white', fontSize: 16, marginTop:3},
  iconoContainer: { alignItems: 'center', marginTop: 8},
});