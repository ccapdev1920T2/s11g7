<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
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
                        <router-link class="nav-link" :to="{name: 'loginStudent'}">Logout</router-link>
                    </li>
                </ul>
            </div>

        </div>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>