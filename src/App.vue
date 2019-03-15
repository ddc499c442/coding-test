<template>
    <div :id="$options.name" >
        <div class="tag-collections" @click="toggleModal">
            <template v-if="tags.length > 0">
                <TagCollection class="tag-collection" :editing="editing" :tags="normalTags" name="normal" />
                <TagCollection class="tag-collection" :editing="editing" :tags="specialTags" name="special" />
            </template>
            <div v-else class="btn no-tags-button" @click="toggleModal">No data!</div>
        </div>
        <div id="staff-tag-edit-modal" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Staff tags</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-tag-collections">
                            <div class="row-fluid">
                                <div class="span6">
                                    <TagCollection
                                        class="tag-collection"
                                        :editing="true"
                                        :tags="normalTags"
                                        name="normal" />
                                </div>
                                <div class="span6">
                                    <TagCollection
                                        class="tag-collection"
                                        :editing="true"
                                        :tags="specialTags"
                                        name="special" />
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span4">
                                <div class="tag-input">
                                    <input v-model.trim="tagText"
                                           @keyup.enter.prevent="addTag"
                                           @keyup.tab="addTag"
                                           @keydown.59.exact.prevent="addTag"
                                           @keydown.188.exact.prevent="addTag"
                                    >
                                </div>
                            </div>
                            <div class="span4">
                                <div class="tag-select">
                                    <select v-model.trim="tagSelect" @change="addSelect">
                                        <option v-for="tag in predefinedTags" :value="tag">
                                            {{ tag }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <span v-if="errorText"><span class="badge">Error</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 import $ from 'jquery'

 import 'bootstrap'
 import { EventBus } from './EventBus'
 import TagCollection from './components/TagCollection.vue'

 import 'bootstrap/dist/css/bootstrap.min.css'
 export default {
     name: 'tags-app',
     data () {
         return {
             editing: false,
             errorText: '',
             tags: [
             ],
             showModal: false,
             tagText: '',
             tagSelect: '',
             predefinedTags: [
                 'testing:low',
                 'testing:high',
             ],
         }
     },
     components: {
         TagCollection
     },
     computed: {
         hasTags () {
             return this.data.tags.length > 0
         },
         // Modify these functions so that tags with a prefix are
         // shown by themselves, without are shown in their own section
         normalTags () {
             let prefix = ''
             return []
         },
         specialTags () {
             let prefix = 'testing'
             return []
         },
     },
     created () {
         this.fetchData()
         EventBus.$on('peerj:staff-tags:delete', id => {
             this.deleteTag(id)
         })
     },
     methods: {
         isTagType (tag, tagType) {
             return tag.name.indexOf(tagType) != -1
         },
         editTags () {
             this.editing = !this.editing
         },
         toggleModal () {
             $('#staff-tag-edit-modal').modal('show')
         },
         fetchData () {
         },
         addTag () {
             let name = this.tagText
             if (name != '') {
                 console.log('Tag added')
             }
         },
         addSelect () {
             let vue = this
             let name = this.tagSelect
             if (name != '') {
                 console.log('Tag added')
             }
         },
         deleteTag (id) {
         }
     },

 }
</script>

<style>
 #tags-app {
     width: 50%;
     height: 50%;
     cursor: copy;
     background-color: #ccc;
 }

 .tag-collection {
     margin-bottom: .5em;
 }

 .tag-collection:last-child {
     margin-bottom: 0em;
 }

 .modal {
     cursor: auto;
 }

 .modal-tag-collections {
     padding-bottom: 1em;
 }

 .modal-mask {
     position: fixed;
     z-index: 9998;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, .5);
     display: table;
     transition: opacity .3s ease;
 }

 .modal-wrapper {
     display: table-cell;
     vertical-align: middle;
 }

 .modal-container {
     width: 300px;
     margin: 0px auto;
     padding: 20px 30px;
     background-color: #fff;
     border-radius: 2px;
     box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
     transition: all .3s ease;
     font-family: Helvetica, Arial, sans-serif;
 }

 .modal-header h3 {
     margin-top: 0;
     color: #42b983;
 }

 .modal-body {
     margin: 20px 0;
 }

 .modal-default-button {
     float: right;
 }

 /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

 .modal-enter {
     opacity: 0;
 }

 .modal-leave-active {
     opacity: 0;
 }

 .modal-enter .modal-container,
 .modal-leave-active .modal-container {
     -webkit-transform: scale(1.1);
     transform: scale(1.1);
 }</style>
