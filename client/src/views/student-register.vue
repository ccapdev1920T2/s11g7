<template>
<div class="main">
  <div class="register-page">
    <div class="form">
      <form class="register-form" v-on:submit.prevent="onSubmit">
        <input v-model="fullname" id="fullname" type="text" placeholder="Full Name (First  Middle  Last)"/>

        <input v-model="idnum" id="idnum" type="number" placeholder="ID Number"/>

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
            fullname: "",
            confirmpass: "",

            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            birthdate: null,
            email: "",
            idnum: "",
            password: ""
           
                //   {
                //     firstname:"Emilie",
                //     middlename:null,
                //     lastname:"Truluck",
                //     address:"4 Sugar Place",
                //     birthdate:"09/08/1996",
                //     email:"etruluck0@usatoday.com",
                //     idnum:11857072,
                //     password:"Na9slDq"
                //   },
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
                student = this.parseFullName(student, this.fullname)
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

        parseFullName(student, fullname){
            var names = fullname.split(" ")
            
            student.firstname = names[0]
            if(names.length == 2){
                student.middlename = null
                student.lastname = names[1]
            }
            else if (names.length == 3){
                student.middlename = names[1]
                student.lastname = names[2]
            }
            else{
                student.middlename = ""
                student.lastname = ""
            }
            return student
        },
        validPass(pass, confirmpass){
            return pass == confirmpass
        }

    }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.register-page {
    width: 660px;
    padding-top: 5%;
    margin: auto;
}

.form {
    border-radius: 3%;
    position: relative;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 6px;
}

.register-page .form input {
    width: 43%;
    margin: 0 15px 15px 15px;
}

#fullname {
    width: 91%;
}

.error {
    color: #EF3B3A;
    margin: auto;
}

.form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #00ab50;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    border-radius: 6px;
}

.register-form button{
    width: 40%;
    margin-top: 10px;
}

.form button:hover,.form button:active,.form button:focus {
    background: #009445;
}
.form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
}
.form .message a {
    color: #4CAF50;
    text-decoration: none;
}
.container {
    position: relative;
    z-index: 1;
    max-width: 300px;
    margin: 0 auto;
}
.container:before, .container:after {
    content: "";
    display: block;
    clear: both;
}
.container .info {
    margin: 50px auto;
    text-align: center;
}
.container .info h1 {
    margin: 0 0 15px;
    padding: 0;
    font-size: 36px;
    font-weight: 300;
    color: #1a1a1a;
}
.container .info span {
    color: #4d4d4d;
    font-size: 12px;
}
.container .info span a {
    color: #000000;
    text-decoration: none;
}
.container .info span .fa {
    color: #EF3B3A;
}

.main {
    min-height: 100vh;
    background: url('../assets/img/login-reg-background.jpg') no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;      
}

</style>