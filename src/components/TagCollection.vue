<template>
    <div>
        <TagComponent v-for="(tag, index) in tags" :key="index" :tag="tag" :editing="editing"/>
    </div>
</template>

<script>
 import TagComponent from '@/components/Tag.vue'

 export default {
    name: 'TagCollection',
    props: {
        tags: Array, 
        editing: Boolean
    },
    components: {
        TagComponent
    }
 }
</script>