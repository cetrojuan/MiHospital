export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: {
    rol: 'Paciente' | 'Medico';
  };
  HomePaciente: {
    nombre: string,
    rol: 'Paciente',
  };
  HomeMedico:{
    nombre: string;
    rol: 'Medico';
  };
};