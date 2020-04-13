<template>
  <div>
    <admin-header></admin-header>
    <div class="rounded-0 border-dark px-3 px-md-5 py-5 mx-md-5 my-md-5" id="content" style="background-color: #ffffff; box-shadow: 20px 20px 50px 10px black;">
        <Spinner v-if="showSpinner"/>
        <form method="post" @click="handleClick($event)" v-on:submit.prevent="onSubmit" v-if="!showSpinner && !action.performed">
            <h2 class="text-center mb-4" v-if="action.type == 'ADD'">Add Course</h2>
            <h2 class="text-center mb-4" v-else>Manage Course</h2>

            <div class="form-row">
                <div class="form-group col-md-3">
                    <label class="text-left" for="CNum">Course Number</label>
                    <input v-model="course.classnum" class="form-control" type="text" id="CNum" required="" placeholder="Course Number" :disabled="action.type == 'EDIT'" @change="checkMatchingNumber">

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
                    <input v-model="course.slots" class="form-control" type="number" id="CSlots" min="0" placeholder="Number of Slots" >
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
                <div class="form-group col-md-2">
                    <label class="text-left" for="CUnits">Units</label>
                    <input v-model="course.units" class="form-control" type="number" id="CUnits" required="" step="0.1" min="0" placeholder="No. of Units">
                </div>
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="AYStart">Academic Year</label>
                    <input v-model="course.term.acadyear.from" class="form-control" type="number" id="AYStart" required="" placeholder="Year From">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="AYEnd">To</label>
                    <input v-model="course.term.acadyear.to" class="form-control" type="number" id="AYEnd" required="" placeholder="Year To">
                </div>
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-2">
                    <label class="text-left" for="TNo">Term</label>
                    <input v-model="course.term.termno" class="form-control" type="number" max="3" min="1" id="TNo" required="" placeholder="Term No.">
                </div>
            </div>
            <div class="form-group">
                <label>Course Schedule</label>
                <div class="table-responsive">
                    <table class="rounded table table-light text-center">
                        <thead>
                            <tr>
                                <th colspan="2">Day</th>
                                <th colspan="1">Start Time</th>
                                <th colspan="1">End Time</th>
                                <th colspan="1">Room</th>
                                <th><button type="button" class="btn btn-success" @click="addClassTime">Add</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ct, i) in course.classtimes" :key="ct">
                                <td :colspan="ct.day == 'C'? 1 : 2">
                                    <select v-model="ct.day" class="custom-select">
                                        <option selected value="M">Monday</option>
                                        <option value="T">Tuesday</option>
                                        <option value="W">Wednesday</option>
                                        <option value="H">Thursday</option>
                                        <option value="F">Friday</option>
                                        <option value="S">Saturday</option>
                                        <option value="L">Sunday</option>
                                        <option value="C">Custom Date</option>
                                    </select>
                                </td>
                                <td colspan="1" v-if="ct.day == 'C'">
                                    <input v-model="ct.date" type="date" class="form-control" :max="course.term.acadyear.to + '-12-31'" :min="course.term.acadyear.from + '-01-01'">
                                </td>
                                <td>
                                    <input v-model="ct.time.from" :max="ct.time.to" class="form-control" id="CSTime" type="time" required="">
                                </td>
                                <td>
                                    <input v-model="ct.time.to" :min="ct.time.from" class="form-control" id="CETime" type="time" required="">
                                </td>
                                <td>
                                    <input v-model="ct.room" class="form-control" type="text" id="CRoom"  placeholder="Room" required="">
                                </td>
                                <td><button type="button" class="btn btn-outline-danger" @click="deleteClassTime(i)" :disabled="course.classtimes.length < 2">Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <button class="btn btn-success" id="btnAdd" name="add" type="submit" v-if="action.type == 'ADD'" @click="addCourse">Add</button>
            <div v-else class="form-row text-center">
                <button class="btn btn-outline-danger col-1" id="btnDelete" name="delete" type="submit" @click="deleteCourse">Delete</button>
                <div class="col-9"></div>
                <button class="btn btn-success col-2" id="btnUpdate" name="update" type="submit" @click="editCourse">Update</button>
            </div>
        </form>
        <div class="text-center h1 m-5" v-if="action.performed">
            {{action.message}} <br><br>
            <router-link :to="{name: 'adminManage'}" type="button" class="btn btn-success">Back to course listing</router-link>
        </div>
    </div>
  </div>
