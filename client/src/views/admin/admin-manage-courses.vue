<template>
  <div>
    <admin-header></admin-header>
    <div class="rounded-0 border-dark px-2 px-md-5 py-5 mx-md-5 my-md-5" id="content" style="background-color: #ffffff; box-shadow: 20px 20px 50px 10px black;">
        <h1 class="">Course List</h1>
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-sm">
            <thead style="background-color: #000000;color: rgb(255,255,255); text-align: center;">
              <tr>
                <th>Code</th>
                <th>Course Name</th>
                <th>Section</th>
                <th>Days</th>
                <th>TImeslot</th>
                <th>Room</th>
                <th>Slots</th>
                <th>Professor</th>
                <th></th>
              </tr>
            </thead>
            <tbody style="text-align: center;">
            <tr v-for="(course, i) in courses" v-bind:key="i">
              <td scope="col-1" > {{course.code}} </td>
                <td scope="col-2"> {{course.name}} </td>
                <td scope="col-1"> {{course.section}} </td>
                <td scope="col-1"> {{getDays(course)}} </td>
                <td scope="col-2"> {{getTimeSlot(course)}} </td>
                <td scope="col-1"> {{getRoom(course)}} </td>
                <td scope="col-1"> {{course.enrolled.length}} / {{course.slots}}</td>
                <td scope="col-2"> {{course.professor}} </td>
              <td><router-link :to="{name: 'adminEdit'}" class="btn btn-primary" role="button">Manage</router-link></td>
            </tr>
            </tbody>
          </table>
      </div>
    </div>
</div>
</template>

<script>
import Header from '../components/admin-header.vue'

export default {
  components: {
    'admin-header': Header
  },
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


</style>