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
  return (
    <View style={styles.credencial}>
      <View style={styles.cabecera}>
        <Ionicons
          name="fitness-outline"
          size={30}
          color="#FFFFFF"
        />
        <Text style={styles.logo}>miHospital</Text>
      </View>
      <View style={styles.divisor} />
      <View style={styles.informacion}>
        <Text style={styles.etiqueta}>TITULAR</Text>

        <Text style={styles.nombre} numberOfLines={1}>
          {nombre?.toUpperCase() || 'NOMBRE DEL PACIENTE'}
        </Text>

        <Text style={styles.dni}>
          DNI · {dni || 'Sin especificar'}
        </Text>

        <View style={styles.pie}>
          <View style={styles.planContainer}>
            <Text style={styles.etiqueta}>PLAN</Text>
            <Text style={styles.plan}>Premium</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Credencial;

const styles = StyleSheet.create({
  credencial: {
    backgroundColor: '#004aad',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,

    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },

  divisor: {
    height: 1,
    backgroundColor: '#80A9E8',
    marginBottom: 16,
  },

  informacion: {
    gap: 4,
  },

  etiqueta: {
    color: '#BFD5F5',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },

  nombre: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 2,
  },

  dni: {
    color: '#E1ECFF',
    fontSize: 14,
    marginTop: 2,
  },

  pie: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
  },

  socio: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },

  planContainer: {
    alignItems: 'flex-start', 
  },

  plan: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
});