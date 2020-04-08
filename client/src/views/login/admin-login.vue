<template >
<div class="main">
    <div class="login-page">
        <div class="form">
            <form class="login-form">
                <input id="text" type="text" placeholder="Username"/>
                <input id="password" type="password" placeholder="Password"/>
                <router-link :to="{name: 'adminManage'}"><button type="submit" id="login"><b>login</b></button></router-link>
                <p class="message"><router-link :to="{name: 'loginStudent'}">Login as Student</router-link></p>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
}
</script>


<style scoped src="../../assets/css/login-reg-style.css">
</style>