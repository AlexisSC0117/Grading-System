const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express()
app.use(cors())
app.use(express.json())

// =======================
// FILES
// =======================
const USERS_FILE = "./users.json"
const SUBJECTS_FILE = "./subjects.json"
const ACTIVITIES_FILE = "./activities.json"
const ANSWERS_FILE = "./answers.json"

// =======================
// ADMIN ACCOUNT
// =======================
const ADMIN = {
  username: "admin",
  password: "admin123",
  role: "admin"
}

// =======================
// INIT FILES
// =======================
function ensureFile(file, defaultData = []) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultData, null, 2))
  }
}

ensureFile(USERS_FILE)
ensureFile(SUBJECTS_FILE)
ensureFile(ACTIVITIES_FILE)
ensureFile(ANSWERS_FILE)

// =======================
// HELPERS
// =======================
const load = file => JSON.parse(fs.readFileSync(file))
const save = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2))

// =======================
// REGISTER STUDENT ONLY
// =======================
app.post("/register-student", (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    return res.json({ success: false, message: "Missing fields" })

  const users = load(USERS_FILE)

  if (users.find(u => u.username === username))
    return res.json({ success: false, message: "User already exists" })

  users.push({ username, password, role: "student" })
  save(USERS_FILE, users)

  console.log("Student registered:", username)

  res.json({ success: true, message: "Student registered successfully" })
})

// =======================
// ADMIN CREATE TEACHER
// =======================
app.post("/register-teacher", (req, res) => {
  const { username, password, adminKey } = req.body

  console.log("Teacher register request:", req.body)

  if (adminKey !== "ADMIN_SECRET_123")
    return res.json({ success: false, message: "Unauthorized admin key" })

  if (!username || !password)
    return res.json({ success: false, message: "Missing fields" })

  const users = load(USERS_FILE)

  if (users.find(u => u.username === username))
    return res.json({ success: false, message: "User already exists" })

  users.push({ username, password, role: "teacher" })
  save(USERS_FILE, users)

  console.log("Teacher created:", username)

  res.json({ success: true, message: "Teacher account created" })
})

// =======================
// LOGIN SYSTEM
// =======================
app.post("/login", (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    return res.json({ success: false, message: "Missing fields" })

  // Admin login
  if (username === ADMIN.username && password === ADMIN.password) {
    return res.json({ success: true, user: ADMIN })
  }

  const users = load(USERS_FILE)

  const user = users.find(
    u => u.username === username && u.password === password
  )

  if (!user)
    return res.json({ success: false, message: "Invalid credentials" })

  res.json({ success: true, user })
})

// =======================
// SUBJECTS
// =======================
app.get("/subjects", (req, res) => {
  res.json(load(SUBJECTS_FILE))
})

app.post("/add-subject", (req, res) => {
  const { subject, year } = req.body

  const subjects = load(SUBJECTS_FILE)
  subjects.push({ subject, year })

  save(SUBJECTS_FILE, subjects)
  res.json({ success: true })
})

// =======================
// ACTIVITIES
// =======================
app.post("/activity", (req, res) => {
  const activities = load(ACTIVITIES_FILE)
  activities.push(req.body)

  save(ACTIVITIES_FILE, activities)
  res.json({ success: true })
})

app.get("/activities", (req, res) => {
  res.json(load(ACTIVITIES_FILE))
})

// =======================
// STUDENT ANSWERS
// =======================
app.post("/submit-answer", (req, res) => {
  const answers = load(ANSWERS_FILE)
  answers.push(req.body)

  save(ANSWERS_FILE, answers)
  res.json({ success: true })
})

app.get("/answers", (req, res) => {
  res.json(load(ANSWERS_FILE))
})

// =======================
// VIEW USERS (ADMIN)
/// =======================
app.get("/users", (req, res) => {
  res.json(load(USERS_FILE))
})

// =======================
// TEST SERVER
// =======================
app.get("/", (req, res) => {
  res.send("✅ Server running")
})

// =======================
// START SERVER
// =======================
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000")
})
