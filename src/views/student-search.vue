<template>
    <div>
        <student-header></student-header>
        <search-content></search-content>
    </div>
</template>


<script>
import Header from '../components/student-header.vue'
import searchContent from '../components/student-searchbox.vue'

export default {
    components: {
        'student-header': Header,
        'search-content': searchContent
    }
}
</script>


<style scoped>

@import '../assets/css/student.css';
</style>