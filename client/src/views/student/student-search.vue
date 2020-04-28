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
    mounted(){
        // if(localStorage.idnum){
        //     this.idnum = localStorage.idnum
        //     console.log("SEARCH PAGE:" + this.idnum)
        // }
        this.axios.get('http://localhost:5656/api/students/authenticate-session').then((result) =>{
            console.log(result)
            // this.successMessage = "Account successfully registered! Going back to home page"
            // window.location = "/"
        }).catch((error)=>{
            console.log(error)
        })
    }
}
</script>


<style scoped>
    @import "../../assets/css/student.css";
</style>