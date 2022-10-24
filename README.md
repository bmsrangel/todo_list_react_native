# Todo List - React Native

## Descrição

Esta aplicação foi desenvolvida com o framework [React Native](https://reactnative.dev) como parte do curso MIT em Desenvolvimento Mobile, oferecido pelo instituto INFNET.

## Requisitos

O aplicativo é um "Todo List" simples, e atende aos seguintes requisitos:
- [x] Adicionar uma tarefa ({ name: string, state: 'todo' | 'doing' | 'completed' });
- [x] Remover uma tarefa;
- [x] Alterar o estado da tarefa (não iniciada, em andamento, terminada);
- [x] Listar as tarefas;
- [x] Pesquisar tarefas via campo de buscas com map e filter (implementar o debounce pattern para otimizar!).
- [x] Guardar o estado da aplicação em uma [AsyncStorage](https://github.com/react-native-async-storage/async-storage) para poder recuperá-lo depois que o app for fechado.

## Limitações

Este aplicativo foi desenvolvido com foco nos requisitos apenas. Design e tratamento de erros não foram devidamente considerados, e existe um "bug" conhecido, que possui relação ao uso do _dark theme_. Este "bug" será posteriormente corrigido, conforme mais conhecimento for adquirido.

## Utilização
### Arquivo .apk
Este repositório traz o arquivo *app-release.apk* na sua raiz. Para testar a aplicação, basta baixá-lo e instalá-lo no dispositivo.

### Build do projeto
Para executar o projeto a partir de seu código fonte, é necessário ter o React Native devidamente instalado e configurado.
Basta clonar/baixar este repositório e, na raiz, executar os comandos:
```bash
npm install
npm run android
```
