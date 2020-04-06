<template>
    <div class="align-items-center d-flex flex-column flex-fill top">
        <div class="container box py-5" id="searchform">
            <div class="col-12">
                <div>
                    <h1>Search courses</h1>
                    <div class="input-group">
                        <input v-model="input" class="form-control form-control-lg" type="text" placeholder="Type a course code... (e.g. CCAPDEV, MOBIDEV)" id="courses" name="courses"> 
                         <div class="input-group-append" id="search">
                            <button v-on:click="filterCourses" class="btn btn-success">
                                <span style="font-size:20px; vertical-align: middle;">Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div class="container box m-3" v-show="showResults">
            <div class="col-12 py-3" id="search-results">
                <Spinner v-show="!resultsReady"/>
                <div class="alert alert-success" role="alert" v-show="showSuccessAlert">
                    Course(s) successfully added!
                    <button type="button" class="close" @click="showSuccessAlert = false">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="alert alert-danger" role="alert" v-show="showFailureAlert">
                    A problem occurred when adding the course(s)! Please contact ITS for more information.
                    <button type="button" class="close" @click="showFailureAlert = false">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form class="form" id="add-course" @submit.prevent v-show="resultsReady">
                    <h1 class="d-flex justify-content-left">Search results</h1>
                    <p v-show="filteredCourses.length == 0">No results found.</p>
                    <div class="table-responsive" v-show="filteredCourses.length > 0">
                        <table class="rounded table table-light table-striped table-hover table-bordered text-center">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col-1"></th>
                                    <th scope="col-1">Code</th>
                                    <th scope="col-1">Section</th>
                                    <th scope="col-2">Course Name</th>
                                    <th scope="col-1">Days</th>
                                    <th scope="col-1">Timeslot</th>
                                    <th scope="col-1">Room</th>
                                    <th scope="col-1">Slots</th>
                                    <th scope="col-2">Professor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(course, i) in filteredCourses" :key="i">
                                    <td scope="col-1">
                                        <div class="form-check">
                                            <input class="form-check-input position-static" type="checkbox" v-bind:value="course.classnum" v-model="coursesToEnlist">
                                        </div>
                                    </td>
                                    <td scope="col-1" > {{course.code}} </td>
                                    <td scope="col-1"> {{course.section}} </td>
                                    <td scope="col-2"> {{course.name}} </td>
                                    <td scope="col-1"> {{getDays(course)}} </td>
                                    <td scope="col-2"> {{getTimeSlot(course)}} </td>
                                    <td scope="col-1"> {{getRoom(course)}} </td>
                                    <td scope="col-1"> {{course.enrolled.length}} / {{course.slots}}</td>
                                    <td scope="col-2"> {{course.professor}} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <input class="btn btn-success" type="submit" value="Add courses" @click="enlistCourses()" v-bind:disabled="courses.length == 0 || coursesToEnlist == 0">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from './Spinner.vue'

export default {
    components: {
        Spinner
    },
    data() {
        return {
            input: '',
            showResults: false,
            courses: [],
            filteredCourses: [],
            resultsReady: false,
            coursesToEnlist: [],
            showSuccessAlert: false,
            showFailureAlert: false,
            currentUser: "11828498"
        }
    },
    methods: {
        getDays: (course) => {
            var days = ''
            for(var i = 0; i < course.classtimes.length; i++){
                days += course.classtimes[i].day
            }
            return days
        },
        // assumes all classtimes have the same time
        getTimeSlot: (course) =>{
            return course.classtimes[0].time.from + '-' + course.classtimes[0].time.to
        },
        // assumes all classtimes have the same room
        getRoom: (course) =>{
            return course.classtimes[0].room
        },
        filterCourses: function(){
            this.filteredCourses = this.courses.filter((course)=>{
                return course.code.match(this.input)
            })
            this.showResults = true
        },
        getCourses: function() {
            this.resultsReady = false
            this.axios.get('http://localhost:5656/api/courses/').then((result)=>{
                console.log(result.data)
                this.courses = result.data
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
                this.showFailureAlert = true
                console.log(err)
            })
            .finally(() => {
                this.resultsReady = true
            })
        }
    },
    created(){
        this.getCourses()
    }
}
</script>


<style scoped>
.top{
    margin-top: 50px;
}
</style>