import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mockMotos } from './data/mockMoto';
import { Moto, MotoStatus } from './types/Moto';


const statusColors: Record<MotoStatus, string> = {
  pronta: '#4ade80',
  revisao: '#f87171',
  reservada: '#60a5fa',
  sem_placa: '#9ca3af'
};

const statusLabels: Record<MotoStatus, string> = {
  pronta: 'Pronta',
  revisao: 'Revisão',
  reservada: 'Reservada',
  sem_placa: 'Sem placa'
};

const PatioGrid: React.FC = () => {
  const router = useRouter();

  const [motos, setMotos] = useState<Moto[]>(mockMotos);
  const [selectedMoto, setSelectedMoto] = useState<Moto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (moto: Moto) => {
    setSelectedMoto(moto);
    setModalVisible(true);
  };

  const handleStatusChange = (newStatus: MotoStatus) => {
    if (!selectedMoto) return;
    const atualizadas = motos.map((m) =>
      m.id === selectedMoto.id ? { ...m, status: newStatus } : m
    );
    setMotos(atualizadas);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Dashboard de Motos</Text>

      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        numColumns={4}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.motoBox,
              { borderColor: statusColors[item.status] }
            ]}
            onPress={() => handlePress(item)}
          >
            <FontAwesome name="motorcycle" size={20} color="#1f2937" />
            <Text style={styles.placa}>{item.placa}</Text>
          </Pressable>
        )}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/Cadastro')} >
          <Text style={styles.addButtonText}>+ Nova Moto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('Patio')}>
          <Text style={styles.addButtonText}>Ver todas as motos</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Edição */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Status</Text>
            {Object.keys(statusLabels).map((statusKey) => {
              const status = statusKey as MotoStatus;
              return (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusButton,
                    { borderColor: statusColors[status] }
                  ]}
                  onPress={() => handleStatusChange(status)}
                >
                  <Text style={{ color: statusColors[status], fontWeight: 'bold' }}>
                    {statusLabels[status]}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PatioGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  grid: {
    gap: 12
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12
  },
  motoBox: {
    width: '23%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 6
  },
  placa: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  statusButton: {
    borderWidth: 2,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center'
  },
  cancel: {
    marginTop: 12,
    color: '#6b7280',
    fontWeight: '600'
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
    alignSelf: 'flex-start'
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }

});
