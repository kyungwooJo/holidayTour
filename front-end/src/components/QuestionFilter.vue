<template>
  <div class="searchFormContainer">
    <div id="searchFormId"><label for="destinations">Search</label></div>
    <div class="searchFormBox">
        <select id="destinations form1" name="destinations" required>
            <option value="" disabled selected>분류</option>
            <option value="번호">번호</option>
            <option value="작성자">작성자</option>
            <option value="제목">제목</option>
            <option value="카테고리">카테고리</option>
        </select>
        <input id="form2" type="text" placeholder="입력해 주십시요">
        <button id="form3" @click="slice">확인</button>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        questions: Array
    },

    methods: {
        slice() {
            this.questions = this.questions.filter( question => question.name == "22")
        }
    }
}
</script>

<style>

</style>