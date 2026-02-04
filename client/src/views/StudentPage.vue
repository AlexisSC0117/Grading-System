<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const name = ref("")
const activities = ref([])
const answer = ref("")

const loadActivities = async () => {
  try {
    const res = await axios.get("http://localhost:3000/activities")
    activities.value = res.data
  } catch {
    alert("Failed to load activities")
  }
}

const submitAnswer = async (activity) => {
  if (!answer.value) {
    alert("Write an answer")
    return
  }

  await axios.post("http://localhost:3000/submit-answer", {
    student: name.value,
    subject: activity.subject,
    title: activity.title,
    answer: answer.value
  })

  answer.value = ""
  alert("Answer submitted!")
}

onMounted(loadActivities)
</script>

<template>
  <div style="padding:40px;">
    <h2>Student Portal</h2>

    <input v-model="name" placeholder="Student Name" />

    <div v-for="(act, index) in activities" :key="index" style="margin-top:20px;">
      <h3>{{ act.subject }} — {{ act.title }}</h3>
      <p>{{ act.question }}</p>

      <textarea 
        v-model="answer" 
        placeholder="Write your answer"
        style="width:100%; height:80px;"
      ></textarea>

      <br><br>

      <button @click="submitAnswer(act)">
        Submit Answer
      </button>
    </div>
  </div>
</template>

<style scoped>
textarea {
  padding: 10px;
}
</style>
