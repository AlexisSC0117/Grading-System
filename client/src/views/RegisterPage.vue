<script>
import axios from "axios"

export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    async register() {
      try {
        const res = await axios.post("http://localhost:3000/register-student", {
          username: this.username,
          password: this.password
        })

        console.log("Register response:", res.data)

        if (!res.data.success) {
          alert(res.data.message || "Registration failed")
          return
        }

        alert("Student account created!")
        this.$router.push("/")

      } catch (err) {
        console.error("Register error:", err.response?.data || err.message)
        alert(err.response?.data?.message || "Server error")
      }
    }
  }
}
</script>




<template>
  <div class="page">
    <div class="register-box glass">
      <h2>Create Account</h2>

      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="register">Register</button>

      <router-link to="/">Back to Login</router-link>
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

/* Register Card */
.register-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 360px;
  padding: 40px;
  text-align: center;
  border-radius: 16px;
  color: #222;
}

/* Glass Effect */
.glass {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  padding: 12px;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #15803d;
}

a {
  margin-top: 10px;
  color: #2563eb;
  text-decoration: none;
}
</style>

