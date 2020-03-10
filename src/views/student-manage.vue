<template>
    <div>
        <student-header></student-header>
        <student-schedule></student-schedule>
    </div>
</template>


<script>
import Header from '../components/student-header.vue'
import Schedule from '../components/student-mycourses.vue'

export default {
    components: {
        'student-header': Header,
        'student-schedule': Schedule
    }
}
</script>


<style scoped>

@import '../assets/css/student.css';
</style>