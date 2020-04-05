<template>
  <div>
    <admin-header></admin-header>
    <div class="rounded-0 border-dark px-2 px-md-5 py-5 mx-md-5 my-md-5" id="content" style="background-color: #ffffff; box-shadow: 20px 20px 50px 10px black;">
        <form method="post" class="container-fluid" v-on:submit.prevent="onSubmit">
            <h2 class="text-center mb-4">Add Course</h2>

            <div class="form-row">
                <div class="form-group col-md-3">
                    <label class="text-left" for="CNum">Course Number</label>
                    <input v-model="course.classnum" class="form-control" type="text" id="CNum" name="CNum" required="" placeholder="Course Number">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CCode">Course Code</label>
                    <input v-model="course.code" class="form-control" type="text" id="CCode" name="CCode" required="" placeholder="Course Code">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CSection">Course Section</label>
                    <input v-model="course.section" class="form-control" type="text" id="CSection" name="CSection" placeholder="Section" required="">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CSlots">Number of Slots</label>
                    <input v-model="course.slots" class="form-control" type="number" id="CSlots" placeholder="Number of Slots" name="CSlots">
                </div>
            </div>
            <div class="form-group">
                <label class="text-left" for="CName">Course Name</label>
                <input v-model="course.name" class="form-control" type="text" id="CName" name="CName" placeholder="Course Name" required="">
            </div>
            <div class="form-group">
                <label class="text-left" for="CProf">Tentative Professor</label>
                <input v-model="course.professor" class="form-control" type="text" id="CProf" name="CProf" placeholder="Tentative Professor" required="">
            </div>

            <div class="form-row">
                <div class="form-group col-md-3">
                    <label class="text-left" for="CUnits">No. of Units</label>
                    <input v-model="course.units" class="form-control" type="number" id="CUnits" name="CUnits" required="" placeholder="No. of Units">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="AYStart">Academic Year Start</label>
                    <input v-model="course.term.acadyear.from" class="form-control" type="number" id="AYStart" name="AYStart" required="" placeholder="Year From">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="AYEnd">Academic Year End</label>
                    <input v-model="course.term.acadyear.to" class="form-control" type="number" id="AYEnd" name="AYEnd" required="" placeholder="Year To">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="TNo">Term No.</label>
                    <input v-model="course.term.termno" class="form-control" type="number" id="TNo" name="TNo" required="" placeholder="Term No.">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-3">
                    <label class="text-left" for="CRoom">Room</label>
                    <input v-model="room" class="form-control" type="text" id="CRoom" name="CRoom" placeholder="Room" required="">
                </div>
                <div class="col-md-3">

                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CSTime">Start Time</label>
                    <input v-model="time.from" class="form-control" id="CSTime" type="time" required="" name="CSTime">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CETime">End Time</label>
                    <input v-model="time.to" class="form-control" id="CETime" type="time" required="" name="CETime">
                </div>
            </div>

            <div class="form-group"><label>Days for Course (Check all that apply)</label>
                <div class="form-check" v-for="(sched, i) in days" v-bind:key="i">
                    <input class="form-check-input" type="checkbox" id="sched.day" v-model="sched.checked">
                    <label class="form-check-label" for="monday">{{sched.day}}</label>
                </div>
            </div>

            <button class="btn btn-success" id="submit" type="submit">Add Course</button>
            <button class="btn btn-danger" id="submit" type="submit" v-if="edit==true">Delete Course</button>
        </form>
    </div>
  </div>
</template>


<script>
import Header from './components/admin-header.vue'

export default {
    components: {
    'admin-header': Header
    },
    data(){
        return {
            edit: false,
            room: "",
            days: [
                {day: "Monday", value: "M", checked: false},
                {day: "Tuesday", value: "T", checked: false},
                {day: "Wednesday", value: "W", checked: false},
                {day: "Thursday", value: "H", checked: false},
                {day: "Friday", value: "F", checked: false},
                {day: "Saturday", value: "S", checked: false}
            ],
            time: {from: "", to: ""},

            course:{
                classnum: "",
                code: "",
                name: "",
                section: "",
                units: "",
                term: {
                    acadyear: {from: "", to: ""},
                    termno: ""
                },
                classtimes: [{
                    day: "",
                    time: {from: "", to: ""},
                    room: ""
                }],
                enrolled: [],
                slots: "",
                professor: ""
            }
        }
    },
    methods: {
        onSubmit(){ // still needs validation
            this.course.classtimes = this.generateClasstimes()
            this.axios.post('http://localhost:5656/api/courses/', this.course).then((result) =>{
                    console.log(result)
                }).catch((error)=>{
                    console.log(error)
            })
        },
        generateClasstimes(){
            var classtimes = []
            for(var i = 0; i < this.days.length; i++){
                if(this.days[i].checked){
                    classtimes.push({
                        day: this.days[i].value,
                        time: {from: this.time.from.replace(/:/g,''), to: this.time.to.replace(/:/g,''),},
                        room: this.room
                    })
                }
            }
            return classtimes
        }
    }
}
</script>


<style scoped>

</style>