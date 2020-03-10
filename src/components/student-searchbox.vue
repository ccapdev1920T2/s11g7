<template>

<div>
    <div class="d-flex align-items-center flex-fill aaa">
        <div class="container box py-5" id="searchform">
            <div class="col-12">
                <form class="form" id="search-course" action="searchresult.html">
                    <h1>Search courses</h1>
                    <div class="input-group">
                        <input class="form-control form-control-lg" type="text" placeholder="Type a course code... (e.g. CCAPDEV, MOBIDEV)" id="courses" name="courses"> 
                        <div class="input-group-append" id="search">
                            <input class="btn btn-success" type="submit" value="Search">
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
.aaa{
    margin-top: 150px;
}
</style>