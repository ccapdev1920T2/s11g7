<template>
    <div>
        <student-header></student-header> 
        <div class="px-lg-5 py-lg-5 py-3 align-items-center">
            <div class="box my-3 p-3">
                <div class="col-12 p-3">
                    <h1 class="d-flex justify-content-left">Your class schedule</h1>
                    <spinner v-show="!coursesLoaded"/>
                    <div id="calendar" v-show="coursesLoaded">
                        <FullCalendar
                            defaultView = "timeGridWeek"
                            :plugins = "calendarPlugins"
                            :header = "false"
                            :events = "calendarEvents"
                            :eventColor = "'rgb(0, 112, 60)'"
                            :eventTextColor = "'white'"
                            :allDaySlot = "false"
                            :hiddenDays = '[0]'
                            :minTime = "'07:30:00'"
                            :maxTime = "'21:30:00'"
                            :height = "'auto'"
                            :columnHeaderFormat = "{
                                weekday: 'short'
                            }"
                        />
                    </div>
                </div>
                <div class="col-12 p-3">
                    <form class="form" @submit.prevent>
                        <h1 class="d-flex justify-content-left">Courses</h1>
                        <spinner v-show="!coursesLoaded"/>
                        <div class="alert alert-success" role="alert" v-show="showSuccessAlert">
                            Course(s) successfully dropped!
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
                        <div class="table-responsive" v-show="coursesLoaded">
                            <p v-show="courses.length == 0"> You have no courses! </p>
                            <table class="table table-sm table-light text-center" v-show="courses.length > 0">
                                <thead class="thead">
                                    <tr>
                                        <th scope="col-1"></th>
                                        <th scope="col-1">Code</th>
                                        <th scope="col-1">Section</th>
                                        <th scope="col-3">Course Name</th>
                                        <th scope="col-1">Day</th>
                                        <th scope="col-1">Timeslot</th>
                                        <th scope="col-1">Room</th>
                                        <th scope="col-2">Professor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(course, i) in courses">
                                        <tr v-for="(ct, j) in course.classtimes" :key="j" :class="i % 2 == 0 ? 'odd' : ''">
                                            <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col">
                                                <div class="form-check">
                                                    <input class="form-check-input position-static" type="checkbox" v-bind:value="course.classnum" v-model="coursesToDelete">
                                                </div>
                                            </td>
                                            <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.code}} </td>
                                            <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.section}} </td>
                                            <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.name}} </td>
                                            <td> {{ct.day == 'C' ? ct.date : ct.day}} </td>
                                            <td> {{ct.time.from}}-{{ct.time.to}} </td>
                                            <td> {{ct.room}} </td>
                                            <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.professor}} </td>
                                        </tr>
                                        <tr :key="i"></tr>
                                    </template>
                                </tbody>
                            </table>
                            <input class="btn btn-danger" type="submit" value="Remove courses" @click="dropCourses()" v-bind:disabled="courses.length == 0 || coursesToDelete == 0"> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
require('@fullcalendar/core/main.min.css')
require('@fullcalendar/daygrid/main.min.css')
require('@fullcalendar/timegrid/main.min.css')

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import spinner from '../components/spinner.vue'
import Header from '../components/student-header.vue'

export default {
    components: {
        'student-header': Header,
        FullCalendar,
        spinner
    },
    data(){
        return{
            courses: [],
            calendarPlugins:[
                dayGridPlugin,
                timeGridPlugin
            ],
            calendarEvents: [],
            coursesLoaded: false,
            currentUser: '',
            coursesToDelete: [],
            showSuccessAlert: false,
            showFailureAlert: false,
            alertMsg: ''
        }
    },
    methods: {
        convertToEvents: function(courses){
            this.calendarEvents = []
            for(var i = 0; i < courses.length; i++){
                var course = courses[i]
                for(var j = 0; j < course.classtimes.length; j++){
                    var classTime = course.classtimes[j]
                    console.log(classTime)
                    this.calendarEvents.push({
                        title: course.code + " " + course.section + "\n" + classTime.room,
                        daysOfWeek: [this.determineDay(classTime.day)],
                        startTime: classTime.time.from,
                        endTime: classTime.time.to
                    })
                }
            }
           console.log(this.calendarEvents)
        },
        determineDay: (day) =>{
            if(day == 'M')
                return '1'
            else if(day == 'T')
                return '2'
            else if(day == 'W')
                return '3'
            else if(day == 'H')
                return '4'
            else if(day == 'F')
                return '5'
            else if(day == 'S')
                return '6'
            else if(day == 'L')
                return '0'
        },
        updateCourses: function() {
            this.coursesLoaded = false
            this.axios.get('http://animoapi.herokuapp.com/api/students/' + this.currentUser + '/courses')
                .then((courses) => {
                    this.courses = courses.data
                    this.convertToEvents(this.courses)
                    this.coursesLoaded = true
                })
                .catch((err) => console.log(err))
        },
        dropCourses: function() {
            this.showSuccessAlert = false
            this.showFailureAlert = false
            this.coursesLoaded = false
            
            this.axios.patch('http://animoapi.herokuapp.com/api/students/' + this.currentUser + '/courses', 
            {
                action: "DROP",
                courses: this.coursesToDelete
            })
            .then(() => {
                this.coursesToDelete = []
                this.updateCourses()
                this.showFailureAlert = false
                this.showSuccessAlert = true
            })
            .catch((err) => {
                this.alertMsg = err
                this.showFailureAlert = true
                console.log(err)
            }).finally(() => {
                this.coursesLoaded = true
            })
        }
    },
    created() {
        this.axios.defaults.withCredentials = true;
        this.axios.get('http://animoapi.herokuapp.com/api/students/authenticate-session', {headers:{withCredentials:true}}).then((result) =>{
            if(result.data.user_id){
                console.log("User ID from session: " + result.data.user_id)
                this.currentUser = result.data.user_id
                this.updateCourses()
            }
            else{
                this.$router.push({name: 'loginStudent'})
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}
</script>


<style scoped>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import "../../assets/css/student.css";

.odd {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>