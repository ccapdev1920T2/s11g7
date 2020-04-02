<template>
    <div class="align-items-center d-flex flex-column flex-fill top">
        
        <div class="container box m-3">
            <div class="col-12 py-3" id="search-results">
                <form class="form" id="add-course" action="search_addsuccess.html">
                    <h1 class="d-flex justify-content-left">Search results</h1>
                    <div class="table-responsive">
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
                                <tr v-for="course in courses" v-bind:key="course">
                                    <td scope="col-1">
                                        <div class="form-check">
                                            <input class="form-check-input position-static" type="checkbox">
                                        </div>
                                    </td>
                                    <td scope="col-1" > {{course.code}} </td>
                                    <td scope="col-1"> {{course.section}} </td>
                                    <td scope="col-2"> {{course.name}} </td>
                                    <td scope="col-1"> {{getDays(course)}} </td>
                                    <td scope="col-2"> {{getTimeSlot(course)}} </td>
                                    <td scope="col-1"> {{getRoom(course)}} </td>
                                    <td scope="col-1"> {{course.enrolled.length}} / {{course.slots}}</td>
                                    <td scope="col-3"> {{course.professor}} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <input class="btn btn-success" type="submit" value="Add courses">
                </form>
            </div>
        </div>
    </div>

</template>

<script>
// import server from '../../../server/server.js'

export default {
    data(){
        return {

            courses: []
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
        }
    },
    created(){
        this.axios.get('http://localhost:5656/api/courses/').then((result)=>{
            console.log(result.data)
            this.courses = result.data
        })
    }
}
</script>


<style scoped>
.top{
    margin-top: 50px;
}
</style>