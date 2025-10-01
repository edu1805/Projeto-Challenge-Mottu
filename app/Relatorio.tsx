import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Moto, MotoStatus } from './types/Moto';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import api from './services/api';

const statusLabels: Record<MotoStatus, string> = {
  pronta: 'Pronta',
  revisao: 'Revisão',
  reservada: 'Reservada',
  "fora de serviço": 'Fora de serviço'
};

export default function Relatorio() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Buscar motos da API
  const carregarMotos = async () => {
    try {
      console.log('🔄 Buscando motos para relatório...');
      const response = await api.get<Moto[]>('/motos');
      console.log('✅ Dados recebidos para relatório:', response.data.length, 'motos');
      setMotos(response.data);
    } catch (error) {
      console.error('❌ Erro ao carregar motos:', error);
      Alert.alert('Erro', 'Não foi possível carregar as motos para o relatório');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarMotos();
    }, [])
  );

  // Função para pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    carregarMotos();
  };

  const motosPorStatus = (status: MotoStatus) => {
    return motos.filter((moto) => moto.status === status);
  };

  // Calcular totais por status
  const totaisPorStatus = Object.keys(statusLabels).reduce((acc, statusKey) => {
    const status = statusKey as MotoStatus;
    acc[status] = motosPorStatus(status).length;
    return acc;
  }, {} as Record<MotoStatus, number>);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Carregando relatório...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Relatório de Motos por Status</Text>
      
      {/* Card de totais */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total de motos cadastradas: {motos.length}</Text>
        <View style={styles.totaisContainer}>
          {Object.keys(statusLabels).map((statusKey) => {
            const status = statusKey as MotoStatus;
            return (
              <Text key={status} style={styles.totalStatus}>
                {statusLabels[status]}: {totaisPorStatus[status]}
              </Text>
            );
          })}
        </View>
      </View>

      {/* Lista por status */}
      <FlatList
        data={Object.keys(statusLabels)}
        keyExtractor={(statusKey) => statusKey}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item: statusKey }) => {
          const status = statusKey as MotoStatus;
          const motosFiltradas = motosPorStatus(status);

          if (motosFiltradas.length === 0) {
            return null; // Não mostra seção se não houver motos
          }

          return (
            <View style={styles.section}>
              <Text style={styles.statusTitle}>
                {statusLabels[status]}: {motosFiltradas.length}
              </Text>
              <View style={styles.motosList}>
                {motosFiltradas.map((moto) => (
                  <View key={moto.id} style={styles.motoItem}>
                    <Text style={styles.motoPlaca}>{moto.placa}</Text>
                    <Text style={styles.motoPosicao}>Posição: {moto.posicao}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma moto cadastrada</Text>
            <TouchableOpacity onPress={carregarMotos} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/')}>
        <Text style={styles.addButtonText}>Voltar ao menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1f2937'
  },
  totalBox: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0369a1'
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: 8
  },
  totaisContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  totalStatus: {
    fontSize: 14,
    color: '#0369a1',
    backgroundColor: '#bae6fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8
  },
  motosList: {
    gap: 8
  },
  motoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6'
  },
  motoPlaca: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  motoPosicao: {
    fontSize: 14,
    color: '#6b7280'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emptyText: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center'
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});