import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import api from './services/api';
import { MotoStatus } from './types/Moto';

export default function Cadastro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [moto, setMoto] = useState({ 
    placa: '', 
    posicao: '', 
    status: '' as MotoStatus 
  });

  const handleChange = (field: string, value: string) => {
    setMoto((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validações
    if (!moto.placa.trim()) {
      Alert.alert('Atenção', 'Por favor, informe a placa da moto.');
      return;
    }

    if (!moto.posicao.trim()) {
      Alert.alert('Atenção', 'Por favor, informe a posição da moto.');
      return;
    }

    if (!moto.status) {
      Alert.alert('Atenção', 'Por favor, selecione o status da moto.');
      return;
    }

    try {
      setLoading(true);

      // Gerar a data/hora atual
      const ultimaAtualizacao = new Date().toISOString();

      // Preparar os dados para a API
      const dadosMoto = {
        placa: moto.placa.toUpperCase().trim(),
        posicao: moto.posicao.toUpperCase().trim(),
        status: moto.status,
        ultimaAtualizacao: ultimaAtualizacao
      };

      console.log('📤 Enviando dados para API:', dadosMoto);

      // Fazer POST para a API
      const response = await api.post('/motos/criar', dadosMoto);

      console.log('✅ Moto cadastrada com sucesso:', response.data);

      Alert.alert(
        'Sucesso', 
        `Moto ${moto.placa} cadastrada com sucesso!\nPosição: ${moto.posicao}\nStatus: ${getStatusLabel(moto.status)}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Limpar formulário e voltar para a tela anterior
              setMoto({ placa: '', posicao: '', status: '' as MotoStatus });
              router.back();
            }
          }
        ]
      );

    } catch (error: any) {
      console.error('❌ Erro ao cadastrar moto:', error);
      
      let errorMessage = 'Erro ao cadastrar moto';
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = 'Dados inválidos. Verifique as informações.';
        } else if (error.response.status === 409) {
          errorMessage = 'Já existe uma moto com esta placa ou posição.';
        } else {
          errorMessage = `Erro ${error.response.status}: ${error.response.data?.message || 'Erro no servidor'}`;
        }
      } else if (error.request) {
        errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Função para obter o label do status
  const getStatusLabel = (status: MotoStatus): string => {
    const labels: Record<MotoStatus, string> = {
      pronta: 'Pronta para usar',
      revisao: 'Requer revisão',
      reservada: 'Reservada',
      'fora de serviço': 'Fora de serviço'
    };
    return labels[status] || status;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Nova Moto</Text>

      {/* Campo Placa */}
      <TextInput
        value={moto.placa}
        onChangeText={(text) => handleChange('placa', text)}
        style={styles.input}
        placeholder="Placa (ex: ABC1D23)"
        placeholderTextColor="#999"
        autoCapitalize="characters"
        maxLength={7}
        editable={!loading}
      />

      {/* Campo Posição */}
      <TextInput
        value={moto.posicao}
        onChangeText={(text) => handleChange('posicao', text)}
        style={styles.input}
        placeholder="Posição (ex: A1, B2, C3)"
        placeholderTextColor="#999"
        autoCapitalize="characters"
        editable={!loading}
      />

      {/* Select Status */}
      <RNPickerSelect
        onValueChange={(value) => handleChange('status', value)}
        value={moto.status}
        placeholder={{ label: 'Selecione o status...', value: null }}
        items={[
          { label: 'Pronta para usar', value: 'pronta' },
          { label: 'Requer revisão', value: 'revisao' },
          { label: 'Reservada', value: 'reservada' },
          { label: 'Fora de serviço', value: 'fora de serviço' },
        ]}
        style={pickerSelectStyles}
        disabled={loading}
      />

      {/* Botão de Cadastro */}
      <Pressable 
        style={[styles.botao, loading && styles.botaoDisabled]} 
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Cadastrar Moto</Text>
        )}
      </Pressable>

      {/* Links de Navegação */}
      <View style={styles.links}>
        <Link href="/Patio" style={styles.linkTexto}>
          📋 Ver Todas as Motos
        </Link>
        <Link href="/" style={styles.linkTexto}>
          🏠 Voltar ao Menu
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9f9f9',
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#0066cc',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  botaoDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  links: {
    alignItems: 'center',
    gap: 12,
  },
  linkTexto: {
    color: '#0066cc',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: '#000',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    color: '#000',
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});