<template>
<div class="main">
    <div class="login-page">
        <div class="form">
            <form class="login-form" @submit.prevent>
                <input id="idnum" type="text" placeholder="ID Number" />
                <input id="password" type="password" placeholder="Password"/>
                <router-link :to="{name: 'Search'}"><button type="submit" id="login"><b>login</b></button></router-link>
                <p class="message">Not registered? <router-link :to="{name: 'Register'}">Create an account</router-link></p>
                <p class="message admin"><router-link :to="{name: 'loginAdmin'}">Login as Admin</router-link></p>
            </form>
        </div>
    </div>
    <!--
    <div class="footer"> 
        <p class="message"> <router-link :to="{name: 'loginAdmin'}">Login as Admin </router-link> </p>     
    </div> -->
</div>
</template>


<script>
export default {
    name: 'Login',
    data() {
        return {
            input: {
                username: '',
                password: ''
            }
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