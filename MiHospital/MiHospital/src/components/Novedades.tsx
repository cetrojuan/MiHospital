
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image } from 'react-native';

const Novedades: React.FC = () => {

  const [numeroSocios] = useState(() =>
        Math.floor(100000 + Math.random() * 900000)
    );

  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Novedades</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contenido}>
        <ImageBackground source={{uri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'}} style={styles.novedadPrincipal} imageStyle={{ borderRadius: 20 }}>
          <View style={styles.sombra}>
            <Text style={styles.etiquetaBlanca}>MIHOSPITAL</Text>
            <View>
              <Text style={styles.tituloPrincipal}>Cuidar tu salud nunca fue tan fácil.</Text>
              <Text style={styles.textoPrincipal}>Gestioná tus turnos y mantené tu información médica siempre a mano.</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.novedadSocios}>
          <Text style={styles.etiquetaAzul}>NUESTRA COMUNIDAD</Text>
          <Text style={styles.numero}>+{numeroSocios.toLocaleString('es-AR')}</Text>
          <Text style={styles.tituloSocios}>Personas confían en nosotros</Text>
          <View style={styles.linea} />
          <Text style={styles.textoSocios}>Gracias por acompañarnos y ser parte de miHospital.</Text>
        </View>

        <View style={styles.novedadVerde}>
          <Text style={styles.tituloVerde}>Tu salud, más cerca que nunca.</Text>
          <Text style={styles.textoVerde}>Ahora podés consultar tus próximos turnos desde cualquier lugar.</Text>
          <Text style={styles.flecha}>↗</Text>
        </View>

        <View style={styles.novedadImagen}>
          <Image source={{uri: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800'}} style={styles.foto}/>
          <View style={styles.textoImagen}>
            <Text style={styles.etiquetaImagen}>PROFESIONALES</Text>
            <Text style={styles.tituloImagen}>Encontrá la atención que necesitás.</Text>
            <Text style={styles.descripcionImagen}>Conocé las especialidades disponibles en nuestra aplicación.</Text>
          </View>
        </View>

        <View style={styles.novedadOscura}>
          <Text style={styles.etiquetaOscura}>ORGANIZÁ TU TIEMPO</Text>
          <Text style={styles.tituloOscuro}>Tus próximos turnos, en un solo lugar.</Text>
          <Text style={styles.textoOscuro}>Consultá tus citas médicas y mantené todo organizado.</Text>
          <View style={styles.circulo}>
            <Text style={styles.iconoCalendario}>▦</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default Novedades;

const styles = StyleSheet.create({

  container: {
    marginBottom: 15
  },

  encabezado: {
    marginHorizontal: 20,
    marginBottom: 15
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
    gap: 13
  },

  novedadPrincipal: {
    width: 285,
    height: 240,
    justifyContent: 'flex-end'
  },

  sombra: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: 'rgba(0, 25, 55, 0.48)',
    borderRadius: 20
  },

  etiquetaBlanca: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2
  },

  tituloPrincipal: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 29
  },

  textoPrincipal: {
    fontSize: 12,
    color: '#eee',
    marginTop: 8,
    lineHeight: 18
  },

  novedadSocios: {
    width: 245,
    height: 240,
    backgroundColor: '#e5efff',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between'
  },

  etiquetaAzul: {
    color: '#004aad',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1
  },

  numero: {
    color: '#004aad',
    fontSize: 37,
    fontWeight: 'bold'
  },

  tituloSocios: {
    fontSize: 17,
    color: '#203b60',
    fontWeight: 'bold'
  },

  linea: {
    height: 1,
    backgroundColor: '#b9cfee',
    marginVertical: 4
  },

  textoSocios: {
    fontSize: 12,
    color: '#526b89',
    lineHeight: 18
  },

  novedadVerde: {
    width: 245,
    height: 240,
    backgroundColor: '#d9f2e8',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
  },

  etiquetaVerde: {
    color: '#16845b',
    fontWeight: 'bold',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 20
  },

  tituloVerde: {
    color: '#125b43',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 30,
    marginTop:10
  },

  textoVerde: {
    color: '#397762',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 12
  },

  flecha: {
    fontSize: 28,
    color: '#16845b',
    alignSelf: 'flex-end',
    marginTop: 10
  },

  novedadImagen: {
    width: 245,
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee'
  },

  foto: {
    width: '100%',
    height: 105
  },

  textoImagen: {
    padding: 14
  },

  etiquetaImagen: {
    color: '#004aad',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1
  },

  tituloImagen: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#26364b',
    marginTop: 7
  },

  descripcionImagen: {
    fontSize: 11,
    color: '#7c8795',
    lineHeight: 16,
    marginTop: 6
  },


  novedadOscura: {
    width: 245,
    height: 240,
    backgroundColor: '#253d5b',
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    justifyContent: 'space-between'
  },

  etiquetaOscura: {
    color: '#9fc5ff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1
  },

  tituloOscuro: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 27
  },

  textoOscuro: {
    color: '#c4d1e0',
    fontSize: 12,
    lineHeight: 18
  },

  circulo: {
    position: 'absolute',
    right: -15,
    bottom: -25,
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: '#365779',
    alignItems: 'center',
    justifyContent: 'center'
  },

  iconoCalendario: {
    color: '#fff',
    fontSize: 43,
    marginBottom: 15,
    marginRight: 10
  }

});
