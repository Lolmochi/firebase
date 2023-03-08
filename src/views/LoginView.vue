<template>
  <div>
    <v-responsive class="mx-auto" max-width="344">
      <v-text-field
        hide-details="auto"
        label="Email address"
        placeholder="johndoe@gmail.com"
        type="email"
        v-model="email"
      ></v-text-field
      ><br />
      <v-text-field
        label="Password"
        type="password"
        hint="Enter your password to access this website"
        v-model="pwd"
      ></v-text-field>
    </v-responsive>
    <v-btn @click="register()">register</v-btn>
    <v-btn @click="Login()">login</v-btn>
  </div>
</template>

<script setup>
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const pwd = ref("");
const email = ref("");
const Login = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("OK");
      console.log(user);
      router.push("/about");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      alert("No");
    });
};
const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, pwd.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Successfully Register" + user);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
};
</script>
