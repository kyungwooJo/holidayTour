<template>
<div class="jungfrauPackageListRootTag">
  <h3 class="packageListHeader">융프라우 추천 일정</h3>
  <div v-for="list in packageLists" :key="list._id">
    <div class="jungfrauPackageListContainer">
        <router-link :to="{ name: 'JungfrauPackageDetail', params: { id: list._id, path: list.pathForList }}"><img :src="list.pathForList" alt=""></router-link>
        <p class="listSummaryInfo">{{list.descriptionForList}}</p>
        <button v-if="user !== null && user.role == 'admin'" @click="deleteFromList(list._id)"><i class="fas fa-trash-alt"></i></button>
    </div>
  </div>
  <router-link to="/AddNewJungfrauList"><button class="addPackageListBtn" v-if="user !== null && user.role == 'admin'">Add</button></router-link>
</div>
</template>

<script>
import axios from 'axios';
export default {

    data() {
        return {
            file: null,
            packageLists: [],
            days: []
        }
    },

    created() {
        this.getList()
    },

    computed: {
        
        user() {
            return this.$root.$data.currentUser.user
        }
    },

    methods: {

        fileChanged(event) {
            this.file = event.target.files[0]
        },

        async addList() {
            const formData = new FormData();
            formData.append('photo', this.file, this.file.name);
            formData.append('descriptionForList', document.getElementById('datail').value);
            
            try{
            await axios.post('/api/jungfrauPackage', formData)
            //To update the home page immediately
            await this.getList()
            }catch(error){
                console.log(error)
            } 
        },

        async getList() {
            try{
            let response = await axios.get('/api/jungfrauPackage/all')
            this.packageLists = response.data
            }catch(error){
                console.log(error)
            }
        },

        async deleteFromList(id) {
            try{
                
                let r = confirm("정말 지우시겠습니까")
                
                if(r){
                await axios.delete('/api/jungfrauPackage/' + id)
                this.getList()
                }
            }catch(error){
                console.log(error)
            }
        },

        onChange(event){
            this.days= []
            for(let i=0; i<event.target.value; i++){
                this.days.push(i)
            }
        }
    }
}
</script>

<style>
    .jungfrauPackageListRootTag{
        padding-top:30px;
        background-color:#F0F3F4;
    }
    
    .jungfrauPackageListContainer{
        position:relative;
        display:flex;
        align-items: center;
        border-top:1px solid black;

    }
    
    .jungfrauPackageListContainer img{
        width:250px;
        height:150px;
        overflow: hidden;
        margin: 20px 0;
        margin-right: 30px;
    }

    .jungfrauPackageListContainer button {
        position:absolute;
        bottom: 50%;
        right:5%;
        font-size:18px;
    }

    .packageListHeader{
        width: 300px;
        border: 1px solid black;
        margin:0;
        padding: 5px 0 5px 10px;
        transition: all 0.2s; 
    }

    .packageListHeader:hover{
        background-color:orange
    }

    .addPackageListBtn{
        margin-top:20px;
        background-color: #008CBA;
        color:white;
        border:none;
        padding: 10px 20px;
        border-radius: 10px;
    }
    
    .listSummaryInfo{
        white-space: pre-line;
        font-size:18px;
    }

</style>