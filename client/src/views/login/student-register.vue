<template>
<div class="main">
  <div class="register-page">
    <div class="form">
      <form class="register-form" v-on:submit.prevent="onSubmit">
        <input required v-model="firstname"  id="firstname" type="text" placeholder="First Name"/>
        <input required v-model="middlename" id="middlename" type="text" placeholder="M. Name"/>
        <input required v-model="lastname" id="lastname" type="text" placeholder="Surname"/>
        <input required v-model="idnum" id="idnum" type="text" placeholder="ID Number"/>
        <input required v-model="address" id="address" type="text" placeholder="Address"/>
        <input required v-model="email" id="email" type="email" placeholder="E-mail Address" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="characters@characters.domain" />
        <input required v-model="birthdate" id="birthdate" type="text" placeholder="Birthday" onfocus="(this.type='date')" onblur="(this.type='text')" />
        <input required v-model="password" id="password" type="password" placeholder="Password" pattern="^\S{6,}$" title="Must have atleast 6 characters" onchange="this.setCustomValidity(this.validity.patternMismatch ? 'Must have at least 6 characters' : ''); if(this.checkValidity()) form.confirmpass.pattern = this.value;"/>
        <input required v-model="confirmpass" id="confirmpass" type="password" placeholder="Confirm Password" onchange="this.setCustomValidity(this.validity.patternMismatch ? 'Please enter the same Password' : '');"/>
        <button id="signup" type="submit"><b>sign up</b></button>
        <p class="message">Already registered? <router-link :to="{name: 'loginStudent'}">Sign In</router-link></p>
        <p class="error">{{errorMessage}}</p>
        <p class="success">{{successMessage}}</p>
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
            password: "",
            errorMessage: "",
            successMessage: "",
        }
    },
    methods: {
        onSubmit(){
            var student = { 
                            firstname: this.firstname,
                            middlename: this.middlename,
                            lastname: this.lastname,
                            address: this.address,
                            birthdate: new Date(Date.parse(this.birthdate)),
                            email: this.email,
                            idnum: this.idnum.toString(),
                            password: this.password,
                            courses: []
                           }

            this.axios.get('api/students/' + this.idnum).then((result)=>{
                console.log(result.data)
                if(result.data != null){
                    this.errorMessage = "ID Number already registered!"
                }
                else{
                    this.errorMessage = ''
                    console.log("registering account...")
                    this.axios.post('api/students/register', student).then((result) =>{
                        console.log(result)
                        this.successMessage = "Account successfully registered! Going back to home page"
                        window.location = "/registerSuccess"
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
            })
        }
    }
}
</script>

<style scoped src="../../assets/css/login-reg-style.css">

</style>