<template>
    <MainMenu />
    <div v-if="!isEditComplete" id="tourReviewDetailRoot">
        <div v-if="isExist">
            <div v-if="this.$root.$data.currentUser.user != null && this.$root.$data.currentUser.user.role=='admin'"  class="deleteAndEditBtns">
                <div>
                    <label for="">삭제</label>
                    <button  @click="deleteAnnouncement(announcement._id)"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div>
                    <label for="">편집</label>
                    <button @click="toggleEditForm()"><i class="fas fa-edit"></i></button>
                </div>
            </div>
            <div class="questionDetailContainer">
                <div class="questionTitleContainer">
                    <span class="questionInfoColor">제목: </span>
                    <span>{{announcement.title}}</span>
                </div>
                <div class="questionInfoContainer">
                    <span id="questionInfoName"><span class="questionInfoColor">작성자:</span> {{announcement.name}}</span>
                    <span id="questionInfoCreated"><span class="questionInfoColor">작성일:</span> {{formatDate(announcement.created)}}</span>
                    <span id="questionInfoNumOfVisited"><span class="questionInfoColor">조회수:</span> {{announcement.numOfVisited}}</span>     
                </div>
                <div class="questionContentContainer">  
                    <div v-for="path in announcement.pathArray" :key="path">
                        <img :src="path" alt=""> 
                        <div v-if="isEdit">
                            <button @click="deletePath(path)"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                    <div v-if="isEdit"><p>(사진 새로 추가하기) <input v-if="isEdit" id="photosInput" type="file" @input="inputChanged" multiple></p></div>
                    <hr>
                    <div v-for="url in urls" :key="url">
                        <img :src="url" />
                    </div>
                    <p id="questionAnswerPart">{{announcement.content}}</p>
                </div>
                <div v-if="isEdit">
                    <div class="questionFormContainer">
                            <div>
                                <label for="" class="questionFormLabel">이름</label>
                                <input id="editedName" class="quesiontFormInput" type="text" :value="announcement.name" >
                            </div>
                            <div>
                                <label for="" class="questionFormLabel">제목</label>
                                <input id="editedTitle" class="quesiontFormInput" type="text" :value="announcement.title">
                            </div>
                            <label for="" class="questionFormLabel">내용</label>
                            <div>
                            <textarea id="editedReview" name="" cols="80" rows="25" :value="announcement.content"></textarea>
                            </div>
                            <button class="reviewEditBtn" @click="editAnnouncement(announcement._id)">수정</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>해당 계시물은 더이상 존재하지 않습니다</h2>
        </div>
    </div>
    <div v-else>
        <EditComplete :completeView="announcementEditComplete"/>
    </div>
   <Footer />
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import MainMenu from '../components/MainMenu'
import Footer from '../components/Footer'
import EditComplete from '../components/EditComplete'
export default {
    data() {
        return {
            announcement: {},
            files: null,
            urls: [],
            isEdit: false,
            showEditPasswordForm: false,
            showDeletePasswordForm: false,
            inputPassword: '',
            isExist: true,
            isEditComplete: false,
            announcementEditComplete: 'announcement'
        }
    },

    components: {
        MainMenu,
        Footer,
        EditComplete
    },

    created() {
        this.getAnnouncement()
    },

    methods: {
        async getAnnouncement() {
            try{
                let response = await axios.get('/api/announcements/' + this.$route.params.id)
                this.announcement = response.data
            }catch(error){
                console.log(error)
            }
        },

                formatDate(date) {
            return moment(date).format('ddd MMMM YYYY');
        },

        //detele the path that user tries to delete
        deletePath(path) {  
            this.announcement.pathArray = this.announcement.pathArray.filter ( (p) => p !== path)
        },

        //delete the url of pictures that user tries to add newly
        deleteUrl(url) {
            this.urls = this.urls.filter( (p) => p !== url)
            this.announcement.pathArray = this.announcement.pathArray.filter ( (p) => p !== url)
        },

        inputChanged(event) {

            this.urls = [];   
            this.files = event.target.files;

            for(let i=0; i<this.files.length; i++){
                this.urls.push(URL.createObjectURL(this.files[0]));
            }

        },

        toggleEditForm() {
            this.isEdit = true;
            this.showEditPasswordForm = false;
        },

        async deleteAnnouncement(id) {
            try{
                 let c = confirm("정말 지우시겠습니까?")
                 if(c) {
                        await axios.delete('/api/announcements/' + id)
                        this.isExist = false;
                    }
            }catch(error){
                console.log(error)
            }
        },

        async editAnnouncement(id) {
            try {

                const formData = new FormData();
        
                var ins = document.getElementById('photosInput').files.length;
                for (var x = 0; x < ins; x++) {
                    formData.append('photo', document.getElementById('photosInput').files[x], document.getElementById('photosInput').files[x].name)
                }

                let r1 = await axios.post('/api/announcements/photos', formData);
                  
                for(let i=0; i<this.announcement.pathArray.length; i++){
                    r1.data.unshift(this.announcement.pathArray[i]);
                }
              
                let r2 = await axios.put("/api/announcements/" + id, {
                    name: document.getElementById('editedName').value,
                    title: document.getElementById('editedTitle').value,
                    content: document.getElementById('editedReview').value,
                    pathArray: r1.data,
                })
                this.isEditComplete = true
                return true;
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>

<style>

</style>