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
    data(){
        return{
            idnum: ''
        }
    },
    components: {
        'student-header': Header,
        'search-courses': searchCourses
    },
    // mounted(){
    //     this.axios.get('http://localhost:5656/api/students/login').then((result) =>{
    //         console.log("GET REQUEST:")
    //         console.log(result.data)
    //         // window.location = "/search"
    //     }).catch((error)=>{
    //         console.log(error)
    //     })
    // }
}
</script>


<style scoped>
    @import "../../assets/css/student.css";
</style>