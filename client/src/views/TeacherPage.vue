<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()

// Guard Teacher Only
onMounted(() => {
  if (localStorage.getItem("role") !== "teacher") {
    alert("Access denied!")
    router.push("/")
  }
})

// State
const subject = ref("")
const year = ref("")
const subjects = ref([])

const activityTitle = ref("")
const question = ref("")
const selectedSubject = ref("")

// Load subjects safely
const loadSubjects = async () => {
  try {
    const res = await axios.get("http://localhost:3000/subjects")
    subjects.value = res.data
  } catch {
    console.warn("Subjects not loaded yet")
  }
}

// Add subject
const addSubject = async () => {
  try {
    await axios.post("http://localhost:3000/add-subject", {
      subject: subject.value,
      year: year.value
    })

    subject.value = ""
    year.value = ""
    loadSubjects()
  } catch {
    alert("Failed to add subject")
  }
}

// Create activity
const createActivity = async () => {
  if (!selectedSubject.value) {
    alert("Select a subject first")
    return
  }

  try {
    await axios.post("http://localhost:3000/activity", {
      subject: selectedSubject.value.subject,
      title: activityTitle.value,
      question: question.value
    })

    activityTitle.value = ""
    question.value = ""
    alert("Activity created!")
  } catch {
    alert("Failed to create activity")
  }
}

onMounted(loadSubjects)
</script>

<template>
  <div class="teacher-page">
    <div class="panel glass">
      <h2>Teacher Panel</h2>

      <h3>Add Subject</h3>
      <input v-model="subject" placeholder="Subject Name" />
      <input v-model="year" placeholder="Year Level" />
      <button @click="addSubject">Add Subject</button>

      <ul>
        <li v-for="(s, index) in subjects" :key="index">
          {{ s.subject }} — {{ s.year }}
        </li>
      </ul>

      <hr />

      <h3>Create Activity</h3>

      <select v-model="selectedSubject">
        <option disabled value="">Select Subject</option>
        <option v-for="(s, index) in subjects" :key="index" :value="s">
          {{ s.subject }} — {{ s.year }}
        </option>
      </select>

      <input v-model="activityTitle" placeholder="Activity Title" />
      <textarea v-model="question" placeholder="Activity Question"></textarea>

      <button @click="createActivity">Create Activity</button>
    </div>
  </div>
</template>

<style scoped>
.teacher-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel {
  width: 420px;
  padding: 25px;
  border-radius: 18px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input, textarea, select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
button {
  padding: 10px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
}
</style>
