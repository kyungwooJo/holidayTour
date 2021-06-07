<template>
<div>
    <MainMenu />
    <div>
       <div v-if="!isListAdded">
            <h2>홈화면에 표시될 요약 스케쥴 추가하기</h2>
            <div class="summaryForm">
                <div class= "summaryFormPhotoInfo">
                <img :src="urls[0]" alt="">
                <input id="photosInput" type="file" @change="fileChanged" >
                </div>
                <textarea id="datail" placeholder="요약글 작성"></textarea>
            </div>
            <button id="addListPackgeBtn" @click="addList">저장</button>
       </div>

       <div v-else>
           <h2>Day별 관광지 사진 및 일정 디체일 추가하기</h2>
            
            <label>날짜수 선택하기</label>
            <select @change="onChange($event)">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                </select>       
            <div v-for="(day, idx) in days" :key="day">
                <div class="detailInfoFormContainer">
                    <h2>Day{{idx+1}}</h2>
                    <div>
                    <div class= "summaryFormPhotoInfo">
                        <img :src="urls[idx+1]" alt="">
                        <input id="photosInput" type="file" @change="detailFileChanged($event, idx)">
                    </div>
                    </div>
                    <textarea class="detailTextbox" :id="'detailInfo' + idx" ></textarea>
                </div>

                <div class="coordinationFormContainer">
                    <div>
                        <h4 class="coordinationHeader">구글맵에 위치를 표기하기위해 필요한 정보입니다</h4>
                    </div>
                    <div class= "coordinationInputForm">
                        <label>위도</label>
                        <input :id="'coordinateLat' + idx" type="text">
                        <label>경도</label>
                        <input :id="'coordinateLng' + idx" type="text">
                        <button class="addPackageListBtn" @click="addDayInfo(idx)">추가</button>
                    </div>
                </div>
                <hr>
            </div>
       </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import MainMenu from '../components/MainMenu'
import Footer from '../components/Footer'
export default {
    data() {
        return {
            days:[],
            id: '',
            file: null,
            fileForDetail:[],
            isListAdded: false,
            urls: []
        }
    },

    components: {
        MainMenu,
        Footer
    },

    methods: {
        onChange(event){
            this.days= []
            for(let i=0; i<event.target.value; i++){
                this.days.push(i)
            }
        },

        fileChanged(event) {
            this.file = event.target.files[0]
            this.urls[0] = URL.createObjectURL(this.file)
        },

        detailFileChanged(event, position) {
            this.fileForDetail[position] = event.target.files[0]
            this.urls[position+1] = URL.createObjectURL(this.fileForDetail[position])
        },

        async addDayInfo(position) {
            const formData = new FormData();
            formData.append('photo', this.fileForDetail[position], this.fileForDetail[position].name);
            formData.append('description', document.getElementById('detailInfo' + position).value);
            alert("해당 날짜 여행 정보가 추가되었습니다")
            try{
                await axios.put('/api/jungfrauPackage/' + this.id, formData)
                await axios.put('/api/jungfrauPackage/coordinate/' + this.id, {
                        coordinate: {lat: document.getElementById('coordinateLat' + position).value,
                                     lng: document.getElementById('coordinateLng' + position).value}
                })
            }catch(error){
                console.log("dw111d")
                console.log(error)
            }
        },

        async addList() {

            const formData = new FormData();
            formData.append('photo', this.file, this.file.name);
            formData.append('descriptionForList', document.getElementById('datail').value);
            try{
            let resposne = await axios.post('/api/jungfrauPackage', formData)
            this.id = resposne.data._id
            this.isListAdded = true
            alert("새로운 패키지 리스트가 추가되었습니다")
            }catch(error){
                console.log(error)
            }
        },
    }
}
</script>

<style>
    #datail{
        width:80%
    }

    #addListPackgeBtn{
        background-color:salmon;
        font-size:20px;
        border: none;
        border-radius: 10px;
        transition: all 0.2s; 
    }

    #addListPackgeBtn:hover{
        background-color:orange
    }

    .summaryForm{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .summaryFormPhotoInfo{
        display: flex;
        flex-direction: column;
    }

    .summaryForm textarea{
        width:500px;
        height: 200px;
        white-space: pre-line;
    }
    .detailInfoFormContainer{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .detailInfoFormContainer h2{
        margin-right: 10px;
    }

    .detailTextbox{
        white-space: pre-line;
        width:80%;
        height:200px;
    }

    .coordinationHeader{
        margin:0;
        margin-top: 20px;
    }

    .coordinationInputForm button{
        margin:0;
        transition: all 0.2s; 
    }

    .coordinationInputForm button:hover{
        background-color:orange
    }
</style>