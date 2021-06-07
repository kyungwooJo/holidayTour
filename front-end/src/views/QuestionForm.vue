<template>
<div>
    <MainMenu />
    <div class="questionFormContainer">
        <div>
            <label for="" class="questionFormLabel">이름</label>
            <input class="quesiontFormInput" v-model="name" type="text" >
        </div>
        <div>
            <label for="" class="questionFormLabel">제목</label>
            <input class="quesiontFormInput" v-model="title" type="text">
        </div>
        <div>
            <label for="" class="questionFormLabel">비밀번호</label>
            <input placeholder="수정 및 삭제시 필요" class="quesiontFormInput" id="questinFormPasswordInput" v-model="password" type="text">
        </div>
        <label for="" class="questionFormLabel">내용</label>
        <div>
        <textarea name="" id="questionContent" cols="80" rows="25" v-model="question"></textarea>
        </div>
        <router-link to='/QandA'><button id="questionSubmitBtn" @click="addQuestion">올리기</button></router-link>
    </div>
    <Footer />
</div>
</template>

<script>
import MainMenu from '../components/MainMenu'
import Footer from '../components/Footer'
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            title: '',
            question: '',
            date: '',
            password: '',
            order: '',
        }
    },

    components: {
        MainMenu,
        Footer
    },

    methods: {
        async addQuestion() {
            try {
                await axios.post("/api/questions", {
                name: this.name,
                question: this.question,
                title: this.title,
                password: this.password
                });
                this.name = "";
                this.question = "";
                this.title="";
                this.password="";
                alert("질문 작성이 완료되었습니다");
                return true;
            }catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>
    #questionContent{
        white-space: pre-wrap;
        
    }

    #questinFormPasswordInput{
        margin-right:30px;
    }

    #questionSubmitBtn{
        position:absolute;
        bottom: 20px;
        right: 40px;
        font-size:18px;
        padding:10px 10px;
        border-radius: 10px;
        border:none;
        background-color: #008CBA;
        color:white

    }

    .quesiontFormInput{
        width:300px
    }

    .questionFormContainer{
        position:relative;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height:570px;
        background-color:#f1f3f5;
        margin-top:30px;
    }

    .questionFormContainer input{
        border-radius: 5px;
        border:1px dotted black;
    }

    .questionFormLabel {
        background-color:rgb(255, 247, 237);
        color:rgb(197, 129, 90);
    }


</style>