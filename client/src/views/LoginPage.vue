<script>
import axios from "axios"

export default {
  data() {
    return {
      username: "",
      password: "",
      selectedRole: "student"
    }
  },
  methods: {
    async login() {
      try {
        console.log("Login clicked")

        const res = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password
        })

        console.log("Server response:", res.data)

        // If login failed
        if (!res.data.success) {
          alert(res.data.message || "Login failed")
          return
        }

        const role = res.data.user.role

        // Save role locally
        localStorage.setItem("role", role)

        // Redirect by role
        if (role === "admin") {
          this.$router.push("/admin")
        } 
        else if (role === "teacher") {
          this.$router.push("/teacher")
        } 
        else {
          this.$router.push("/student")
        }

      } catch (err) {
        console.error("Login error:", err.response?.data || err.message)
        alert("Server error — check backend")
      }
    }
  }
}
</script>





<template>
  <div class="page">
    <div class="login-box glass">
      <h2>Grading System Login</h2>

      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />

      <select v-model="selectedRole">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      <button @click="login">Login</button>

      <router-link to="/register">Create Student Account</router-link>
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

/* Center Card */
.login-box {
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 40px;
  text-align: center;
  border-radius: 18px;
  color: #222;
}

/* Glass Effect */
.glass {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

input, select {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #1e40af;
}

a {
  margin-top: 10px;
  color: #2563eb;
  text-decoration: none;
}
</style>
