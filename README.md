# 🛵 MotoMap - Mottu Challenge

### 👨‍💻 Integrantes:
- Eduardo do Nascimento Barriviera - **RM 555309**
- Thiago Lima de Freitas - **RM 556795**
- Bruno Centurion Fernandes - **RM 556531**

---

## 💡 Solução 

A Mottu enfrenta o desafio de localizar rapidamente motos em seus pátios, que frequentemente se encontram desorganizados e com alto volume de veículos. Essa dificuldade impacta diretamente a eficiência logística, especialmente quando é necessário identificar motos com problemas ou sem placa.

Nossa solução consiste em um aplicativo móvel desenvolvido com React Native e Expo, que simula o controle de estoque e localização de motos nos pátios. A proposta considera o uso de sensores RFID e o mapeamento das motos, com uma interface amigável para facilitar a visualização e o gerenciamento dos veículos.

---

## 📌 Funcionalidades

A aplicação permite:

### 🏍️ Gerenciamento de Motos
- ✅ **Cadastro de motos** com:
  - Placa
  - Posição no pátio
  - **Status:** *pronta*, *revisão*, *reservada*, *fora de serviço*
- 📋 **Listagem completa** das motos cadastradas
- 🔄 **Atualização** de informações das motos
- ❌ **Exclusão** de motos do sistema
- 📊 **Relatórios por status** com contagem e exibição

### 🎨 Interface e Experiência
- 🌗 **Tema claro/escuro** com alternância manual
- 🌍 **Internacionalização (i18n)** para Português (PT-BR) e Espanhol (ES)
- 🔔 **Notificações push locais** ao cadastrar novas motos
- 💾 **Sistema de autenticação** com Firebase

---

## 🛠️ Tecnologias Utilizadas

- **React Native** com **Expo**
- **TypeScript**
- **Expo Router** para navegação
- **Firebase** para autenticação
- **i18next** para internacionalização
- **expo-notifications** para notificações locais
- **Context API** para gerenciamento de tema
- **Axios** para requisições HTTP

---

## 🚀 Como rodar o projeto localmente

### **1. Rode a API da disciplina de DotNet:**
> https://github.com/edu1805/Challange-DotNet03

### **2. Clone o repositório**
```bash
git clone https://github.com/edu1805/Projeto-Challenge-Mottu.git
cd Projeto-Challenge-Mottu
```

### **3. Instale as dependências**
```bash
npm install
```

### **4. Configure as variáveis de ambiente**
Crie um arquivo de configuração para a API (se necessário) e configure o Firebase.

### **5. Inicie o projeto com o Expo**
```bash
npm start
```

> Ou rode `npm run android` para executar diretamente no Android.
> 
> Use `npm run ios` para executar no iOS (requer macOS).

---

## 📱 Recursos Adicionais

### 🌐 Alternância de Idioma
O aplicativo suporta dois idiomas:
- 🇧🇷 Português (PT-BR)
- 🇪🇸 Espanhol (ES)

A troca de idioma é feita em tempo real através de um botão na interface.

### 🔔 Notificações
Ao cadastrar uma nova moto, o usuário recebe uma notificação local no dispositivo com:
- Placa da moto
- Posição no pátio
- Status atual

### 🎨 Temas
O aplicativo oferece dois temas visuais:
- ☀️ **Tema Claro** - Interface clara e moderna
- 🌙 **Tema Escuro** - Reduz fadiga visual em ambientes com pouca luz
