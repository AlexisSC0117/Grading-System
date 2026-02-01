<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const students = ref([])

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/all-students")
  students.value = res.data
})
</script>

<template>
  <div style="padding:40px;">
    <h2>Teacher Dashboard</h2>

    <div v-for="(student, index) in students" :key="index">
      <h3>{{ student.name }}</h3>

      <ul>
        <li v-for="(answer, i) in student.answers" :key="i">
          <strong>{{ answer.activityTitle }}</strong>  
          <br>
          Answer: {{ answer.answer }}  
          <br>
          Score: {{ answer.score ?? "Not graded" }}
        </li>
      </ul>

      <hr>
    </div>
  </div>
</template>
