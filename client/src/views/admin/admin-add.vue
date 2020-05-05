<template>
    <div>
        <admin-header/>
        <course-form action="ADD"/>
    </div>
</template>

<script>
import adminHeader from '../components/admin-header'
import courseForm from './course-form.vue'

export default {
    components: {
        'admin-header': adminHeader,
        'course-form': courseForm
    }
}
</script>

<style>

</style>