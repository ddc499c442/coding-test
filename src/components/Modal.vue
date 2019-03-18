<template>
    
    <div>

        <transition name="fade">
            <div class="modal-overlay" v-if="visible">

            </div>
        </transition>

        <transition name="slide-down">
            <div class="modal" v-if="visible" @click.self="hide">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Staff tags</h4>
                            <button type="button" class="close" aria-label="Close" @click="hide"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">

                            <div class="modal-tag-collections">
                                <div class="row">
                                    <div class="col-6">
                                        <TagCollection
                                            class="tag-collection"
                                            :editing="true"
                                            :tags="normalTags"
                                            name="normal" />
                                    </div>
                                    <div class="col-6">
                                        <TagCollection
                                            class="tag-collection"
                                            :editing="true"
                                            :tags="specialTags"
                                            name="special" />
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3 mb-3">
                                <div class="col-6">
                                    <div class="tag-input">
                                        
                                        <div class="input-group">
                                            <input v-model.trim="tagText"
                                                    @keyup.enter.prevent="addTag"
                                                    @keyup.tab="addTag"
                                                    @keydown.59.exact.prevent="addTag"
                                                    @keydown.188.exact.prevent="addTag"
                                                    :disabled="saving"
                                                    ref="tag-input"
                                                    class="form-control"
                                            >
                                            <div class="input-group-append">
                                                <button class="btn btn-secondary" type="button" @click="addTag">Add</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="tag-select">

                                        <div class="input-group">
                                            <select v-model.trim="tagSelect" :disabled="saving" class="form-control">
                                                <option v-for="(tag, index) in predefinedTags" :value="tag" :key="index">
                                                    {{tag}}
                                                </option>
                                            </select>
                                            <div class="input-group-append">
                                                <button class="btn btn-secondary" type="button" @click="addSelect">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="errorText" class="mt-2 alert alert-danger">Error</div>

                        </div>
                    </div>
                </div>
            </div>
        </transition>
        
    </div>

</template>

<script>
import TagCollection from '@/components/TagCollection.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        TagCollection
    },
    data(){
        return{
            visible: false,
            tagText: '',
            tagSelect: '',
            errorText: '',
            saving: false,
            predefinedTags: [
                'testing:low',
                'testing:high',
            ],
        }
    },
    computed: {
        ...mapGetters([
            'normalTags',
            'specialTags'
        ]),
    },
    methods: {
        addSelect(){
            if(this.tagSelect){
                this.saving = true;
                this.$store.dispatch('addTag', this.tagSelect).then(() => {
                    this.saving = false;
                    this.tagSelect = '';
                }).catch(error => {
                    this.saving = false;
                    console.log(error);
                });
            }
        },
        addTag(){
            if(this.tagText){
                this.saving = true;
                this.$store.dispatch('addTag', this.tagText).then(() => {
                    this.saving = false;
                    this.tagText = '';
                }).catch(error => {
                    this.saving = false;
                    console.log(error);
                });
            }
        },
        show(){
            this.visible = true;
            setTimeout(()=>{
                this.$refs['tag-input'].focus();
            }, 200);
        },
        hide(){
            this.visible = false;
        }
    }
}
</script>

<style scoped lang="scss">
.modal-overlay{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    display:flex;
    align-items:center;
}
.modal{
    display: block;
}



.slide-down-enter-active, .slide-down-leave-active {
    transition: transform 0.2s;
}
.slide-down-enter, .slide-down-leave-to{
    opacity: 0;
    transform: translateY(-100px);
}
</style>