<template>
    <div class="main">
        <student-header></student-header>
        <search-box></search-box>
    </div>
</template>


<script>
import Header from '../components/student-header.vue'
import searchBox from '../components/student-searchbox.vue'

export default {
    components: {
        'student-header': Header,
        'search-box': searchBox
    }
}
</script>


<style scoped>

@import '../assets/css/student.css';
</style>