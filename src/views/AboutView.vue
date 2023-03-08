<template>
  <div>
    <v-text-field
      label="ชื่อเมนูภาษาไทย"
      v-model="menu.nameTH"
      variant="solo"
    ></v-text-field>
    <v-text-field
      label="NameEng"
      v-model="menu.nameeng"
      variant="solo"
    ></v-text-field>
    <v-text-field label="ราคา" v-model="menu.price" variant="solo"></v-text-field>
    <v-textarea label="Detal" v-model="menu.detail" variant="solo"></v-textarea>
    <v-btn
      prepend-icon="mdi-hamburger-plus"
      variant="tonal"
      color="deep-purple-darken-1"
      @click="AddMenu()"
    >
      AddMenu
    </v-btn>
    <v-btn
      prepend-icon="mdi-hamburger-plus"
      variant="tonal"
      color="light-blue-darken-1"
      @click="SHOWMENU()"
    >
      ShowMenu
    </v-btn>

  </div>

  <v-table>
    <thead>
      <tr>
        <th class="text-left">รหัสคำสั่ง</th>
        <th class="text-left">ชื่อเมนู</th>
        <th class="text-left">name</th>
        <th class="text-left">ราคา</th>
        <th class="text-left">รายละเอียด</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in allmenu" :key="item.name">
        <td>{{ item.id }}</td>
        <td>{{ item.data.nameTH }}</td>
        <td>{{ item.data.nameeng }}</td>
        <td>{{ item.data.price }}</td>
        <td>{{ item.data.detail }}</td>
        <v-btn @click="Delete(item.id)" variant="tonal" color=red-accent-3>Delete</v-btn>
        <v-btn @click="Edit(item.id)" variant="tonal" color=cyan-lighten-2>Edit </v-btn>
        <v-btn @click="confirm(item.id)" variant="tonal" color=teal-lighten-1>Confirm </v-btn>

      </tr>
    </tbody>
  </v-table>
</template>
<script setup>
import { ref } from "vue";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { db } from "../main.js";
const menu = ref({ nameTH: "", nameeng: "", price: 0, detail: "" });

async function AddMenu() {
  try {
    const docRef = await addDoc(collection(db, "Jfood"), menu.value);
    console.log("Document written with ID: ", docRef.id);
    alert("เพิ่มเมนูเสร็จสิ้น");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const allmenu = ref([]);
async function SHOWMENU() {
  const querySnapshot = await getDocs(collection(db, "Jfood"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const mydata = ref({ id: doc.id, data: doc.data() });
    allmenu.value.push(mydata.value);
  });
}

async function Delete(data) {
  if (confirm("ต้องการลบเมนูหรือไม่ ?")) {
    await deleteDoc(doc(db, "Jfood", data));
  }
}

const datamenu = ref();
async function Edit(data2) {
  const docRef = doc(db, "Jfood", data2);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.id, docSnap.data());
    datamenu.value = (docSnap.data())
    menu.value = datamenu.value;
  } else {
    console.log("No such document!");
    
  }
}

async function confirm(data1) {
  await setDoc(doc(db, "Jfood", data1), menu.value);
  console.log("dddd");
  alert("แก้ไขเสร็จสิ้น");
}
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
