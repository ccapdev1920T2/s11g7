<template >
<div class="main">
    <div class="login-page">
        <div class="form">
            <form class="login-form" v-on:submit.prevent="login">
                <input required v-model="input.username" id="text" type="text" placeholder="Username"/>
                <input required v-model="input.password" id="password" type="password" placeholder="Password"/>
                <button type="submit" id="login"><b>login</b></button>
                <p class="error m-3">{{errorMessage}}</p>
                <p class="message"><router-link :to="{name: 'loginStudent'}">Login as Student</router-link></p>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            input: {
                username: '',
                password: ''
            },
            errorMessage: ''
        }
    },
    methods:{
        login(){
            this.axios.post('https://animoapi.herokuapp.com/api/admin/login', this.input).then((result)=>{
                console.log(result.data)
                // result
                this.errorMessage = ""
                this.$router.push({name: 'adminManage'})
            }).catch((error)=>{
                console.log(error)
                this.errorMessage = "Invalid Username/Password"
            })
        }
    },
    created(){
        this.axios.defaults.withCredentials = true;
        this.axios.get('https://animoapi.herokuapp.com/api/admin/authenticate-session', {headers:{withCredentials:true}}).then((result) =>{
            if(result.data.admin_id){
                // console.log("User ID from previous session: " + result.data.user_id)
                this.$router.push({name: 'adminManage'})
            }
            else{
                console.log("admin not logged in")
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}
</script>


<style scoped src="../../assets/css/login-reg-style.css">
</style>