import Vue from 'vue'
import Vuex from 'vuex'
import tagData from '@/tagData.js'
Vue.use(Vuex);

export default new Vuex.Store({    
    state: {
        tags: [],
    },

    getters: {
        normalTags: state => {
            let prefix = 'testing:';
            return state.tags.filter( tag => {
                if(tag.name.substring(0, prefix.length) != prefix)
                    return tag;
            });
        },
        specialTags: state => {
            let prefix = 'testing:';
            return state.tags.filter( tag => {
                if(tag.name.substring(0, prefix.length) == prefix)
                   return tag;
            });
        },
    },

    mutations: {
        setTags(state, tags){
            state.tags = tags;
        },
        addTag(state, tagName){
            //Make sure not to add a tag that already exists
            for(var i=0; i<state.tags.length; i++){
                if(state.tags[i].name == tagName){
                    return;
                }
            }
            
            state.tags.push({
                name: tagName,
                id: Date.now()
            });
        },
        deleteTag(state, tagId){
            for(var i=0; i<state.tags.length; i++){
                if(state.tags[i].id == tagId){
                    state.tags.splice(i, 1);
                    break;
                }
            }
        }
    },
    
    actions: {
        //Simulate api call
        getTags({commit}){
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('setTags', tagData);
                    resolve(true);
                }, 400);
            });
        },

        //Simulate api call
        addTag({commit}, tagName){
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('addTag', tagName);
                    resolve(true);
                }, 400);
            });
        },

    }
})