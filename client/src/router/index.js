import { createRouter, createWebHistory } from "vue-router"

import AdminCreateTeacher from "../views/AdminCreateTeacher.vue"
import LoginPage from "../views/LoginPage.vue"
import RegisterPage from "../views/RegisterPage.vue"
import TeacherDashboard from "../views/TeacherDashboard.vue"
import TeacherPage from "../views/TeacherPage.vue"
import StudentPage from "../views/StudentPage.vue"


const routes = [
  { path: "/", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/admin", component: AdminCreateTeacher },
  { path: "/teacher", component: TeacherPage },
  { path: "/student", component: StudentPage },
  { path: "/teacher-dashboard", component: TeacherDashboard }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
