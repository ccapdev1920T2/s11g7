<template>
    <div class="align-items-center d-flex flex-column flex-fill p-lg-5 my-lg-5 my-4">
        <div class="box p-lg-5 p-3 col-12" id="search-box">
            <h1>Search courses</h1>
            <div class="input-group">
                <input 
                    v-model.trim="input" 
                    class="form-control form-control-lg" 
                    type="text" 
                    placeholder="Type a course code... (e.g. CCAPDEV, MOBIDEV)" 
                    id="courses" 
                    name="courses"
                    @keyup.enter="searchCourses"> 
                <div class="input-group-append" id="search">
                    <button v-on:click="searchCourses" class="btn btn-success" :disabled="input.length <= 0">
                        <span style="font-size:20px; vertical-align: middle;">Search</span>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="box m-3 m-lg-5 p-lg-5 col-12 py-3" v-show="showResults">
            <spinner v-show="!resultsReady"/>
            <div class="alert alert-success" role="alert" v-show="showSuccessAlert">
                Course(s) successfully added!
                <button type="button" class="close" @click="showSuccessAlert = false">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="alert alert-danger" role="alert" v-show="showFailureAlert">
                {{alertMsg}}
                <button type="button" class="close" @click="showFailureAlert = false">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form class="form" id="add-course" @submit.prevent v-show="resultsReady">
                <h1 class="d-flex justify-content-left">Search results</h1>
                <div class="table-responsive" v-if="courses.length > 0">
                    <table class="rounded table table-light table-bordered text-center">
                        <thead class="thead">
                            <tr>
                                <th scope="col-1"></th>
                                <th scope="col-1">Code</th>
                                <th scope="col-1">Section</th>
                                <th scope="col-3">Course Name</th>
                                <th scope="col-1">Day</th>
                                <th scope="col-1">Timeslot</th>
                                <th scope="col-1">Room</th>
                                <th scope="col-1">Slots</th>
                                <th scope="col-2">Professor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(course, i) in courses">
                                <tr v-for="(ct, j) in course.classtimes" :key="i + '-' + j" :class="i % 2 == 0 ? 'odd' : ''">
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col">
                                        <div class="form-check" disabled data-toggle="tooltip" title="aaaa" data-placement="right">
                                            <input 
                                                class="form-check-input position-static" 
                                                type="checkbox" 
                                                v-bind:value="course.classnum" 
                                                v-model="coursesToEnlist">
                                        </div>
                                    </td>
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.code}} </td>
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.section}} </td>
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.name}} </td>
                                    <td> {{ct.day == 'C' ? ct.date : ct.day}} </td>
                                    <td> {{ct.time.from}}-{{ct.time.to}} </td>
                                    <td> {{ct.room}} </td>
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> <span class="h4">{{course.enrolled.length}}</span> / {{course.slots}}</td>
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.professor}} </td>
                                </tr>
                                <tr :key="i"></tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <p v-else>No results found.</p>
                <input class="btn btn-success" type="submit" value="Add courses" @click="enlistCourses()" v-bind:disabled="courses.length == 0 || coursesToEnlist == 0">
            </form>
        </div>
    </div>
</template>

<script>
import spinner from './spinner.vue'

export default {
    components: {
        spinner
    },
    data() {
        return {
            input: '',
            showResults: false,
            courses: [],
            resultsReady: false,
            coursesToEnlist: [],
            showSuccessAlert: false,
            showFailureAlert: false,
            currentUser: '',
            alertMsg: '',
            enlistedCourses: []
        }
    },
    methods: {
        searchCourses: function() {
            this.showResults = true
            this.resultsReady = false
            this.showFailureAlert = false
            this.axios.get('http://localhost:5656/api/courses/code/' + this.input)
            .then((result)=>{
                console.log(result.data)
                this.courses = result.data
                console.log(this.courses)
            }).catch((err) => {
                this.showFailureAlert = true
                this.alertMsg = err.message
            }).finally(() => {
                this.resultsReady = true
            })
        },
        getCourses: function() {
            this.axios.get('http://localhost:5656/api/students/' + this.currentUser + '/courses').then((result)=>{
                console.log(result.data)
                this.enlistedCourses = result.data
                this.resultsReady = true
            })
        },
        enlistCourses: function() {
            this.showSuccessAlert = false
            this.showFailureAlert = false
            this.resultsReady = false

            this.axios.patch('http://localhost:5656/api/students/' + this.currentUser + '/courses', 
            {
                action: "ENLIST",
                courses: this.coursesToEnlist
            })
            .then(() => {
                this.showSuccessAlert = true
                console.log("succeeded!")
            })
            .catch((err) => {
                this.alertMsg = err.message
                console.log(err)
                this.showFailureAlert = true
            })
            .finally(() => {
                this.resultsReady = true
            })
        },
        /*
        courseIsValid: function(classnum) {
            let enlistedNum = this.enlistedCourses.map(c => c.classnum)
            let valid = true

            this.enlistedCourses.forEach(course => {
                
            })
        } */
    },
    created(){
        this.axios.defaults.withCredentials = true;
        this.axios.get('http://localhost:5656/api/students/authenticate-session', {headers:{withCredentials:true}}).then((result) =>{
            if(result.data.user_id){
                console.log("User ID from session: " + result.data.user_id)
                this.currentUser = result.data.user_id
                this.getCourses()
            }
            else {
                this.$router.push({name: 'loginStudent'})
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}
</script>


<style scoped>
    .odd {
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>