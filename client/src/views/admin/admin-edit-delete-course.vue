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
    }
}
</script>

<style>

</style>