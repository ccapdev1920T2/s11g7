<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center justify-content-center" style="font-family: 'EB Garamond', serif;">
                <router-link :to="{name: 'Search'}">
                <img src="../assets/img/dlsu-logo.png" style="height: 50px; margin-right: 10px;">
                ANIMOSIS
                </router-link>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <a class="nav-link"><router-link :to="{name: 'Search'}">Search courses</router-link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"> <router-link :to="{name: 'Manage'}">Manage courses</router-link></a>
                    </li>
                </ul>
                <ul class="navbar-nav mt-2 mt-lg-0 justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link"> <router-link :to="{name: 'loginStudent'}">Logout</router-link></a>
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
a{
    color: initial;
    text-decoration: initial;
    display: flex;
    align-items: center;
}
</style>