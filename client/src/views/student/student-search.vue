<template>
    <div>
        <student-header></student-header>
        <search-courses></search-courses>
    </div>
</template>


<script>
import Header from '../components/student-header.vue'
import searchCourses from '../components/student-search-courses.vue'

export default {
    components: {
        'student-header': Header,
        'search-courses': searchCourses
    }
}
</script>


<style scoped>
    @import "../../assets/css/student.css";
</style>