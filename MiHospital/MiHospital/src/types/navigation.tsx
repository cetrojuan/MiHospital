export type RootStackParamList = {
  Loading: undefined;
  Home: undefined;
  Register: undefined;
  Login: {
    rol: 'Paciente' | 'Medico';
  };
  HomePaciente: {
    nombre: string;
    dni: string;
    rol: 'Paciente',
  };
  HomeMedico:{
    nombre: string;
    dni: string;
    rol: 'Medico';
  };
  NuevoTurno:{
    nombre: string;
    dni: string;
  }
  NuevaAgenda:{
    nombre: string;
    dni: string;
  }
};