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
    }
}
</script>


<style scoped src="../../assets/css/login-reg-style.css">
</style>