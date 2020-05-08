<template>
<div class="rounded-0 border-dark px-3 px-md-5 py-5 mx-md-5 my-md-5" id="content" style="background-color: #ffffff; box-shadow: 20px 20px 50px 10px black;">
    <div class="h1" >{{action[0].toUpperCase() + action.substr(1).toLowerCase()}} Course</div>
    <spinner v-if="!loaded && !deleted"/>
    <form method="post" novalidate v-on:submit.prevent v-if="loaded">
        <alert-box :kind="alert.kind" :message="alert.message" v-if="alert.show"/>
        <div class="form-row">
            <div class="form-group col-md-3">
                <label class="text-left" for="CNum">Course Number</label>
                <input 
                    v-model.trim="course.classnum" 
                    class="form-control" 
                    :class="invalid.classnum ? 'is-invalid' : ''" 
                    type="text" 
                    id="CNum" 
                    required="" 
                    placeholder="Course Number" 
                    @change="isValidClassNum"
                    :disabled="action == 'EDIT'">
                <small class="form-text text-danger" v-if="invalid.classnum">{{invalid.classnum}}</small>
            </div>
            <div class="form-group col-md-3">
                <label class="text-left" for="CCode">Course Code</label>
                <input 
                    v-model.trim="course.code" 
                    class="form-control" 
                    :class="invalid.code ? 'is-invalid' : ''" 
                    type="text" id="CCode" 
                    required="" 
                    placeholder="Course Code" 
                    @change="isValidCode">
                <small class="form-text text-danger" v-if="invalid.code">{{invalid.code}}</small>
            </div>
            <div class="form-group col-md-3">
                <label class="text-left" for="CSection">Course Section</label>
                <input 
                    v-model.trim="course.section" 
                    class="form-control" 
                    :class="invalid.section ? 'is-invalid' : ''" 
                    type="text" 
                    id="CSection" 
                    placeholder="Section" 
                    required="" 
                    @change="isValidField('section')">
                <small class="form-text text-danger" v-if="invalid.section">{{invalid.section}}</small>
            </div>
            <div class="form-group col-md-3">
                <label class="text-left" for="CSlots">Number of Slots</label>
                <input 
                    v-model="course.slots" 
                    class="form-control" 
                    :class="invalid.slots ? 'is-invalid' : ''" 
                    type="number" 
                    id="CSlots" 
                    min="1" 
                    placeholder="Number of Slots"
                    @change="isValidSlots">
                <small class="form-text text-danger" v-if="invalid.slots">{{invalid.slots}}</small>
            </div>
        </div>
        <div class="form-group">
            <label class="text-left" for="CName">Course Name</label>
            <input 
                v-model.trim="course.name" 
                class="form-control" 
                :class="invalid.name ? 'is-invalid' : ''" 
                type="text" id="CName"  
                placeholder="Course Name" 
                required="" 
                @change="isValidField('name')">
            <small class="form-text text-danger" v-if="invalid.name">{{invalid.name}}</small>
        </div>
        <div class="form-group">
            <label class="text-left" for="CProf">Tentative Professor</label>
            <input 
                v-model.trim="course.professor" 
                class="form-control" 
                :class="invalid.professor ? 'is-invalid' : ''" 
                type="text" 
                id="CProf" 
                placeholder="Tentative Professor" 
                required="" 
                @change="isValidField('professor')">
            <small class="form-text text-danger" v-if="invalid.professor">{{invalid.professor}}</small>
        </div>
        <div class="form-row">
            <div class="form-group col-md-1">
                <label class="text-left" for="CUnits">Units</label>
                <input 
                    v-model.trim="course.units" 
                    class="form-control" 
                    :class="invalid.units ? 'is-invalid' : ''" 
                    type="number" 
                    id="CUnits" 
                    required="" 
                    step="0.1" 
                    min="0" 
                    placeholder="No. of Units"
                    @change="isValidUnits">
                <small class="form-text text-danger" v-if="invalid.units">{{invalid.units}}</small>
            </div>
            <div class="form-group col-md-7"></div>
            <div class="form-group col-md-3">
                <label class="text-left" for="AYStart">Academic Year</label>
                <div class="input-group">
                    <input 
                        v-model="course.term.acadyear.from" 
                        class="form-control" 
                        type="number" 
                        id="AYStart" 
                        required="" 
                        placeholder="Year From" 
                        :class="invalid.term.acadyear.from ? 'is-invalid' : ''"
                        @change="course.term.acadyear.to = parseInt(course.term.acadyear.from) + 1; isValidTerm()">
                    <input 
                        v-model="course.term.acadyear.to" 
                        class="form-control"
                        type="number" id="AYEnd" 
                        required="" 
                        placeholder="Year To" 
                        :class="invalid.term.acadyear.to ? 'is-invalid' : ''"
                        @change="course.term.acadyear.from = parseInt(course.term.acadyear.to) - 1; isValidTerm()">
                </div>
                <small class="form-text text-danger" v-if="invalid.term.acadyear.from">{{invalid.term.acadyear.from}}</small>
            </div>
            <div class="form-group col-md-1">
                <label class="text-left" for="TNo">Term</label>
                <select v-model="course.term.termno" class="custom-select" id="TNo">
                    <option selected value="1">1</option>
                    <option selected value="2">2</option>
                    <option selected value="3">3</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label>Course Schedule</label>
            <div class="alert alert-danger" v-if="invalid.schedule" role="alert">
                {{invalid.schedule}}
            </div>
            <div class="table-responsive">
                <table class="rounded table table-light text-center">
                    <thead>
                        <tr>
                            <th colspan="1">Day</th>
                            <th colspan="1">Start Time</th>
                            <th colspan="1">End Time</th>
                            <th colspan="1">Room</th>
                            <th><button type="button" class="btn btn-success" @click="addClassTime">Add</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ct, i) in course.classtimes" :key="i" :class="invalid.classtimes[i] ? 'table-danger' : ''">
                            <td>
                                <div class="input-group">
                                    <select v-model="ct.day" 
                                        class="custom-select" 
                                        @change="isValidSchedule">

                                        <option selected value="M">Monday</option>
                                        <option value="T">Tuesday</option>
                                        <option value="W">Wednesday</option>
                                        <option value="H">Thursday</option>
                                        <option value="F">Friday</option>
                                        <option value="S">Saturday</option>
                                        <option value="L">Sunday</option>
                                        <option value="C">Custom Date</option>

                                    </select>
                                    <input 
                                        v-model="ct.date" 
                                        type="date" 
                                        class="form-control" 
                                        :max="course.term.acadyear.to + '-12-31'" 
                                        :min="course.term.acadyear.from + '-01-01'" 
                                        @change="isValidSchedule"
                                        v-if="ct.day == 'C'">
                                </div>
                            </td>
                            <td>
                                <input 
                                    v-model="ct.time.from" 
                                    :max="ct.time.to" 
                                    class="form-control" 
                                    id="CSTime" 
                                    type="time" 
                                    required="">
                            </td>
                            <td>
                                <input 
                                    v-model="ct.time.to" 
                                    :min="ct.time.from" 
                                    class="form-control" 
                                    id="CETime" 
                                    type="time" 
                                    required="">
                            </td>
                            <td>
                                <input 
                                    v-model.trim="ct.room" 
                                    class="form-control" 
                                    type="text" 
                                    id="CRoom"  
                                    placeholder="Room" 
                                    required="">
                            </td>
                            <td>
                                <button 
                                    type="button" 
                                    class="btn btn-outline-danger"
                                    @click="deleteClassTime(i)" 
                                    :disabled="course.classtimes.length < 2">
                                        Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="form-row text-center" v-if="action == 'ADD'">
            <div class="col-md-10"></div>
            <button 
                class="btn btn-success col-md-2 col-12" 
                id="btnAdd" 
                name="add" 
                type="submit" 
                @click="addCourse"
                :disabled="invalid.any">
                    Add Course
            </button>
        </div>
        <div v-else class="form-row text-center">
            <button 
                class="btn btn-outline-danger col-md-1 col-3" 
                id="btnDelete" 
                name="delete" 
                type="submit" 
                data-toggle="modal"
                data-target="#deleteCourseModal">
                    Delete Course
            </button>
            <span class="col-md-9 col-1"></span>
            <button 
                class="btn btn-success col-md-2 col-8" 
                id="btnUpdate" 
                name="update" 
                type="submit" 
                @click="editCourse"
                :disabled="invalid.any">
                    Update Course
            </button>
        </div>
    </form>
    <div class="h2 text-center" v-if="deleted">
        <div class="m-4">Course deleted successfully.</div>
        <router-link class="nav-link" :to="{name: 'adminManage'}"><button class="btn btn-success">Return to course listing</button></router-link>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="deleteCourseModal" tabindex="-1" role="dialog" aria-labelledby="deleteCourseModelLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteCourseModelLabel">Confirm deletion of course</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this course?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-danger" @click="deleteCourse" data-dismiss="modal">Delete Course</button>
          </div>
        </div>
      </div>
    </div>
