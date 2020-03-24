<template>
    <div>
       <student-header></student-header>

        <div class="align-items-center">
            <div class="container box my-3">
                <div class="col-12 p-3">
                    <h1 class="d-flex justify-content-left">Your class schedule</h1>

                    <div id="calendar">
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
                            :maxTime = "'22:30:00'"
                            :height = "'auto'"
                            :columnHeaderFormat = "{
                                weekday: 'short'
                            }"
                        />
                    </div>

                </div>
                <div class="col-12 p-3" id="search-results">
                    <form class="form" action="manage_removesuccess.html">
                        <h1 class="d-flex justify-content-left">Courses</h1>
                        <div class="table-responsive">
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
                                    <tr v-for="course in courses" v-bind:key="course">
                                        <td scope="col-1">
                                            <div class="form-check">
                                                <input class="form-check-input position-static" type="checkbox">
                                            </div>
                                        </td>
                                        
                                        <td scope="col-1" > {{course.code}} </td>
                                        <td scope="col-1"> {{course.section}} </td>
                                        <td scope="col-3"> {{course.name}} </td>
                                        <td scope="col-1"> {{course.days}} </td>
                                        <td scope="col-1"> {{course.timeslot}} </td>
                                        <td scope="col-1"> {{course.room}} </td>
                                        <td scope="col-1"> {{course.currSlots}} / {{course.totalSlots}}</td>
                                        <td scope="col-3"> {{course.prof}} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <input class="btn btn-danger" type="submit" value="Remove courses">  
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

import Header from '../components/student-header.vue'


export default {
    components: {
        'student-header': Header,
        FullCalendar
    },
    data(){
        return{
            courses: [{ /* for the manage courses part (hardcoded) */
                code: "SUBJECT",
                section: "S99",
                name: "Course #123",
                days: "MTWHFSS",
                timeslot: "All Day",
                room: "Room ABC",
                currSlots: "100",
                totalSlots: "1000",
                prof: "Professor X"
            },
            {
                code: "CCAPDEV",
                section: "S11",
                name: "Web Application Development",
                days: "MW",
                timeslot: "1100-1230",
                room: "G304B",
                currSlots: "20",
                totalSlots: "43",
                prof: "Arren Antioquia"
            },
            {
                code: "CCAPDEV",
                section: "S11",
                name: "Web Application Development",
                days: "MW",
                timeslot: "1100-1230",
                room: "G304B",
                currSlots: "20",
                totalSlots: "43",
                prof: "Arren Antioquia"
            }
            ],
            calendarPlugins:[
                dayGridPlugin,
                timeGridPlugin
            ],
            calendarEvents: [ /* for the calendar part (hardcoded) */
                {
                    title: 'GEETHIC',
                    daysOfWeek: ['1', '3'],
                    startTime: '07:30:00',
                    endTime: '9:00:00'
                },
                {
                    title: 'STALGCM',
                    daysOfWeek: ['1', '3'],
                    startTime: '09:15:00',
                    endTime: '10:45:00'
                },
                {
                    title: 'CCAPDEV',
                    daysOfWeek: ['1', '3'],
                    startTime: '11:00:00',
                    endTime: '12:30:00'
                },
                {
                    title: 'ST-MATH',
                    daysOfWeek: ['2', '4'],
                    startTime: '07:30:00',
                    endTime: '9:00:00'
                },
                {
                    title: 'CSARCH1',
                    daysOfWeek: ['2', '4'],
                    startTime: '11:00:00',
                    endTime: '12:30:00'
                },
                {
                    title: 'GESPORT',
                    daysOfWeek: ['2'],
                    startTime: '13:00:00',
                    endTime: '15:00:00'
                },
            ]
        }
    }
}
</script>


<style scoped>

@import '../assets/css/student.css';
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
</style>