import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const motos = [
  { id: '1', placa: 'ABC1234', motor: 'OK', situacao: 'prontas para uso' },
  { id: '2', placa: 'XYZ5678', motor: 'com defeito', situacao: 'motor com defeito' },
  { id: '3', placa: '---', motor: 'OK', situacao: 'sem placa' },
  { id: '4', placa: 'AAA1111', motor: 'OK', situacao: 'reservada' },
];

export default function Home() {
  const grupos = [
    { titulo: 'Prontas para uso', filtro: 'prontas para uso', cor: 'green' },
    { titulo: 'Com problema', filtro: 'motor com defeito', cor: 'red' },
    { titulo: 'Sem placa', filtro: 'sem placa', cor: 'orange' },
    { titulo: 'Reservadas', filtro: 'reservada', cor: 'blue' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Dashboard de Motos</Text>
      {grupos.map(({ titulo, filtro, cor }) => (
        <View key={filtro} style={styles.grupo}>
          <Text style={styles.subtitulo}>{titulo}</Text>
          <View style={styles.lista}>
            {motos.filter(m => m.situacao === filtro).map((m) => (
              <MaterialCommunityIcons
                key={m.id}
                name="motorbike"
                size={40}
                color={cor}
                style={{ marginRight: 10 }}
              />
            ))}
          </View>
        </View>
      ))}
      <Link href="/Cadastro">Cadastrar Moto</Link>
      <Link href="/Patio">Ver todas</Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  grupo: { marginBottom: 20 },
  subtitulo: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  lista: { flexDirection: 'row', flexWrap: 'wrap' },
});