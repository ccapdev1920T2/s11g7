<template>
    <div>
        <student-header></student-header>
        <search-box></search-box>
        <search-results></search-results>
    </div>
</template>


<script>
import Header from '../components/student-header.vue'
import searchBox from '../components/student-searchbox.vue'
import searchResults from '../components/student-searchresults.vue'

export default {
    components: {
        'student-header': Header,
        'search-box': searchBox,
        'search-results': searchResults
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