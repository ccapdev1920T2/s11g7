<template>
    <div class="alert" :class="class_" role="alert">
        {{message}}
    </div>
</template>

<script>
export default {
    props: {
        kind: {
            type: String
        },
        message: {
            type: String
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        class_: function() {
            return 'alert-' + this.kind;
        }
    }
}
</script>

<style>

</style>