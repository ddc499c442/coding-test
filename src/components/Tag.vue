<template>
    <transition name="bounce-fade" appear>
        <div :contentEditable="editable" class="article-tag peerj-article-tag staff-tag" :class="[ tagClass, tagTypeClass, testingTagClass]">
            <div class="tag-inner">
                {{ tag.name }}
                <span v-if="editing" @click="deleteTag" class="ml-2 delete-icon">×</span>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
     name: 'Tag',
     props: {
         tag: Object,
         editing: Boolean,
         'tag-type': String,
     },
     data () {
         return {
             editable: false
         }
     },
     computed: {
         tagClass () {
             return 'tag-' + this.tag.name.replace(' ', '-');
         },
         tagTypeClass () {
             return this.tagType + '-tag'
         },
         testingTagClass(){
            if(this.editing){
                var prefix = 'testing:';
                if(this.tag.name.substring(0, prefix.length) == prefix){
                    return 'tag-testing';
                }
            }
         }

     },
     methods: {
         makeEditable () {
             this.editable = !this.editable
         },
         deleteTag () {
            this.$store.commit('deleteTag', this.tag.id);
         }
     }
}
</script>

<style scoped>

.tag-inner{
    display:flex;
}
.tag-testing{
    background: #3a87ad !important;
    color: white !important;
}

.peerj-article-tag,
.peerj-article-tag:hover {
    white-space: nowrap;
    border-radius: 5px;
    display: inline-block;
    vertical-align: bottom;
    font-size: 0.9rem;
    margin: 0 2px 2px 0;
    padding: 0 7px;
    color: #ffffff;
    background-color: #3a87ad;
    position:relative;
}

.peerj-article-tag.staff-tag {
    color: #636363;
    background-color: #dddddd;
}

.peerj-article-tag.journal-tag {
    background-color: #3a87ad;
}

.peerj-article-tag.non-research-article-tag {
    background-color: #d83671;
}

.peerj-article-tag.preprint-tag {
    background-color: #ef8b00;
}

.peerj-article-tag.needs-preprint-tag  {
    background-color: #ec9c9c;
}

.peerj-article-tag.appeal-tag  {
    background-color: #e43c2b;
}

.peerj-article-tag.research-article-tag {
    background-color: #6f6f6f;
}

.peerj-article-tag.special-tag {
    background-color: #bada55;
}

/* Tags in metadata header */

.article-labels > .peerj-article-tag {
    margin-bottom: 0;
    margin-right: -1px;
}

/* NEW TAGS END */


.article-tag .article-tag-remove-form {
    cursor: pointer;
    opacity: 0.3;
}

.article-tag:hover .article-tag-remove-form {
    opacity: 1.0;
}

.article-tag-remove-form {
    display: inline-block;
    margin: 0;
}

.article-tag-remove-form .btn {
    padding: 0;
}

#article_tag_name {
    margin-bottom: 1rem;
}

.input-append .btn {
    padding: 4px 12px; /* restore style */
}

/*Tag filter items*/
.btn-tag-filter-active,
.btn-tag-filter-active a
{
    color:deeppink;
    margin-right: 10px;
}

.production-tag-filter-row {
    margin-bottom: 20px;
}

.tag-active-btn {
    background: deeppink;
    border: none;
    border-radius: 8px;
    color: white !important;
    font-size: 16px;
}

.tag-active-btn:hover,
.tag-active-btn:active,
.tag-active-btn:focus {
    background: #d60074;
}

.tag-filter-active {
    border: 2px solid deeppink;
    padding-top: 15px;
}

.clickable {
    cursor: pointer;
 }
.delete-icon{
    padding:0 4px;
    font-size:1.5rem;
    line-height:0.9rem;
    cursor:pointer;
}
.delete-icon:hover{
    background: rgba(0,0,0,0.1);
}

.bounce-fade-enter-active, .bounce-fade-leave-active {
    transition: all 0.2s;
    
}
.bounce-fade-enter, .bounce-fade-leave-to{
    opacity: 0;
    transform: scale(2);
}
</style>
