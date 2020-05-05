<template>
    <div class="align-items-center d-flex flex-column flex-fill p-lg-5 my-lg-5 my-4">
        <div class="box p-lg-5 p-3 col-12" id="search-box">
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
        
        <div class="box m-3 m-lg-5 p-lg-5 col-12 py-3" v-show="showResults">
            <spinner v-show="!resultsReady"/>
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
                <div class="table-responsive" v-if="filteredCourses.length > 0">
                    <table class="rounded table table-light table-bordered text-center  table-hover">
                        <thead class="thead thead-dark">
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
                            <template v-for="(course, i) in filteredCourses">
                                <tr v-for="(ct, j) in course.classtimes" :key="j" :class="i % 2 == 0 ? 'odd' : ''">
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col">
                                        <div class="form-check">
                                            <input class="form-check-input position-static" type="checkbox" v-bind:value="course.classnum" v-model="coursesToEnlist">
                                        </div>
                                    </td>
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.code}} </td>
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.section}} </td>
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.name}} </td>
                                    <td> {{ct.day == 'C' ? ct.date : ct.day}} </td>
                                    <td> {{ct.time.from}}-{{ct.time.to}} </td>
                                    <td> {{ct.room}} </td>
                                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.enrolled.length}} / {{course.slots}}</td>
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
            filteredCourses: [],
            resultsReady: false,
            coursesToEnlist: [],
            showSuccessAlert: false,
            showFailureAlert: false,
            currentUser: "11828498"
        }
    },
    methods: {
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
    .odd {
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>