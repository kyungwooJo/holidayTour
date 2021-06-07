<template>
<div>
    <MainMenu />
    <div v-if="!isEditComplete" id="tourReviewDetailRoot">
        <div v-if="isExist">
            <div class="deleteAndEditBtns">
                <div>
                    <label for="">삭제</label>
                    <button @click="toggleDeletePasswordForm"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div>
                    <label for="">편집</label>
                    <button @click="toggleEditPasswordForm"><i class="fas fa-edit"></i></button>
                </div>
            </div>
            <div v-if="showDeletePasswordForm">
                <label for="">비밀번호</label>
                <input v-model="inputPassword" type="text" name="" id="" placeholder="삭제를 원할시">
                <button @click="deleteTourReview(inputPassword)">확인</button>
                <button @click="toggleDeletePasswordForm">X</button>
            </div>
            <div v-if="showEditPasswordForm">
                <label for="">비밀번호</label>
                <input v-model="inputPassword" type="text" name="" id="" placeholder="수정을 원할시">
                <button @click="toggleEditForm(inputPassword)">확인</button>
                <button @click="toggleEditPasswordForm">X</button>
            </div>
            <div class="questionDetailContainer">
                <div class="questionTitleContainer">
                    <span class="questionInfoColor">제목: </span>
                    <span>{{review.title}}</span>
                </div>
                <div class="questionInfoContainer">
                    <span id="questionInfoName"><span class="questionInfoColor">작성자:</span> {{review.name}}</span>
                    <span id="questionInfoCreated"><span class="questionInfoColor">작성일:</span> {{formatDate(review.created)}}</span>
                    <span id="questionInfoNumOfVisited"><span class="questionInfoColor">조회수:</span> {{review.numOfVisited}}</span>     
                </div>
                <div class="questionContentContainer">  
                    <div v-for="path in review.pathArray" :key="path">
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
                    <p id="questionAnswerPart">{{review.review}}</p>
                </div>
                <div v-if="isEdit">
                    <div class="questionFormContainer">
                            <div>
                                <label for="" class="questionFormLabel">이름</label>
                                <input id="editedName" class="quesiontFormInput" type="text" :value="review.name" >
                            </div>
                            <div>
                                <label for="" class="questionFormLabel">제목</label>
                                <input id="editedTitle" class="quesiontFormInput" type="text" :value="review.title">
                            </div>
                            <label for="" class="questionFormLabel">내용</label>
                            <div>
                            <textarea id="editedReview" name="" cols="80" rows="25" :value="review.review"></textarea>
                            </div>
                            <button class="reviewEditBtn" @click="editTourReview(review.id)">수정</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>해당 계시물은 더이상 존재하지 않습니다</h2>
        </div>
    </div>
    <div v-else>
        <EditComplete :completeView="tourReviewComplete"/>
    </div>
   <Footer />
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import MainMenu from '../components/MainMenu'
import EditComplete from '../components/EditComplete'
import Footer from '../components/Footer'

export default {
    data() {
        return {
            review: {},
            files: null,
            urls: [],
            isEdit: false,
            showEditPasswordForm: false,
            showDeletePasswordForm: false,
            inputPassword: '',
            isExist: true,
            isEditComplete: false,

            tourReviewComplete:"tourReview"
        }
    },

    mounted() {
        this.getQuestion()

    },

    components: {
        MainMenu,
        EditComplete,
        Footer
    },

    methods: {
        async getQuestion() {
        try {
            let response = await axios.get("/api/tourReviews/" + this.$route.params.id);
            this.review = response.data;


            if(this.question.name == undefined) {
                this.isExist = false;
            }
        } catch (error) {
            console.log(error)
        }
      },
      
        formatDate(date) {
            return moment(date).format('ddd MMMM YYYY');
        },

        //detele the path that user tries to delete
        deletePath(path) {  
            this.review.pathArray = this.review.pathArray.filter ( (p) => p !== path)
        },

        //delete the url of pictures that user tries to add newly
        deleteUrl(url) {
            this.urls = this.urls.filter( (p) => p !== url)
            this.review.pathArray = this.review.pathArray.filter ( (p) => p !== url)
        },

        inputChanged(event) {

            this.urls = [];   
            this.files = event.target.files;

            for(let i=0; i<this.files.length; i++){
                this.urls.push(URL.createObjectURL(this.files[i]));
            }

        },

        async editTourReview(id) {
            try {

                const formData = new FormData();
        
                var ins = document.getElementById('photosInput').files.length;
                for (var x = 0; x < ins; x++) {
                    formData.append('photo', document.getElementById('photosInput').files[x], document.getElementById('photosInput').files[x].name)
                }

                let r1 = await axios.post('/api/photos', formData);
                  
                for(let i=0; i<this.review.pathArray.length; i++){
                    r1.data.unshift(this.review.pathArray[i]);
                }
              
                let r2 = await axios.put("/api/tourReviews/" + id, {
                    name: document.getElementById('editedName').value,
                    title: document.getElementById('editedTitle').value,
                    review: document.getElementById('editedReview').value,
                    pathArray: r1.data,
                })
                this.isEditComplete = true
                return true;
            } catch (error) {
                console.log(error)
            }
        },

        toggleEditPasswordForm() {
           this.showEditPasswordForm = !this.showEditPasswordForm;
        },

        toggleEditForm(pw) {
           if(this.review.password == pw) {
               this.isEdit = true;
               this.showEditPasswordForm = false;
           }
           else{
               alert("잘못된 패스워드입니다")
           }
        },

        toggleDeletePasswordForm() {
            this.showDeletePasswordForm = ! this.showDeletePasswordForm;
        },

        async deleteTourReview(pw) {
            try{
                if(this.review.password == pw) {
                    let c = confirm("정말 지우시겠습니까?")
                    if(c) {
                        await axios.delete('/api/tourReviews/' + this.review.id)
                        this.isExist = false;
                    }
                }
                else{
                    alert("비밀번호 오류")
                }
            }catch(error){
                console.log(error)
            }
        },
    }
}
</script>

<style>
    .reviewEditBtn{
        background-color: #008CBA;
        color:white;
        border:none;
        padding: 10px 20px;
        border-radius: 10px;
    }

</style>