<template>
<div class="main">
  <div class="register-page">
    <div class="form">
      <form class="register-form" v-on:submit.prevent="onSubmit">
        <input v-model="firstname" id="firstname" type="text" placeholder="First Name"/>
        <input v-model="middlename" id="middlename" type="text" placeholder="M. Name"/>
        <input v-model="lastname" id="lastname" type="text" placeholder="Surname"/>
        <input v-model="idnum" id="idnum" type="text" placeholder="ID Number"/>
        <input v-model="address" id="address" type="text" placeholder="Address"/>
        <input v-model="email" id="email" type="email" placeholder="E-mail Address"/>
        <input v-model="birthdate" id="birthday" type="text" placeholder="Birthday" onfocus="(this.type='date')" onblur="(this.type='text')" />
        <input v-model="password" id="pass" type="password" placeholder="Password"/>
        <input v-model="confirmpass" id="confirmpass" type="password" placeholder="Confirm Password"/>
        <button id="signup" type="submit"><b>sign up</b></button>
        <p class="message">Already registered? <router-link :to="{name: 'loginStudent'}">Sign In</router-link></p>
        <p class="error"></p>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            name: "RegisterForm",
            confirmpass: "",

            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            birthdate: null,
            email: "",
            idnum: "",
            password: ""
        }
    },
    methods: {
        
        onSubmit(){ // still needs some validation
            var student = { 
                            firstname: "",
                            middlename: "",
                            lastname: "",
                            address: "",
                            birthdate: "",
                            email: "",
                            idnum: "",
                            password: "",
                            courses: []
                           }

            if(this.validPass(this.password, this.confirmpass)){
                student.firstname = this.firstname
                student.middlename = this.middlename
                student.lastname = this.lastname
                student.address = this.address
                student.birthdate = new Date(Date.parse(this.birthdate))
                student.email = this.email
                student.idnum = this.idnum.toString()
            }

            this.axios.post('http://localhost:5656/api/students/register', student).then((result) =>{
                console.log(result)
            }).catch((error)=>{
                console.log(error)
            })
        },
        validPass(pass, confirmpass){
            return pass == confirmpass
        }

    }
}
</script>

<style scoped src="../../assets/css/login-reg-style.css">
</style>