<template>
  <div>
    <admin-header></admin-header>
    <div class="rounded-0 border-dark px-2 px-md-5 py-5 mx-md-5 my-md-5" id="content" style="background-color: #ffffff; box-shadow: 20px 20px 50px 10px black;">
        <form method="post" class="container-fluid" @click="handleClick($event)" v-on:submit.prevent="onSubmit">
            <h2 class="text-center mb-4" v-if="!edit">Add Course</h2>
            <h2 class="text-center mb-4" v-else>Edit Course</h2>

            <div class="form-row">
                <div class="form-group col-md-3">
                    <label class="text-left" for="CNum">Course Number</label>
                    <input v-model="course.classnum" class="form-control" type="text" id="CNum" required="" placeholder="Course Number" >

                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CCode">Course Code</label>
                    <input v-model="course.code" class="form-control" type="text" id="CCode" required="" placeholder="Course Code">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CSection">Course Section</label>
                    <input v-model="course.section" class="form-control" type="text" id="CSection" placeholder="Section" required="">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CSlots">Number of Slots</label>
                    <input v-model="course.slots" class="form-control" type="number" id="CSlots" placeholder="Number of Slots" >
                </div>
            </div>
            <div class="form-group">
                <label class="text-left" for="CName">Course Name</label>
                <input v-model="course.name" class="form-control" type="text" id="CName"  placeholder="Course Name" required="">
            </div>
            <div class="form-group">
                <label class="text-left" for="CProf">Tentative Professor</label>
                <input v-model="course.professor" class="form-control" type="text" id="CProf" placeholder="Tentative Professor" required="">
            </div>

            <div class="form-row">
                <div class="form-group col-md-3">
                    <label class="text-left" for="CUnits">No. of Units</label>
                    <input v-model="course.units" class="form-control" type="number" id="CUnits" required="" placeholder="No. of Units">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="AYStart">Academic Year Start</label>
                    <input v-model="course.term.acadyear.from" class="form-control" type="number" id="AYStart" required="" placeholder="Year From">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="AYEnd">Academic Year End</label>
                    <input v-model="course.term.acadyear.to" class="form-control" type="number" id="AYEnd" required="" placeholder="Year To">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="TNo">Term No.</label>
                    <input v-model="course.term.termno" class="form-control" type="number" id="TNo" required="" placeholder="Term No.">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-3">
                    <label class="text-left" for="CRoom">Room</label>
                    <input v-model="room" class="form-control" type="text" id="CRoom"  placeholder="Room" required="">
                </div>
                <div class="col-md-3">

                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CSTime">Start Time</label>
                    <input v-model="time.from" class="form-control" id="CSTime" type="time" required="" >
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CETime">End Time</label>
                    <input v-model="time.to" class="form-control" id="CETime" type="time" required="">
                </div>
            </div>

            <div class="form-group"><label>Days for Course (Check all that apply)</label>
                <div class="form-check" v-for="(sched, i) in days" v-bind:key="i">
                    <input class="form-check-input" type="checkbox" id="sched.day" v-model="sched.checked">
                    <label class="form-check-label" for="monday">{{sched.day}}</label>
                </div>
            </div>
            <button class="btn btn-success" id="btnAdd" name="add" type="submit" v-if="!edit">Add</button>
            <div v-else>
                <button class="btn btn-success" id="btnUpdate" name="update" type="submit">Update</button>
                <button class="btn btn-danger" id="btnDelete" name="delete" type="submit">Delete</button>
            </div>
        </form>
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
            event: "",
            classnum: this.$route.params.classnum,
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
            },
        }
    },
    methods: {
        onSubmit(){ // still needs validation
            this.course.classtimes = this.generateClasstimes()
            
            // if(!edit){
            //     this.addCourse()
            // }
            // else{

            // }
            if(this.event == "add"){
                this.addCourse()
            }
            else if(this.event == "update"){
                this.editCourse()
            }
            else{
                this.deleteCourse()
            }
            

        },
        addCourse(){
            this.axios.post('http://localhost:5656/api/courses/', this.course).then((result) =>{
                    console.log(result.data.message)
                }).catch((error)=>{
                    console.log(error)
            })
        },
        editCourse(){
            this.axios.put('http://localhost:5656/api/courses/number/' + this.course.classnum, this.course).then( (result) =>{
                    console.log(result.data.message)
                }).catch((error)=>{
                    console.log(error)
            })
        },
        deleteCourse(){
            this.axios.delete('http://localhost:5656/api/courses/number/' + this.course.classnum, this.course).then( (result) =>{
                    console.log(result.data.message)
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
        },
        getCourse(course){
            if(course.classnum == this.classnum){
                this.course = course
            }
        },
        formatTime(time){
            return time[0] + time[1] + ":" + time[2] + time[3]
        },
        loadData(){
            this.room = this.course.classtimes[0].room
            this.time.from = this.formatTime(this.course.classtimes[0].time.from)
            this.time.to = this.formatTime(this.course.classtimes[0].time.to)

            var j = 0
            for(var i = 0; i < this.days.length; i++){
                if(this.days[i].value == this.course.classtimes[j].day){
                    this.days[i].checked = true
                    if(j < this.course.classtimes.length - 1)
                        j++
                }                
            }
        },
        handleClick(e) {
            console.log(e.target.name);
            this.event = e.target.name
        }
    },
    created(){
        if(this.classnum == null){
            this.edit = false
            console.log("Adding New Course")
        }
        else{
            this.edit = true
            console.log("Editing Course #" + this.classnum)
            this.axios.get('http://localhost:5656/api/courses/number/' + this.classnum).then((result)=>{
                console.log(result.data)
                this.course = result.data
                this.loadData()
            })
        }
    }
}
</script>


<style scoped>

</style>