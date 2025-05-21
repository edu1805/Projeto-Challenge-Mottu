export type MotoStatus = 'pronta' | 'revisao' | 'reservada' | 'sem_placa';

export interface Moto {
  id: string;
  placa: string;
  status: MotoStatus;
  coordenadaX: number;
  coordenadaY: number;
}
