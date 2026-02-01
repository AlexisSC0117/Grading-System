<template>
  <div style="text-align:center; margin-top:80px;">
    <h1>Grading System</h1>
    <p>Select your role</p>

    <button @click="$router.push('/teacher')" style="padding:10px 30px;">
      Teacher
    </button>

    <br><br>

    <button @click="$router.push('/student')" style="padding:10px 30px;">
      Student
    </button>
  </div>
</template>
