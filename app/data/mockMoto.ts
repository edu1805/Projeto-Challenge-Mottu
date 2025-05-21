import { Moto } from '../types/Moto';

export const mockMotos: Moto[] = [
  // Prontas
  { id: 'moto01', placa: 'AAA1234', status: 'pronta', coordenadaX: 1, coordenadaY: 1 },
  { id: 'moto02', placa: 'AAA2345', status: 'pronta', coordenadaX: 2, coordenadaY: 1 },
  { id: 'moto03', placa: 'AAA3456', status: 'pronta', coordenadaX: 3, coordenadaY: 1 },
  { id: 'moto04', placa: 'AAA4567', status: 'pronta', coordenadaX: 4, coordenadaY: 1 },
  { id: 'moto05', placa: 'AAA5678', status: 'pronta', coordenadaX: 5, coordenadaY: 1 },

  // Revisão
  { id: 'moto06', placa: 'BBB1234', status: 'revisao', coordenadaX: 1, coordenadaY: 2 },
  { id: 'moto07', placa: 'BBB2345', status: 'revisao', coordenadaX: 2, coordenadaY: 2 },
  { id: 'moto08', placa: 'BBB3456', status: 'revisao', coordenadaX: 3, coordenadaY: 2 },
  { id: 'moto09', placa: 'BBB4567', status: 'revisao', coordenadaX: 4, coordenadaY: 2 },
  { id: 'moto10', placa: 'BBB5678', status: 'revisao', coordenadaX: 5, coordenadaY: 2 },

  // Reservada
  { id: 'moto11', placa: 'CCC1234', status: 'reservada', coordenadaX: 1, coordenadaY: 3 },
  { id: 'moto12', placa: 'CCC2345', status: 'reservada', coordenadaX: 2, coordenadaY: 3 },
  { id: 'moto13', placa: 'CCC3456', status: 'reservada', coordenadaX: 3, coordenadaY: 3 },
  { id: 'moto14', placa: 'CCC4567', status: 'reservada', coordenadaX: 4, coordenadaY: 3 },
  { id: 'moto15', placa: 'CCC5678', status: 'reservada', coordenadaX: 5, coordenadaY: 3 },

  // Sem Placa
  { id: 'moto16', placa: 'DDD1234', status: 'sem_placa', coordenadaX: 1, coordenadaY: 4 },
  { id: 'moto17', placa: 'DDD2345', status: 'sem_placa', coordenadaX: 2, coordenadaY: 4 },
  { id: 'moto18', placa: 'DDD3456', status: 'sem_placa', coordenadaX: 3, coordenadaY: 4 },
  { id: 'moto19', placa: 'DDD4567', status: 'sem_placa', coordenadaX: 4, coordenadaY: 4 },
  { id: 'moto20', placa: 'DDD5678', status: 'sem_placa', coordenadaX: 5, coordenadaY: 4 },
];
