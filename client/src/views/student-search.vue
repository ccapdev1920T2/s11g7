<template>
    <div>
        <student-header></student-header>
        <search-courses></search-courses>
    </div>
</template>


<script>
import Header from './components/student-header.vue'
import searchCourses from './components/student-search-courses.vue'

export default {
    components: {
        'student-header': Header,
        'search-courses': searchCourses
    }
}
</script>


<style scoped>

body {
    background-image: url('../assets/img/dlsu.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100vh;
    font-family: 'Lato', sans-serif;
}

.dlsu-tint {
    background-color: rgba(0, 112, 60, 0.99);
    background-blend-mode: multiply;
}

.thead-dark {
    background-color: rgb(0, 112, 60);
    border-color: rgb(0, 112, 60);
}

.box {
    border-radius: 6px;
    background-color: white;
    box-shadow: 20px 20px 50px 10px black;
}

.fc-today
{
  background-color:inherit !important;
}
</style>