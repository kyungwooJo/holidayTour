<template>
  <div class="questionFormContainer">
        <div>
            <label for="" class="questionFormLabel">이름</label>
            <input id="editedName" class="quesiontFormInput" type="text" :value="question.name" >
        </div>
        <div>
            <label for="" class="questionFormLabel">제목</label>
            <input id="editedTitle" class="quesiontFormInput" type="text" :value="question.title">
        </div>
        <label for="" class="questionFormLabel">내용</label>
        <div>
        <textarea id="editedQuestion" name="" cols="80" rows="25" :value="question.question"></textarea>
        </div>
        <router-link to='/QandA'><button class="editBtn" @click="eidtQuestion(question.id)">수정</button></router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    props:{
        question: {}
    
    },

    methods: {
        async eidtQuestion(id) {
            try {
                await axios.put("/api/questions/" + id, {
                    title: document.getElementById('editedTitle').value,
                    name: document.getElementById('editedName').value,
                    question: document.getElementById('editedQuestion').value
                });

                await axios.put("/api/questions/numOfVisited/" + id, {
                    numOfvisited: this.question.numOfVisited + 1
                });                
                alert("수정이 완료되었습니다");
                return true;
            } catch (error) {
                console.log(error)
            }
        },        
    }
}
</script>

<style>
    .editBtn{
        background-color: #008CBA;
        color:white;
        border:none;
        padding: 10px 20px;
        border-radius: 10px;
    }
</style>