</div>
</template>


<script>
import validator from 'validator'
import alertBox from '../components/alert-box'
import spinner from '../components/spinner'

class ClassTime {
    day = "M";
    date = "";
    time = {from: "", to: ""};
    room = "";
}

class Course {
    classnum = "";
    name = "";
    section = "";
    units = 0;
    term = {
        acadyear: {from: new Date().getFullYear(), to: new Date().getFullYear() + 1},
        termno: 1
    };
    classtimes = [new ClassTime()];
    enrolled = [];
    slots = 1;
    professor = "";
}

export default {
    components: {
        'alert-box': alertBox,
        'spinner': spinner
    },
    props: {
        action: {
            type: String,
            default: 'ADD'
        },
        classnum: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            course: new Course(),
            loaded: false,
            deleted: false,
            alert: {
                show: false,
                kind: 'success',
                message: ''
            },
            invalid: {
                classnum: false,
                code: false,
                name: false,
                section: false,
                term: {
                    acadyear: {
                        from: false,
                        to: false
                    }
                },
                classtimes: [],
                schedule: false,
                slots: false,
                professor: false,
                units: false,
                get any() {
                    return this.classnum || 
                           this.code || 
                           this.name || 
                           this.section || 
                           this.term.acadyear.from || 
                           this.term.acadyear.to || 
                           this.schedule || 
                           this.slots || 
                           this.professor || 
                           this.units
                }
            }
        }
    },
    methods: {
        addCourse() {
            if (this.validateInfo()) {
                this.loaded = false
                this.alert.show = false
                this.axios.post('http://localhost:5656/api/courses/', this.course)
                .then((result) => {
                    console.log(result.data.message)
                    this.alert.kind = 'success'
                    this.alert.message = 'Course added successfully!'
                    this.course = new Course()
                }).catch((error) => {
                    this.alert.kind = 'danger'
                    this.alert.message = error
                }).finally(() => {
                    this.alert.show = true
                    this.loaded = true
                })
            }
        },
        editCourse() {
            if (this.validateInfo()) {
                this.loaded = false
                this.alert.show = false
                this.axios.put('http://localhost:5656/api/courses/number/' + this.course.classnum, this.course)
                .then((result) =>{
                    this.alert.kind = 'success'
                    this.alert.message = 'Course updated successfully!'
                    console.log(result.data.message)
                }).catch((error) => {
                    this.alert.kind = 'danger'
                    this.alert.message = error
                }).finally(() => {
                    this.alert.show = true
                    this.loaded = true
                })
            }
        },
        deleteCourse() {
            this.loaded = false
            this.alert.show = false
            this.axios.delete('http://localhost:5656/api/courses/number/' + this.course.classnum, this.course)
            .then((result) =>{
                console.log(result.data.message)
                this.deleted = true
            }).catch((error)=>{
                this.alert.kind = 'danger'
                this.alert.message = error
                this.alert.show = true
                this.loaded = true
            })
        },
        loadCourse(classnum) {
            this.loaded = false
            this.alert.show = false

            this.axios.get('http://localhost:5656/api/courses/number/' + classnum)
            .then((result) => {
                this.loaded = true
                return this.course = result.data
            }).catch((error) => {
                this.alert.kind = 'danger'
                this.alert.message = error
                this.alert.show = true
                this.loaded = true
            })
        },
        addClassTime() {
            this.course.classtimes.push(new ClassTime())
        },
        isValidClassNum() {
            this.invalid.classnum = false
            let classnum = this.course.classnum

            if (!validator.isEmpty(classnum)) {
                if (!validator.isInt(classnum, { min: 0 })) {
                    this.invalid.classnum = "This must be an integer greater than or equal to zero."
                    return false
                }
                if (this.action == 'ADD') {
                    this.axios.get('http://localhost:5656/api/courses/number/' + classnum).then((result)=>{
                        if (result.data) {
                            this.invalid.classnum = "Number is already taken."
                            return false
                        }
                    })
                }
            } else {
                this.invalid.classnum = "This is required."
                return false
            }

            return true
        },
        isValidCode() {
            this.invalid.code = false
            let code = this.course.code

            if (!validator.isEmpty(code)) {
                if (!validator.isLength(code, { min: 7, max: 7 })) {
                    this.invalid.code = "Code must be exactly seven characters."
                    return false
                }
            } else {
                this.invalid.code = "This is required."
                return false
            }

            return true
        },
        isValidField(fieldname) {
            this.invalid[fieldname] = false

            if (typeof this.course[fieldname] === 'string' && validator.isEmpty(this.course[fieldname])) {
                this.invalid[fieldname] = "This is required."
                return false
            }

            return true
        },
        isValidSchedule() {
            this.invalid.schedule = false
            let cts = this.course.classtimes

            let date = {
                'L': 0,
                'M': 1,
                'T': 2,
                'W': 3,
                'H': 4,
                'F': 5,
                'S': 6,
                'C': -1
            }

            for (let i = 0; i < cts.length; i++) {
                this.invalid.classtimes[i] = false
                if (cts[i].time.to < cts[i].time.from) {
                    this.invalid.schedule = 'Your schedule contains conflicting times or rooms! Please make sure that all fields are properly filled and that no timeslots overlap.'
                    this.invalid.classtimes[i] = true
                }
            }

            for (let i = 0; i < cts.length; i++) {
                let ct1 = cts[i]

                for (let j = i + 1; j < cts.length; j++) {
                    let ct2 = cts[j]
                    let ct1CustomDay = ct1.day == 'C' ? new Date(ct1.date).getDay() : date[ct1.day], 
                        ct2CustomDay = ct2.day == 'C' ? new Date(ct2.date).getDay() : date[ct2.day]

                    // Compare if day is equal
                    if (ct1CustomDay == ct2CustomDay) {
                        // Compare if times overlap
                        if (ct2.time.from < ct1.time.to && ct1.time.from < ct2.time.to) {
                            // Compare if they are in the same room
                            if (ct1.room == ct2.room) {
                                this.invalid.classtimes[i] = this.invalid.classtimes[j] = true
                                this.invalid.schedule = 'Your schedule contains conflicting times or rooms! Please make sure that all fields are properly filled and that no timeslots overlap.'
                            }
                        }
                    }
                }
            }

            return !this.invalid.schedule;
        },
        isValidUnits() {
            this.invalid.units = false
            if (this.isValidField('units') && this.course.units < 0) {
                this.invalid.units = 'This must be a number greater than or equal to 0.'
            }

            return !this.invalid.units
        },
        isValidTerm() {
            this.invalid.term.acadyear.from = this.invalid.term.acadyear.to = false
            if (this.course.term.acadyear.from <= 0 && this.course.term.acadyear.to <= 0) {
                this.invalid.term.acadyear.from = this.invalid.term.acadyear.to = 'Years must be a positive integer.'
            }
            if (this.isValidField('term.acadyear.from') 
                && this.isValidField('term.acadyear.to') && this.course.term.acadyear.from - this.course.term.acadyear.to == 1) {

                this.invalid.term.acadyear.from = this.invalid.term.acadyear.to = 'Years must only be 1 year apart of each other.'
            }

            return !this.invalid.term.acadyear.from
        },
        isValidSlots() {
            this.invalid.slots = false
            if (this.isValidField('slots') && this.course.slots <= 0) {
                this.invalid.slots = 'This must be an integer greater than 0.'
            }

            return !this.invalid.slots
        },
        deleteClassTime(ct) {
            this.course.classtimes.splice(ct, 1)
            this.isValidSchedule() 
        },
        checkBlanks() {
            Object.values(this.course).forEach(v => {
                console.log(v)
            })
        },
        validateInfo() {
            let valid = true
            valid = this.isValidUnits() && valid
            valid = this.isValidTerm() && valid
            valid = this.isValidSlots() && valid
            valid = this.isValidSchedule() && valid
            valid = this.isValidClassNum() && valid
            valid = this.isValidCode() && valid
            valid = this.isValidField('name') && valid
            valid = this.isValidField('section') && valid
            valid = this.isValidField('professor') && valid

            return valid
        }
    },
    created() {
        if (this.action == 'EDIT')
            this.loadCourse(this.classnum)
        else
            this.loaded = true
    }
}
</script>


<style scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
</style>