<template>
<div>
    <hr>
    <div v-for="(path, idx) in info.pathForDetail" :key="path">
      <div class="packageDetailInfoBox">
        <div class="packageDayandImageContainer">
            <p>Day{{idx}}</p>
            <input id="photosInput" type="file" @change="fileChanged($event, idx)" >
            <img :src="urls[idx]" alt="">
        </div>
        <textarea :id="'packageDescriptionInfo'+idx" :placeholder="info.descriptionForDetail[idx]"></textarea>
        <button @click="editPackageInfo(idx)">수정</button>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {

    props: {
        info: Object,
    
    },

    data() {
        return {
            urls: this.info.pathForDetail,
            file: [],
            imageUrls: []
        }
    },
   
    methods: {   
        fileChanged(event, position) {
            this.file[position] = event.target.files[0]
            this.urls[position] = URL.createObjectURL(this.file[position])
        },

        async editPackageInfo(position) {
            const formData = new FormData();

    
            if(this.file[position] !== undefined) {
            formData.append('photo', this.file[position], this.file.name);
            }
    
            formData.append('description', document.getElementById('packageDescriptionInfo' + position).value);
            formData.append('postion', position)
            alert("해당 날짜 수정을 완료하였습니다")

            try{
                await axios.put('/api/jungfrauPackage/package/' + this.info._id, formData) 
            }catch(error){
                console.log("dw111d")
                console.log(error)
            }
        }
    }
}
</script>

<style>
 .packageDetailInfoBox textarea {
     width: 80%;
     height: 110px;
     margin-top:80px;
 }

 .packageDetailInfoBox button {
     margin-top: 70px;
     margin-left: 20px;
     background-color: #008CBA;
     color:white;
     border:none;
     padding: 10px 20px;
     border-radius: 10px;
 }

</style>