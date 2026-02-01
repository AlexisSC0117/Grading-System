<script setup>
import { ref } from "vue"
import axios from "axios"

const username = ref("")
const password = ref("")

const createTeacher = async () => {
  try {
    const res = await axios.post("http://localhost:3000/register-teacher", {
      username: username.value,
      password: password.value,
      adminKey: "ADMIN_SECRET_123"
    })

    alert(res.data.message)

    if (res.data.success) {
      username.value = ""
      password.value = ""
    }

  } catch (err) {
    alert("Server error")
    console.error(err)
  }
}
</script>

<template>
  <div class="page">
    <div class="box glass">
      <h2>Create Teacher Account</h2>

      <input v-model="username" placeholder="Teacher Username" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="createTeacher">Create Teacher</button>
    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 350px;
  padding: 35px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
}
</style>
