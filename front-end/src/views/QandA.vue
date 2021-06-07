<template>
<div>
    <MainMenu />
    <div class="searchFormContainer">
        <div id="searchFormId"><label for="destinations">검색</label></div>
        <div class="searchFormBox">
            <select class="searchBarText" id="filterSelect" name="destinations" required>
                <option value="" disabled selected>분류</option>
                <option id="filterByNumber" value="번호">번호</option>
                <option id="filterByName" value="작성자">작성자</option>
                <option id="filterByTitle" value="제목">제목</option>
            </select>
            <input class="searchBarTextInput" id="filterInputBox" type="text" placeholder="입력">
            <button class="searchBarText" id="form3" @click="slice">확인</button>
        </div>
    </div>    

    <div class="QandA-background"> 
        <h2 class="board-title">Q&A center</h2>
        <div class= "questionMenuForm">
            <span id="menu-num-part">번호</span>
            <span id="menu-name-part">글쓴이</span>
            <span id="menu-title-part">제목</span>
            <span id="menu-date-part">등록일</span>
            <span id="menu-visitedNum-part">조회</span>
            <span id="menu-answer-part">답변</span>
        </div>
        <div class="questionListContainer">
            <div v-for="q in computedQuesitons.slice(arrayStart,arrayEnd)" :key="q.id" class="singleQuestionForm">
                <router-link :to="{ name: 'QuestionDetail', params: { id: q._id }}">
                    <span class="dot-part" id="menu-num-part">{{q.orderNumber+1}}</span>
                    <span class="dot-part" id="menu-name-part">{{q.name}} </span>
                    <span class="dot-part" id="menu-title-part">{{q.title}}</span>
                    <span class="dot-part" id="menu-date-part">{{formatDate(q.created)}}</span>
                    <span class="dot-part" id="menu-visitedNum-part">{{q.numOfVisited}}</span>
                    <span v-if="q.isAnswerExisit" class="answer-state-yes" id="menu-answer-part">완료</span>
                    <span v-else class="answer-state-no" id="menu-answer-part">대기중</span>
                </router-link>
                <button v-if="user !== null && user.role == 'admin'" @click="deleteQuestion(q.id)"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
        <div class="questionArrowBtn">
            <button class="questionArrowLeft" @click="moveArrayBackWordBtn"><i id="arrow-left" class="fas fa-arrow-left"></i></button>
            <button class="questionArrowRight" @click="moveArrayForwardBtn"><i id="arrow-right" class="fas fa-arrow-right"></i></button>
        </div>
        <router-link to='/QuestionForm' class="quetion-write-btn"><button class="Questionbtn">작성</button></router-link>
    </div>
    <Footer />
</div>
</template>

<script>
import axios from 'axios';
import MainMenu from '../components/MainMenu'
import Footer from '../components/Footer'
import moment from 'moment';

export default {
    data() {
        return{   
            questions:[],
            originalQuesions:[],
            question: '',
            name: '',
            title: '',
            answer: '',
            arrayStart: 0,
            arrayEnd: 15
        }
    },

    created() {
        this.getQuestions();
    },

    computed: {
        computedQuesitons() {
            return this.questions;
        },

        user() {
            return this.$root.$data.currentUser.user;
        }
    },

    components: {
        MainMenu,
        Footer
    },

    methods: {
        async getQuestions() {
            try {
                let response = await axios.get("/api/questions");
                this.questions = response.data;
                this.originalQuesions = response.data;
                this.insertOrderValue();
                this.sortArray();
                return true;
            }catch (error) {
                console.log(error);
            }
        },

        async deleteQuestion(id) {
            try {

                let r = confirm("정말 지우시겠습까?")
                if(r){
                    await axios.delete("/api/questions/" + id);
                    this.getQuestions()
                    return true;
                }

            } catch (error) {
                console.log(error);
            }
        },

        formatDate(date) {
            return moment(date).format('ddd MMMM YYYY');
        },

        insertOrderValue() {
            for(let i=0; i<this.questions.length; i++){
                this.questions[i].orderNumber = i
            }
        },

        sortArray() {
            this.questions.sort((a, b) => {
                return  b.orderNumber - a.orderNumber ;
            });
        },

        moveArrayForwardBtn() {
            if(this.arrayStart +15 < this.questions.length){
            this.arrayStart = this.arrayStart +15;
            this.arrayEnd = this.arrayEnd + 15;
            }
            else{

                alert("마지막 폐이지 입니다")
            }
        },

        moveArrayBackWordBtn() {
            if(this.arrayStart-15 >= 0){
            this.arrayStart = this.arrayStart -15;
            this.arrayEnd = this.arrayEnd -15;
            }
            else{
                alert("첫번째 폐이지 입니다")
            }
        },

        slice() {

            this.questions = this.originalQuesions;
            let filterSelect= document.getElementById('filterSelect');
            let selectedOption = filterSelect.value;

            let filterInputValue = document.getElementById('filterInputBox').value
            
            if(selectedOption == "작성자"){
                this.questions = this.questions.filter( question => question.name == filterInputValue)
            }

            if(selectedOption == "번호"){
                this.questions = this.questions.filter( question => question.orderNumber == filterInputValue-1)
            }

            if(selectedOption == "제목") {
                this.questions = this.questions.filter (question => question.title.search(filterInputValue) >= 0)
                
            }
        }
    }
}

</script>

<style>
    .singleQuestionForm {
        width:95%;
        background: white;
        margin: 10px auto;

    }

    .singleQuestionForm a{
        display:flex;
        color:black;
        text-decoration: none;
        text-align: center;
    }

    .dot-part {
        border-right: dotted 1px black;
    }

    .board-title {
        padding-top: 20px;
    }
    
    .QandA-background {
        background-color:#f1f3f5;
    }

    .questionMenuForm {
        width: 95%;
        display:flex;
        margin: 0 auto;
        background-color:rgb(255, 247, 237);
        color:rgb(197, 129, 90);
        text-align: center;
    }

    .questionArrowBtn {
        text-align: center;
    }

    .questionArrowRight,
    .questionArrowLeft{
        margin:10px 5px;
    }

    .Questionbtn{
        background-color: #008CBA;
        color:white;
        border:none;
        padding: 10px 20px;
        border-radius: 10px;
    }

    .answer-state-yes {
        background-color:orange;
        color:white;
        border-radius: 10px;       
    }

    .answer-state-no {
        background-color:crimson;
        color:white;
        border-radius: 10px;
    }

    .quetion-write-btn {
       display: flex;
       align-items: flex-end;
       justify-content: flex-end;
       padding-right:10px;
       padding-bottom: 10px;
       padding-top:10px;
       text-decoration: none;
    }

    #menu-num-part{
        flex:1
    }

    #menu-name-part{
        flex:3
    }

    #menu-title-part{
        flex:5
    }

    #menu-date-part{
        flex:1.5
    }

    #menu-visitedNum-part{
        flex:1
    }

    #menu-answer-part{
        flex:1;

    }


</style>