# BuddyS
*codename: tinder-bar*

Web-based geolocation buddy finder application

### Installing

after clone create .env file in the folder backend with 
```
MONGO_DB_URI=**your mongodb URI with username and password**
```
after clone create .env file in the folder frontend with firebase data
```
REACT_APP_DB_API=//**firebaseConfigs.apiKey**
REACT_APP_authDomain=//**firebaseConfig.authDomain**
REACT_APP_databaseURL=//**firebaseConfig.databaseURL**
REACT_APP_projectId=//**firebaseConfig.projectId**
REACT_APP_storageBucket=//**firebaseConfig.storageBucket**
REACT_APP_messagingSenderId=//**firebaseConfig.messagingSenderId**
REACT_APP_DB_AppId=//**firebaseConfig.appId**

REACT_APP_GOOGLE_MAP_URI=/https://maps.googleapis.com/maps/api/js?key=** YOUR KEY **&v=3.exp&libraries=geometry,drawing,place
```
for root, backend and frontend
```
npm install
```

### Running

in frontend and backend folders
```
npm start
```
Web app will be available on http://localhost:3000/ by default

Server will be available on http://localhost:4000/ by default

### Functionality

* Registration and login
* User profile creation and editing
* Geolocation detection and search users within a selected radius with display on the map
* Сhat between users with notifications on Home page

### Team

* [Ruslan Niu](https://github.com/NiuRuslan)
* [Olga Kiba](https://github.com/olgakiba18796)
* [Danya Bunkov](https://github.com/danyabunkov)
* [Alexander Ivanov](https://github.com/Padavan-itbeard)

[Our Presentation](https://docs.google.com/presentation/d/e/2PACX-1vRPHVy0f6A0jrzonY7Xnq7z-uUChlAuCofMcldwGUzqLZ1sTEsqsgugWMVPWCaRBzRBLqRO81iLh157/pub?start=false&loop=false&delayms=5000)

### Next steps
* transfer photos to chat rooms
* adding redux for transferring information between components (for chat)
* user database transfer to firebase from mongodb

### По-русски

Веб приложение для поиска собеседника по интересам и геолокации.

### Функциональность

* Регистрация и вход в систему 
* Создание и редактирование профилей пользователей
* Обнаружение текущей геолокации и поиск пользователей в пределах выбранного радиуса с отображением на карте
* Чат между пользователями с уведомлениями на главной странице

### В планах
* отображение фотографий в чате
* внедрение REDUX для передачи информации между компонентами, в частности чата
* перенос базы данных пользователей на firebase с mongodb
