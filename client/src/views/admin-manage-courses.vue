<template>
  <div>
    <admin-header></admin-header>
    <div class="rounded-0 border-dark px-2 px-md-5 py-5 mx-md-5 my-md-5" id="content" style="background-color: #ffffff; box-shadow: 20px 20px 50px 10px black;">
        <h1 class="">Course List</h1>
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-sm">
            <thead style="background-color: #000000;color: rgb(255,255,255);">
              <tr>
                <th>Code</th>
                <th>Course Name</th>
                <th>Section</th>
                <th>Days</th>
                <th>TImeslot</th>
                <th>Room</th>
                <th>Slots</th>
                <th>Professor</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="course in courses" v-bind:key="course">
              <td>{{course.code}}</td>
              <td>{{course.name}}</td>
              <td>{{course.section}}</td>
              <td>{{course.days}}</td>
              <td>{{course.timeslot}}</td>
              <td>{{course.room}}</td>
              <td> {{course.currSlots}} / {{course.totalSlots}}</td>
              <td>{{course.prof}}</td>
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
      courses: [{ /* for the manage courses part (hardcoded) */
          code: "SUBJECT",
          section: "S99",
          name: "Course #123",
          days: "MW",
          timeslot: "All Day",
          room: "Room ABC",
          currSlots: "20",
          totalSlots: "56",
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
      ]
    }
  }
}
</script>

<style scoped>


</style>