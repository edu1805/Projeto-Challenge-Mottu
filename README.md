# 🛵 MotoMap - Mottu Challenge

### 👨‍💻 Integrantes:
- Eduardo do NAscimento Barriviera - **RM 555309**
- Thiago Lima de Freitas - **RM 556795**
- Bruno Centurion Fernandes - **RM 556531**

---
## 💡 Solução 
### A Mottu enfrenta o desafio de localizar rapidamente motos em seus pátios, que frequentemente se encontram desorganizados e com alto volume de veículos. Essa dificuldade impacta diretamente a eficiência logística, especialmente quando é necessário identificar motos com problemas ou sem placa.

### Nossa solução consiste em um aplicativo móvel desenvolvido com React Native e Expo, que simula o controle de estoque e localização de motos nos pátios. A proposta considera o uso de sensores RFID e o mapeamento das motos por coordenadas (X, Y), com uma interface amigável para facilitar a visualização e o gerenciamento dos veículos.
---
## 📌 Descrição da Solução
A aplicação permite:

- ✅ Cadastro de motos com:
  - Placa ou identificação sem placa;
  - **Status:** *pronta*, *revisao*, *reservada*, *sem placa*;
- 📊 Relatórios por status com contagem e exibição das motos;
- 📋 Listagem completa das motos cadastradas;
- 🔄 Atualização e ❌ exclusão de cadastros;
- 📍 Visualização da localização por coordenadas (X, Y) (**_em desenvolvimento_**);
- 💾 Armazenamento local com AsyncStorage para simulação de persistência.
---
## 🚀 Como rodar o projeto localmente
**1. Clone o repositório**
```bash
git clone https://github.com/edu1805/Projeto-Challenge-Mottu.git
cd seu-repositorio
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicie o projeto com o Expo**
```bash
npm start
```
> Ou rode `npm run android` para rodar diretamente na versão de android.
