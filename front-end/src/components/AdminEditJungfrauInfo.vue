<template>
<div>
  <div v-for="(item, index) in infoItems" :key="item.id">
      <div class="jungfrauInfoContainer">
        <img :src="item.path">
        <img v-if="urls[index]" :src="urls[index]">
        <label>사진 바꾸기</label>
        <input id="photosInput" type="file" @change="fileChanged($event, index)" >
        <input :id="item.id" type="text" placeholder="제목">
        <textarea class="editJunfInfoTextbox" :id="item.path" name="" placeholder="내용"></textarea>
        <button class="editJungInfoBtn" @click="editJungfrauInfo(item.id, index)">수정</button>
      </div>
      <hr>
  </div>
  <div>
      <input id="photosInput" type="file" @change="fileChangedd($event, idx)" >
      <input id="titleForEdit" type="text">
      <textarea id="descriptionForEdit"></textarea>
      <button @click="uploadInfo">확인</button>
  </div>


</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            urls: [],
            file: null,
            file0: null,
            file1: null,
            file2: null,
            file3: null,
            file4: null,
            infoItems: []
        }
    },

    created() {
        this.getAllInfos()
    },

    methods: {

        fileChangedd(event, position) {
            this.file = event.target.files[0]
            console.log(this.file)
        },

        async uploadInfo() {
             const formData = new FormData();
             formData.append('photo', this.file, this.file.name);
             formData.append('title', document.getElementById('titleForEdit').value)
             formData.append('description', document.getElementById('descriptionForEdit').value)

             try{
                await axios.post('/api/jungfrauInfo', formData)
             }catch(error){
                 console.log(error)
             }
        },

        //this is a method to show the chosen image that Admin tries to swicth with the existed picture 
        fileChanged(event, idx) {

        if(idx == 0){
            this.file0 = event.target.files[0]
            this.urls[0] = URL.createObjectURL(this.file0)
        }

        if(idx == 1){
            this.file1 = event.target.files[0]
            this.urls[1] = URL.createObjectURL(this.file1)
        }

        if(idx == 2){
            this.file2 = event.target.files[0]
            this.urls[2] = URL.createObjectURL(this.file2)
        }

        if(idx == 3){
            this.file3 = event.target.files[0]
            this.urls[3] = URL.createObjectURL(this.file3)
        }

        if(idx == 4){
            this.file4 = event.target.files[0]
            this.urls[4] = URL.createObjectURL(this.file4)
            console.log(this.urls)
        }
            
        },

        async getAllInfos() {
            try {
                let response = await axios.get('/api/jungfrauInfo/all')
                this.infoItems = response.data
                console.log(this.infoItems)
            }catch(error){
                console.log(error)
             
            }
        },

        async editJungfrauInfo(id, idx) {
            try {

                  if(idx == 0){  
                    const formData = new FormData();
                    formData.append('photo', this.file0, this.file0.name);
                    formData.append('title', document.getElementById(this.infoItems[0].id).value);
                    formData.append('description',  document.getElementById(this.infoItems[0].path).value);
                    await axios.put("/api/jungfrauInfo/" + id, formData);
                  }

                  if(idx == 1){  
                    const formData = new FormData();
                    formData.append('photo', this.file1, this.file1.name);
                    formData.append('title', document.getElementById(this.infoItems[1].id).value);
                    formData.append('description',  document.getElementById(this.infoItems[1].path).value);
                    await axios.put("/api/jungfrauInfo/" + id, formData);
                  }

                  if(idx == 2){  
                    const formData = new FormData();
                    formData.append('photo', this.file2, this.file2.name);
                    formData.append('title', document.getElementById(this.infoItems[2].id).value);
                    formData.append('description',  document.getElementById(this.infoItems[2].path).value);
                    await axios.put("/api/jungfrauInfo/" + id, formData);
                  }

                  if(idx == 3){  
                    const formData = new FormData();
                    formData.append('photo', this.file3, this.file3.name);
                    formData.append('title', document.getElementById(this.infoItems[3].id).value);
                    formData.append('description',  document.getElementById(this.infoItems[3].path).value);
                    await axios.put("/api/jungfrauInfo/" + id, formData);
                  }
                  
                  if(idx == 4){  
                    const formData = new FormData();
                    formData.append('photo', this.file4, this.file4.name);
                    formData.append('title', document.getElementById(this.infoItems[4].id).value);
                    formData.append('description',  document.getElementById(this.infoItems[4].path).value);
                    await axios.put("/api/jungfrauInfo/" + id, formData);
                  }

                  return true;
            } catch (error) {
                console.log(error)
            }
        },

    }
}
</script>

<style>
    .jungfrauInfoContainer{
        display:flex;
        flex-direction: column;
        align-items: center;
    }

    .jungfrauInfoContainer input {
        width:25%;
        margin-top: 10px;
    }


    .jungfrauInfoContainer button {
        width: 8%
    }

    .editJunfInfoTextbox{
        width:350px;
        height: 350px;
        margin-top:30px;
    }

    .editJungInfoBtn{
        background-color:salmon;
        font-size:20px;
        border: none;
        border-radius: 10px;
        transition: all 0.2s;
        margin-top:20px;
        margin-bottom:20px;
    }

    .editJungInfoBtn:hover {
        background-color: orange;
    }
</style>