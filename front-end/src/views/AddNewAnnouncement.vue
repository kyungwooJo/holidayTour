<template>
  <MainMenu />
  <h3>사진 추가하기</h3>
  <input id="photosInput" type="file" name="photo" @input="inputChanged" multiple>
  <div v-if="urls">
  <img v-for="url in urls" :key="url" :src="url" />
  </div>

    <div class="questionFormContainer">
        <div>
            <label for="" class="questionFormLabel">이름</label>
            <input class="quesiontFormInput" v-model="name" type="text" >
        </div>
        <div>
            <label for="" class="questionFormLabel">제목</label>
            <input class="quesiontFormInput" v-model="title" type="text">
        </div>
        <label for="" class="questionFormLabel">내용</label>
        <div>
        <textarea name="" id="questionContent" cols="80" rows="25" v-model="content"></textarea>
        </div>
        <router-link to='/AnnouncementList'><button id="questionSubmitBtn" @click="upload">작성</button></router-link>
    </div>
</template>

<script>
import MainMenu from '../components/MainMenu'
import axios from 'axios'
export default {

    data() {
        return{
            title: "",
            name: "",
            content: "",
            files: [],
            urls:[]

        }
    },

    components:{
        MainMenu
    },

    methods: {
        
        inputChanged(event) {
            this.urls = [];   
            this.files = event.target.files;

            for(let i=0; i<this.files.length; i++){
            this.urls.push(URL.createObjectURL(this.files[0]));
            }
        },

        async upload() {
            try {
                const formData = new FormData();
        
                var ins = document.getElementById('photosInput').files.length;
                for (var x = 0; x < ins; x++) {
                    formData.append('photo', document.getElementById('photosInput').files[x], document.getElementById('photosInput').files[x].name)
                }
                
                let r1 = await axios.post('/api/announcements/photos', formData);
                let r2 = await axios.post('/api/announcements', {
                title: this.title,
                name: this.name,
                content: this.content,
                pathArray: r1.data
                });
                this.addItem = r2.data;
                console.log(this.addItem);
            }catch (error) {
                console.log(error);
            }
        },
        
    }
}
</script>

<style>

</style>