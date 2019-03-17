<template>   
    <div :id="$options.name" class="container main-container">
        
        <h4>Tags</h4>
        <div v-if="tagsLoading" class="text-muted">Loading...</div>
        <div v-else>
            <div class="tag-collections" @click="showModal">
                <template v-if="hasTags">
                    <TagCollection class="tag-collection" :editing="editing" :tags="normalTags" name="normal" />
                    <TagCollection class="tag-collection" :editing="editing" :tags="specialTags" name="special" />
                </template>
                <div v-else class="btn no-tags-button">No data!</div>
            </div>
            <ModalPopup ref="modal-popup" :normalTags="normalTags" :specialTags="specialTags" :editing="editing" />
        </div>
        
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TagCollection from '@/components/TagCollection.vue'
import ModalPopup from '@/components/Modal.vue'

export default {
    name: 'tags-app',
    data(){
        return {
            editing: false,
            tagsLoading: false,
        }
    },
    components: {
        TagCollection,
        ModalPopup
    },
    computed: {
        ...mapState([
            'tags'
        ]),
        ...mapGetters([
            'normalTags',
            'specialTags'
        ]),
        hasTags(){
            return this.tags.length;
        },
    },
    created(){
        this.getTags();
    },
    methods: {
        showModal() {
            this.$refs['modal-popup'].show();
        },
        getTags(){
            this.tagsLoading = true;
            this.$store.dispatch('getTags').then( () => {
                this.tagsLoading = false;
            }).catch( error => {
                this.tagsLoading = false;
                console.log(error);
            });
        }
    },

}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';

#tags-app {
    background-color: #efefef;
    min-height:100vh;
    padding-top:0.5rem;
}
.tag-collections{
    cursor: copy;
    background: white;
    padding:0.5rem;
    border-radius:4px;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to{
    opacity: 0;
}
</style>
