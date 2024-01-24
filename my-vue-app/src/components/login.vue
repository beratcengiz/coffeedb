<template>
  <div id="app">
    {{ users }}
    <div class="login-page">
      <!-- <transition name="fade">
        <div v-if="!registerActive" class="wallpaper-login"></div>
      </transition> -->
      <div class="wallpaper-register"></div>

      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div v-if="!registerActive" class="card login" style="width: 500px;" v-bind:class="{ error: emptyFields }">
              <h1>Coffee</h1>
              <form class="form-group" @submit.prevent="doLogin">
                <input v-model="email" class="form-control" placeholder="Email" required>
                <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                <input type="submit" class="btn btn-primary">
                <p>Şifre Güncelle? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Buradan
                    Geçiş
                    Yap</a>
                </p>
                <!-- <p><a href="#">Forgot your password?</a></p> -->
              </form>
            </div>

            <div v-else class="card register" style="width: 500px;" v-bind:class="{ error: emptyFields }">
              <h1>Coffee</h1>
              <form class="form-group" @submit.prevent="editProducts">
                <input v-model="emailReg"  class="form-control" placeholder="Email" required>
                <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                <!-- <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required> -->
                <input type="submit" class="btn btn-primary">
                <p>Giriş <a href="#" @click="registerActive = !registerActive, emptyFields = false">Buradan
                    Geçiş Yap</a>
                </p>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script setup>
import Menu from './menu.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import router from '../router/router';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const users = ref([])
onMounted(() => {
  // ProductService.getProducts().then((data) => (products.value = data));
  
  getUser()
});
const email = ref("");
const emailReg = ref("");
const hidePassword = ref(true);
const password = ref("");
const passwordReg = ref("");
const getUser = async () => {
    await axios
      .get(
        "https://mock-data-5ynd.onrender.com/accounts"
      )
      .then((res) => {
        console.log('res', res)
        users.value = res.data
      })
      .catch((error) => console.log(error));
  };
const doLogin = () => {
  var object = {
    email: email.value,
    password: password.value
  }
  if (email.value == users.value[0].email && password.value == users.value[0].password) {
    localStorage.setItem('token', JSON.stringify(object));
    router.push('/admin');
  } else {
    toast("Hatalı Giriş!", {
      "theme": "auto",
      "type": "danger",
      "dangerouslyHTMLString": true
    })
  }
}
const editProducts = async () => {
  await axios.put(`https://mock-data-5ynd.onrender.com/accounts/1`,{
    id : 1,
    email: emailReg.value,
    password: passwordReg.value
  }).then(async(res) => {
  }).catch(async(error) => await getUser());
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
}
</script>

<style lang="scss">
p {
  line-height: 1rem;
}

.card {
  padding: 20px;
}

.form-group {
  input {
    margin-bottom: 20px;
  }
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;

  .wallpaper-login {
    background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .wallpaper-register {
    background: url('../assets/pexels-chevanon-photography-324028.jpg') no-repeat center center;
    background-size: cover;
    height: 100%;
    position: absolute;
    background-color: gray;
    width: 100%;
    z-index: -1;
  }

  h1 {
    margin-bottom: 1.5rem;
  }
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }

  25% {
    transform: translateX(25px);
  }

  50% {
    transform: translateX(-25px);
  }

  75% {
    transform: translateX(25px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>