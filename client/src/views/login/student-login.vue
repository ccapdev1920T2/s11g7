<template>
<div class="main">
    <div class="login-page">
        <div class="form">
            <form class="login-form" v-on:submit.prevent="login">
                <input required v-model="input.idnum" id="idnum" type="text" placeholder="ID Number" />
                <input required v-model="input.password" id="password" type="password" placeholder="Password"/>
                <button type="submit"  id="login"><b>login</b></button>
                <p class="message">Not registered? <router-link :to="{name: 'Register'}">Create an account</router-link></p>
                <p class="message admin"><router-link :to="{name: 'loginAdmin'}">Login as Admin</router-link></p>
                <p class="error">{{errorMessage}}</p>
            </form>
        </div>
    </div>
</div>
</template>


<script>
export default {
    name: 'Login',
    data() {
        return {
            input: {
                idnum: '',
                password: ''
            },
            errorMessage: ''
        }
    },
    mounted(){
        localStorage.idnum = ''
    },
    methods: {
        login(){
            this.axios.get('http://localhost:5656/api/students/' + this.input.idnum).then((result)=>{
                console.log(result.data)
                // if id num is found in db
                if(result.data != null){
                    // checks validity of password (not working)
                    // if(result.data.password != this.input.password){
                    //     this.errorMessage = 'Wrong Password'
                    // }
                    // else{
                        localStorage.idnum = this.input.idnum
                        console.log(localStorage.idnum)
                        this.$router.push('Search')
                    // }
                }
                else{
                    this.errorMessage = 'Invalid ID Number'
                    console.log("registering account...")
                    
                }
            })

            
        }
    }
}
</script>


<style scoped src="../../assets/css/login-reg-style.css">
</style>