<template >
<div class="main">
    <div class="login-page">
        <div class="form">
            <form class="login-form">
                <input id="text" type="text" placeholder="Username"/>
                <input id="password" type="password" placeholder="Password"/>
                <router-link :to="{name: 'adminManage'}"><button type="submit" id="login"><b>login</b></button></router-link>
                <p class="message"><router-link :to="{name: 'loginStudent'}">Login as Student</router-link></p>
                <p class="error">{{errorMessage}}</p>
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
            this.axios.post('http://localhost:5656/api/admin/login', this.input).then((result)=>{
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
        this.axios.get('http://localhost:5656/api/admin/authenticate-session', {headers:{withCredentials:true}}).then((result) =>{
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