</template>


<script>
import Header from '../components/admin-header.vue'
import Spinner from '../components/Spinner.vue'

class ClassTime {
    day = "M";
    date = "";
    time = {from: "00:00", to: "00:00"};
    room = "";
}


class Course {
    classnum = "";
    name = "";
    section = "";
    units = 0;
    term = {
        acadyear: {from: 2019, to: 2020},
        termno: 1
    };
    classtimes = [new ClassTime()];
    enrolled = [];
    slots = 0;
    professor = "";
}

export default {
    components: {
    'admin-header': Header,
    'Spinner': Spinner
    },
    data(){
        return {
            customDate: "",
            event: "",
            classnum: this.$route.params.classnum,
            edit: false,
            days: [
                {day: "Monday", value: "M", checked: false},
                {day: "Tuesday", value: "T", checked: false},
                {day: "Wednesday", value: "W", checked: false},
                {day: "Thursday", value: "H", checked: false},
                {day: "Friday", value: "F", checked: false},
                {day: "Saturday", value: "S", checked: false}
            ],
            course: new Course(),
            showSpinner: true,
            action: {
                type: "",
                performed: false,
                get message() {
                    if (this.type == "ADD") {
                        return "Course added successfully."
                    } else if (this.type == "EDIT") {
                        return "Course edited successfully."
                    } else if (this.type == "DELETE") {
                        return "Course deleted successfully."
                    }
                    return "Unknown error occurred."
                }
            }
        }
    },
    methods: {
        onSubmit(){
            if(this.action.type == "ADD"){
                this.addCourse()
            }
            else if(this.action.type == "EDIT"){
                this.editCourse()
            }
            else {
                this.deleteCourse()
            }
            

        },
        addCourse(){
            this.action.type = "ADD"
            this.axios.post('http://localhost:5656/api/courses/', this.course).then((result) =>{
                    this.action.performed = true
                    console.log(result.data.message)
                }).catch((error)=>{
                    console.log(error)
            })
        },
        editCourse(){
            this.action.type = "EDIT"
            this.axios.put('http://localhost:5656/api/courses/number/' + this.course.classnum, this.course).then( (result) =>{
                    this.action.performed = true
                    console.log(result.data.message)
                }).catch((error)=>{
                    console.log(error)
            })
        },
        deleteCourse(){
            this.action.type = "DELETE"
            this.showSpinner = true
            this.axios.delete('http://localhost:5656/api/courses/number/' + this.course.classnum, this.course).then( (result) =>{
                console.log(result.data.message)
                this.action.performed = true
            }).catch((error)=>{
                console.log(error)
            }).finally(() => {
                this.showSpinner = false
            })
        },
        isRepeating(day) {
            return /^[MTWHFSL]$/.test(day)
        },
        getCourse(course){
            if(course.classnum == this.classnum){
                this.course = course
            }
        },
        loadData() {
            this.showSpinner = true
            this.axios.get('http://localhost:5656/api/courses/number/' + this.classnum).then((result)=>{
                console.log(result.data)
                this.course = result.data
                this.showSpinner = false
            })
        },
        handleClick(e) {
            console.log(e.target.name);
            this.event = e.target.name
        },
        addClassTime() {
            this.course.classtimes.push(new ClassTime())
        },
        deleteClassTime(ct) {
            this.course.classtimes.splice(ct, 1)
        },
        validTime(ct) {
            return ct.time.from < ct.time.to
        },
        validSchedule(cts) {
            for (let i = 0; i < cts.length; i++) {
                let ct1 = cts[i]
                if (ct1.time.from >= ct1.time.to) {
                    return false;
                }
            }

            return true;
        },
        checkMatchingNumber() {
            let classnum = this.course.classnum
            this.axios.get('http://localhost:5656/api/courses/number/' + classnum).then((result)=>{
                console.log(result.data)
            })
        }
    },
    created() {
        if(this.classnum == null){
            this.action.type = "ADD"
            this.course = new Course()
            console.log("Adding New Course")
            this.showSpinner = false
        }
        else{
            this.action.type = "EDIT"
            console.log("Editing Course #" + this.classnum)
            this.loadData()
        }
    }
}
</script>


<style scoped>

</style>