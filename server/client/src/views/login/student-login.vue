<template>
<div class="main">
    <div class="login-page">
        <div class="form">
            <form class="login-form" v-on:submit.prevent="login">
                <input required v-model="input.idnum" id="idnum" type="text" placeholder="ID Number" />
                <input required v-model="input.password" id="password" type="password" placeholder="Password"/>
                <button type="submit"  id="login"><b>login</b></button>
                <p class="error m-3">{{errorMessage}}</p>
                <p class="message">Not registered? <router-link :to="{name: 'Register'}">Create an account</router-link></p>
                <p class="message admin"><router-link :to="{name: 'loginAdmin'}">Login as Admin</router-link></p>
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
    methods: {
        login(){
            this.axios.post('http://localhost:5656/api/students/login', this.input).then((result)=>{
                console.log(result.data)
                // result
                this.errorMessage = ""
                this.$router.push({name: 'Search'})
            }).catch((error)=>{
                console.log(error)
                this.errorMessage = "Invalid ID Number/Password"
            })
        }
    },
    created(){
        this.axios.defaults.withCredentials = true;
        this.axios.get('http://localhost:5656/api/students/authenticate-session', {headers:{withCredentials:true}}).then((result) =>{
            if(result.data.user_id){
                console.log("User ID from previous session: " + result.data.user_id)
                this.$router.push({name: 'Search'})
            }
            else{
                console.log("No previous user logged in")
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

</script>


<style scoped src="../../assets/css/login-reg-style.css">
</style>