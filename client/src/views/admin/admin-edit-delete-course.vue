<template>
    <div>
        <admin-header/>
        <course-form action="EDIT" :classnum="classnum"/>
    </div>
</template>

<script>
import adminHeader from '../components/admin-header'
import courseForm from './course-form.vue'

export default {
    components: {
        'admin-header': adminHeader,
        'course-form': courseForm
    },
    data() {
        return {
            classnum: this.$route.params.classnum
        }
    },
    created(){
        this.axios.defaults.withCredentials = true;
        this.axios.get('api/admin/authenticate-session', {headers:{withCredentials:true}}).then((result) =>{
            if(result.data.admin_id){
                console.log("Admin logged in")
            }
            else {
                console.log("Unauthorized access")
                this.$router.push({name: 'loginAdmin'})
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}
</script>

<style>

</style>