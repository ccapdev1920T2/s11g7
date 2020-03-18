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
                    <input class="btn btn-success" type="submit" value="Add courses">
                </form>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return {
            courses: [{
                            code: "CCAPDEV",
                            section: "S11",
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
                            code: "CCAPDEV2",
                            section: "S11",
                            name: "Web Application Development",
                            days: "MW",
                            timeslot: "1100-1230",
                            room: "G304B",
                            currSlots: "20",
                            totalSlots: "43",
                            prof: "Arren Antioquia"
                        }
                    ]
        }
    }
}
</script>


<style scoped>
.top{
    margin-top: 50px;
}
</style>