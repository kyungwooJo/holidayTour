<template>
<div>
  <MainMenu />
    <div v-if="isExist">
        <div class="deleteAndEditBtns">
            <div>
                <label for="">삭제</label>
                <button @click="togglePasswordForm"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div>
                <label for="">편집</label>
                <button @click="toggleEditPasswordForm"><i class="fas fa-edit"></i></button>
            </div>
        </div>

        <form v-if="showPasswordForm">
            <label for="">비밀번호</label>
            <input v-model="password" type="text" name="" id="" placeholder="삭제를 원할시">
            <button @click="deleteQuestion(password)">확인</button>
            <button @click="togglePasswordForm">X</button>
        </form>
        <form v-if="showEidtPasswordForm">
            <label for="">비밀번호</label>
            <input v-model="password" type="text" name="" id="" placeholder="수정을 원할시">
            <button @click="toggleEditForm(password)">확인</button>
            <button @click="toggleEditPasswordForm">X</button>
        </form>
        <div class="questionDetailContainer">
            <div class="questionTitleContainer">
                <span class="questionInfoColor">제목: </span>
                <span>{{question.title}}</span>
            </div>
            <div class="questionInfoContainer">
                <span id="questionInfoName"><span class="questionInfoColor">작성자:</span> {{question.name}}</span>
                <span id="questionInfoCreated"><span class="questionInfoColor">작성일:</span> {{formatDate(question.created)}}</span>
                <span id="questionInfoNumOfVisited"><span class="questionInfoColor">조회수:</span> {{question.numOfVisited}}</span>     
            </div>
            <div class="questionContentContainer">
                <p id="questionAnswerPart">{{question.question}}</p>
            </div>
        </div>
    </div>
    <div v-if="isExist==false">
        <h2>해당 계시물은 더이상 존재하지 않습니다</h2>
    </div>


    <div v-if="isEdit && isPass && isExist" >
        <EditQuestion :question="question" />
    </div>
    
    <div v-if="question.isAnswerExisit && isExist">
        <h2>Answer</h2>

            <div class="questionContentContainer questionDetailAnswerPart">
                <p id="questionAnswerPart">{{question.answer}}</p>
            </div>
    </div>

    <div v-if="!question.isAnswerExisit && isExist">
        <h2>답변 대기중</h2>
    </div>

    <dir v-if="showAnswerForm && isPass">
        <AnswerForm :question="question" />
    </dir>

    <div v-if="this.$root.$data.currentUser.user != null && this.$root.$data.currentUser.user.role=='admin'">
        <button  id="toggleAnswerBtn" v-if="showAnswerBtn && !question.isAnswerExisit && isExist" @click="toggleAnswerPassordForm">답변(운영자 전용)</button>
    </div>
    <form v-if="showAnswerPasswrodForm">
        <label for="">비밀번호</label>
        <input v-model="adminPassword" type="text" name="" id="">
        <button @click="toggleAnswerForm(adminPassword)">확인</button>
        <button if="questionDetail" @click="toggleAnswerPassordForm">X(답변취소)</button>
    </form>
</div>
</template>

<script>
import MainMenu from '../components/MainMenu'
import EditQuestion from '../components/EditQuestion'
import AnswerForm from '../components/AnswerForm'
import moment from 'moment'
import axios from 'axios'

export default {
    data() {
        return {
            question: [],
            isExist: true,
            isEdit: false,
            isPass: false,
            isComplete: false,
            showPasswordForm: false,
            showEidtPasswordForm: false,
            showAnswerForm: false,
            showAnswerPasswrodForm: false,
            showAnswerBtn: true,
            password: '',
            adminPassword: '',
        }
    },

    components: {
        MainMenu,
        EditQuestion,
        AnswerForm,
    },

    mounted() {
        this.getQuestion();
    },

    methods: {
        async getQuestion() {
        try {
            let response = await axios.get("/api/questions/" + this.$route.params.id);
            this.question = response.data;

            await axios.put("/api/questions/numOfVisited/" + this.$route.params.id, {
                 numOfvisited: this.question.numOfVisited + 1
            });

            if(this.question.name == undefined) {
                this.isExist = false;
            }
        } catch (error) {
            console.log(error)
        }
      },
        
        async deleteQuestion(password) {
            try {

                if(password == this.question.password){
                let r = confirm("정말 지우시겠습까?")

                if(r){
                    await axios.delete("/api/questions/" + this.$route.params.id);
                    this.isExist = false
                    return true;
                }
              }
                else {
                    alert('계시물 비밀번호 오류')
                }
            } catch (error) {
                console.log(error);
            }
        },

        togglePasswordForm() {
            this.showPasswordForm = !this.showPasswordForm
        },

        toggleAnswerPassordForm() {
            this.showAnswerPasswrodForm = !this.showAnswerPasswrodForm
          
        },

        toggleEditPasswordForm() {
            this.showEidtPasswordForm =! this.showEidtPasswordForm
        },

        toggleEditForm(password) {

            if(password == this.question.password){
                this.showEidtPasswordForm = !this.showEidtPasswordForm
                this.isPass = true
                if(this.isEdit == true){
                    this.isEdit = false
                }
                else{
                    this.isEdit = true
                }
            }
            else {
                alert('계시물 비밀번호 오류')
            }
        },

        toggleAnswerForm(password) {
            if(password == this.question.adminPassword){
                this.isPass = true
                this.showAnswerForm = !this.showAnswerForm
                this.showAnswerPasswrodForm = !this.showAnswerPasswrodForm
                this.showAnswerBtn = !this.showAnswerBtn
            }
            else {
                alert('계시물 비밀번호 오류')
            }
        },

        formatDate(date) {
            return moment(date).format('ddd MMMM YYYY');
        }
      
    }

}
</script>

<style>
    #questionAnswerPart{
        white-space: pre-line;
    }

    .questionDetailContainer{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background-color:#f1f3f5;
    }
    
    .questionInfoContainer{
        display:flex;
        background-color:rgb(255, 247, 237);
        margin-bottom: 20px;
        
    }

    .questionTitleContainer{
        background-color:rgb(255, 247, 237);
        border-bottom: 1px orange dotted;
        margin-top: 10px;
    }

    #questionInfoName{
        flex:2
    }

    #questionInfoNumOfVisited{
        flex:1
    }

    #questionInfoCreated{
        flex:3
    }

    .questionContentContainer{
        margin-top:30px;
        width:90%;
        margin:0 auto;
        text-align: center;
        background:white;
        margin-bottom:20px
    }
    
    .questionInfoColor{
        color:rgb(197, 129, 90);
    }
    .deleteAndEditBtns{
        display:flex;
        justify-content: flex-end;
    }

    #toggleAnswerBtn{
        margin-top:20px;
        background-color: #008CBA;
        color:white;
        border:none;
        padding: 10px 20px;
        border-radius: 10px;
    }

    .questionDetailAnswerPart{
        background-color:#f1f3f5;
        padding:10px 0;
        width:100%
    }
</style>