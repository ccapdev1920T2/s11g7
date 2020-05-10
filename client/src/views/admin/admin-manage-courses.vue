<template>
  <div>
    <admin-header></admin-header>
    <div class="rounded-0 border-dark px-2 px-md-5 py-5 mx-md-5 my-md-5" id="content" style="background-color: #ffffff; box-shadow: 20px 20px 50px 10px black;">
        <h1 class="">Course List</h1>
        <div class="table-responsive">
          <table class="table allign-text-center text-center allign-middle">
            <thead>
              <tr>
                <th>Class Number</th>
                <th>Code</th>
                <th>Course Name</th>
                <th>Section</th>
                <th>Days</th>
                <th>Timeslot</th>
                <th>Room</th>
                <th>Slots</th>
                <th>Professor</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(course, i) in courses">
                <tr v-for="(ct, j) in course.classtimes" :key="i + '-' + j" :class="i % 2 == 0 ? 'odd' : ''" >
                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.classnum}} </td>
                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.code}} </td>
                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.section}} </td>
                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.name}} </td>
                    <td> {{ct.day == 'C' ? ct.date : ct.day}} </td>
                    <td> {{ct.time.from}}-{{ct.time.to}} </td>
                    <td> {{ct.room}} </td>
                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> <span class="h4">{{course.enrolled.length}}</span> / {{course.slots}}</td>
                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"> {{course.professor}} </td>
                    <td v-if="j == 0" :rowspan="course.classtimes.length" scope="col"><router-link :to="{name: 'adminEditCourse', params: {classnum: course.classnum}}" class="btn btn-success" role="button">Manage</router-link></td>
                </tr>
                <tr :key="i"></tr>
              </template>
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
    },
  },
  created(){
    this.axios.defaults.withCredentials = true;
    this.axios.get('https://animoapi.herokuapp.com/api/admin/authenticate-session', {headers:{withCredentials:true}}).then((result) =>{
        if(result.data.admin_id){
            console.log("admin ID from session: " + result.data.admin_id)
            this.axios.get('https://animoapi.herokuapp.com/api/courses/').then((result)=>{
                console.log(result.data)
                this.courses = result.data.sort((courseA, courseB) => {
                  return courseA.classnum - courseB.classnum
                })
            })
        }
        else{
            console.log("Unauthorized access")
            this.$router.push({name: 'loginAdmin'})
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