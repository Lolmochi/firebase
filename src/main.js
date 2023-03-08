import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const firebaseConfig = {
    apiKey: "AIzaSyDQh-ksC-NpBLdHyqnieUgsgPPq1X7tQTw",
    authDomain: "infire-ddd33.firebaseapp.com",
    projectId: "infire-ddd33",
    storageBucket: "infire-ddd33.appspot.com",
    messagingSenderId: "368692115633",
    appId: "1:368692115633:web:81b16f6fe2cce3b551ca90"
};
const vuetify = createVuetify({
    components,
    directives,
  })

  const initfriebase = initializeApp(firebaseConfig);
  export const db = getFirestore(initfriebase);
  const app = createApp(App);

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
