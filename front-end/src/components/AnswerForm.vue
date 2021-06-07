<template>
  <div class= "answerFormContainer">
    <textarea name="" id="answerPart" cols="80" rows="25" placeholder="답변 작성"></textarea>
    <button id="answerFormBtn" @click="submitAnswer(question.id)">확인</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            answer: ''
        }
    },

    props: {
        question: Object
    },
    
    methods: {
        async submitAnswer(id) {
            try{
                await axios.put('/api/questions/answer/' + id, {
                    answer: document.getElementById('answerPart').value,
                    isAnswerExisit: true
                })

                alert('답변이 완료되었습니다')
                location.reload();
                return true

            }catch(error){
                console.log(error)
            }

        }
    }
}
</script>

<style>
    .answerFormContainer{
        width:100%;
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-top:50px;
        background-color:#f1f3f5;
    }

    #answerFormBtn{
        background-color: #008CBA;
        color:white;
        border:none;
        padding: 10px 20px;
        border-radius: 10px;        
        margin:10px 0;
        
    }

    #answerPart{
        margin-top:30px
    }

    dir{
        padding:0;
    }
</style>