import { FontAwesome } from '@expo/vector-icons'; 
import { Link, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import api from './services/api';
import { Moto, MotoStatus } from './types/Moto';

const statusLabels: Record<MotoStatus, string> = {
  pronta: 'Pronta',
  revisao: 'Revisão',
  reservada: 'Reservada',
  "fora de serviço": 'Fora de serviço'
};

const statusColors: Record<MotoStatus, string> = {
  pronta: '#4ade80',
  revisao: '#f87171',
  reservada: '#60a5fa',
  "fora de serviço": '#9ca3af'
};

export default function Patio() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Buscar motos da API
  const carregarMotos = async () => {
    try {
      console.log('🔄 Buscando motos da API...');
      const response = await api.get<Moto[]>('/motos');
      console.log('✅ Dados recebidos:', response.data.length, 'motos');
      setMotos(response.data);
    } catch (error) {
      console.error('❌ Erro ao carregar motos:', error);
      Alert.alert('Erro', 'Não foi possível carregar as motos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Excluir moto
  const excluirMoto = async (id: string) => {
    try {
      Alert.alert(
        'Confirmar Exclusão',
        'Tem certeza que deseja excluir esta moto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              try {
                console.log('🗑️ Excluindo moto:', id);
                await api.delete(`/motos/delete/${id}`);
                
                // Atualizar lista local
                setMotos(prevMotos => prevMotos.filter(moto => moto.id !== id));
                
                Alert.alert('Sucesso', 'Moto excluída com sucesso!');
              } catch (error) {
                console.error('❌ Erro ao excluir moto:', error);
                Alert.alert('Erro', 'Não foi possível excluir a moto');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('❌ Erro ao excluir moto:', error);
      Alert.alert('Erro', 'Não foi possível excluir a moto');
    }
  };

  // Recarregar quando a tela receber foco
  useFocusEffect(
    useCallback(() => {
      console.log('🎯 Tela Patio em foco - recarregando dados...');
      carregarMotos();
    }, [])
  );

  // Função para pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    carregarMotos();
  };

  const getStatusLabel = (status: MotoStatus): string => {
    return statusLabels[status] || status;
  };

  const getStatusColor = (status: MotoStatus): string => {
    return statusColors[status] || '#6b7280';
  };

  // Formatar data
  const formatarData = (dataString: string) => {
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Data inválida';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DCD9F" />
          <Text style={styles.loadingText}>Carregando motos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de Motos</Text>
        <Text style={styles.subtitle}>Total: {motos.length} motos</Text>
        <Link href="/Cadastro" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar nova moto</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {motos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.noMotosText}>Nenhuma moto cadastrada.</Text>
          <TouchableOpacity onPress={carregarMotos} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={motos}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <FontAwesome 
                name="motorcycle" 
                size={24} 
                color={getStatusColor(item.status)} 
                style={styles.icon} 
              />
              <View style={styles.textContainer}>
                <Text style={styles.placa}>
                  {item.placa}
                </Text>
                <Text style={styles.posicao}>
                  Posição: {item.posicao}
                </Text>
                <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                  Status: {getStatusLabel(item.status)}
                </Text>
                <Text style={styles.data}>
                  Atualizado: {formatarData(item.ultimaAtualizacao)}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => excluirMoto(item.id)} 
                style={styles.excluirButton}
              >
                <Text style={styles.excluirText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={styles.footer}>
        <Link href="/HomeScreen" style={styles.link}>Voltar ao Menu</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    backgroundColor: '#1DCD9F', 
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#222', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noMotosText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1DCD9F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  placa: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  posicao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  status: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: '500',
  },
  data: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    fontSize: 16,
    color: '#6200ee',
    textDecorationLine: 'underline',
  },
  excluirButton: {
    marginLeft: 'auto',
    backgroundColor: '#ef4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  excluirText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});