<template >
<div class="main">
    <div class="login-page">
        <div class="form">
            <form class="login-form" v-on:submit.prevent="login">
                <input required v-model="input.username" id="text" type="text" placeholder="Username"/>
                <input required v-model="input.password" id="password" type="password" placeholder="Password"/>
                <button type="submit" id="login"><b>login</b></button>
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
        }
    },
    methods:{
        login(){
            this.$router.push('admin-manage')
        }
    }
}
</script>


<style scoped src="../../assets/css/login-reg-style.css">
</style>