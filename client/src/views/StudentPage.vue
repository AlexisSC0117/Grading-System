<script setup>

import { useRouter } from "vue-router"

const router = useRouter()

onMounted(() => {
  if (localStorage.getItem("role") !== "student") {
    alert("Access denied!")
    router.push("/")
  }
})

import { ref, onMounted } from "vue"
import axios from "axios"

const name = ref("")
const selected = ref("")
const subjects = ref([])
const activities = ref([])
const answers = ref({})

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/subjects")
  subjects.value = res.data
})

const loadActivities = async () => {
  if (!selected.value) return
  const res = await axios.get(
    `http://localhost:3000/activities/${selected.value.subject}`
  )
  activities.value = res.data
}

const submitAttendance = async () => {
  await axios.post("http://localhost:3000/attendance", {
    name: name.value,
    subject: selected.value.subject,
    year: selected.value.year,
    time: new Date().toLocaleTimeString()
  })

  await loadActivities()
  alert("Attendance saved! Activities loaded.")
}

const submitAnswer = async (title) => {
  await axios.post("http://localhost:3000/submit-answer", {
    studentName: name.value,
    activityTitle: title,
    answer: answers.value[title]
  })
  alert("Answer submitted!")
}
</script>

<template>
  <div style="padding:40px;">
    <h2>Student Portal</h2>

    <input v-model="name" placeholder="Student Name" />

    <br><br>

    <select v-model="selected">
      <option disabled value="">Select Subject</option>
      <option v-for="(s, index) in subjects" :key="index" :value="s">
        {{ s.subject }} — {{ s.year }}
      </option>
    </select>

    <br><br>

    <button @click="submitAttendance">Submit Attendance</button>

    <hr style="margin:20px 0;" />

    <h3>Activities</h3>

    <div v-for="(a, index) in activities" :key="index" style="margin-bottom:20px;">
      <h4>{{ a.title }}</h4>
      <p>{{ a.question }}</p>

      <textarea 
        v-model="answers[a.title]" 
        placeholder="Write your answer..."
      ></textarea>

      <br><br>

      <button @click="submitAnswer(a.title)">Submit Answer</button>
    </div>
  </div>
</template>


<style>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>