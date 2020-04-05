<template>
    <div>
       <student-header></student-header> 
        <div class="align-items-center">
            <div class="container box my-3">
                <div>
                    <div class="col-12 p-3">
                        <h1 class="d-flex justify-content-left">Your class schedule</h1>
                        <Spinner v-show="!coursesLoaded"/>
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
                    <div class="col-12 p-3" id="search-results">
                        <form class="form" @submit.prevent>
                            <h1 class="d-flex justify-content-left">Courses</h1>
                            <Spinner v-show="!coursesLoaded"/>
                            <div class="alert alert-success" role="alert" v-show="showSuccessAlert">
                                Courses successfully dropped!
                                <button type="button" class="close" @click="showSuccessAlert = false">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="alert alert-warning" role="alert" v-show="showFailureAlert">
                                A problem occurred when dropping courses! Please contact ITS for more information.
                                <button type="button" class="close" @click="showFailureAlert = false">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="table-responsive" v-show="coursesLoaded">
                                <table class="table table-sm table-light table-striped table-hover text-center">
                                    <thead class="thead-dark">
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
                                        <tr v-for="(course, i) in courses" v-bind:key="i">
                                            <td scope="col-1">
                                                <div class="form-check">
                                                    <input class="form-check-input position-static" type="checkbox" v-bind:value="course.classnum" v-model="coursesToDelete">
                                                </div>
                                            </td>
                                            <td scope="col-1"> {{course.code}} </td>
                                            <td scope="col-1"> {{course.section}} </td>
                                            <td scope="col-3"> {{course.name}} </td>
                                            <td scope="col-1"> {{getDays(course)}} </td>
                                            <td scope="col-1"> {{getTimeSlot(course)}} </td>
                                            <td scope="col-1"> {{getRoom(course)}} </td>
                                            <td scope="col-1"> {{course.enrolled.length}} / {{course.slots}}</td>
                                            <td scope="col-3"> {{course.professor}} </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <input class="btn btn-danger" type="submit" value="Remove courses" @click="dropCourses()"> 
                            </div>
                        </form>
                    </div>
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
import Spinner from './components/Spinner.vue'
import Header from './components/student-header.vue'

export default {
    components: {
        'student-header': Header,
        FullCalendar,
        Spinner
    },
    data(){
        return{
            courses: [ // sample
                {
                    classnum: 1544,
                    code: 'CCAPDEV', name: 'Web Application Development', 
                    section: 'S11', 
                    units: 3, 
                    term:   { 
                                acadyear:
                                {
                                    from: 2019,
                                    to: 2020
                                },
                                termno: 2
                            }, 
                    classtimes: 
                    [
                        {day: 'M', time:{from:'1100', to:'1230'}, room: 'G304B'}, {day: 'W', time:{from:'1100', to:'1230'}, room: 'G304B'}
                    ], 
                    enrolled: [], 
                    slots: 45, 
                    professor: 'ANTIOQUIA, ARREN MATTHEW CAPUCHINO'
                }
            ],
            calendarPlugins:[
                dayGridPlugin,
                timeGridPlugin
            ],
            calendarEvents: [],
            coursesLoaded: false,
            currentUser: "11828498",
            coursesToDelete: [],
            showSuccessAlert: false,
            showFailureAlert: false
        }
    },
    methods: {
        getDays: (course) => {
            var days = ''
            for (var i = 0; i < course.classtimes.length; i++) {
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
        convertToEvents: function(courses){
            this.calendarEvents = []
            for(var i = 0; i < courses.length; i++){
                var course = courses[i]
                for(var j = 0; j < course.classtimes.length; j++){
                    var classTime = course.classtimes[j]
                    this.calendarEvents.push({
                        title: course.code,
                        daysOfWeek: [this.determineDay(classTime.day)],
                        startTime: this.parseTime(classTime.time.from),
                        endTime: this.parseTime(classTime.time.to)
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
        },
        parseTime: (time) => {
            return time[0] + time[1] + ":" + time[2] + time[3] + ":00"
        },
        updateCourses: function() {
            this.coursesLoaded = false
            this.axios.get('http://localhost:5656/api/students/' + this.currentUser + '/courses')
                .then((courses) => {
                    this.courses = courses.data
                    this.convertToEvents(this.courses)
                    this.coursesLoaded = true
                })
                .catch((err) => console.log(err))
        },
        dropCourses: function() {
            this.axios.patch('http://localhost:5656/api/students/' + this.currentUser + '/courses', 
            {
                action: "DROP",
                courses: this.coursesToDelete
            })
            .then(() => {
                this.coursesToDelete = []
                this.coursesLoaded = false
                this.updateCourses()
                this.showFailureAlert = false
                this.showSuccessAlert = true
                this.coursesLoaded = true
            })
            .catch((err) => {
                this.showFailureAlert = true
                console.log(err)
            })
        }
    },
    created() {
        // TODO: Implement current login
        this.coursesLoaded = false
        this.updateCourses()
    }
}
</script>


<style scoped>

@import '../assets/css/student.css';
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
</style>