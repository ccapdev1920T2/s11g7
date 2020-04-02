<template>

<div>
    <div class="d-flex align-items-center flex-fill top">
        <div class="container box py-5" id="searchform">
            <div class="col-12">
                <form class="form" id="search-course" action="searchresult.html">
                    <h1>Search courses</h1>
                    <div class="input-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Type a course code... (e.g. CCAPDEV, MOBIDEV)" id="courses" name="courses"> 
                        <div class="input-group-append" id="search">
                            <router-link :to="{name: 'Results'}"  class="btn btn-success">
                            <span style="font-size:20px; vertical-align: middle;">Search</span>
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</template>


<script>

export default {
    components: {
        
    }
}

</script>


<style scoped>
.top{
    margin-top: 100px;
}

</style>