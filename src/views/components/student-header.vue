<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link :to="{name: 'Search'}" class="navbar-brand d-flex align-items-center justify-content-center" style="font-family: 'EB Garamond', serif;">
            <img src="../../assets/img/dlsu-logo.png" style="height: 50px; margin-right: 10px;">ANIMOSIS
        </router-link>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <router-link class="nav-link" :to="{name: 'Search'}">Search courses</router-link>
                </li>
                <li class="nav-item active" >
                    <router-link class="nav-link" :to="{name: 'Manage'}">Manage courses</router-link>
                </li>
            </ul>
            <ul class="navbar-nav mt-2 mt-lg-0 justify-content-end">
                <li class="nav-item active">
                <button v-on:click="logout" class="astext nav-link">Logout</button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout(){
            console.log("User logging out...")
            this.axios.defaults.withCredentials = true;
            this.axios.get('https://animoapi.herokuapp.com/api/students/logout', {headers:{withCredentials:true}}).then((result) =>{
                console.log(result.data)
                this.$router.push({name: 'loginStudent'})
            }).catch((error)=>{
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
.astext {
    background:none;
    border:none;
    margin:0;
    padding:0;
    cursor: pointer;
}
</style>