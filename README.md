# insta fake
Esse aplicativo faz uma simulação do Instagram.

# Instalar dependências
```
npm i -g yarn
yarn
```

# Criar um novo app
```
npm install -g react-native-cli
react-native init nome-do-app
```

# Ver os aparelhos conectados via USB
```
adb devices
```

# Dar permissão ao gradle
```
chmod +x android/gradlew
```

# Iniciar a API fake
```
npm install -g json-server
json-server --watch server.json
```

# Fazer a aplicação enxergar a API
```
adb reverse tcp:3000 tcp:3000
```

# Iniciar a aplicação
```
yarn start
yarn android
```

# Autor
Kenneth Gottschalk de Azevedo :)