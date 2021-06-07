<template>
  <div class="searchFormContainer">
    <div id="searchFormId"><lebel for="destinations">대한 홀리데이 여행사</lebel></div>
    <h3>스위스 융프라우</h3>
  </div>
</template>

<script>
export default {

}
</script>

<style>
/*SearchForm */

    .searchFormContainer {
        margin-top:20px;
        width:100%;
        height:150px;
        background-color:#1763e2;
        color: white;
        border-radius: 50px;
    }
    
    .searchFormContainer .searchFormBox {
        margin-top:10px;
        display:flex;
        width:95%;
        margin:0 auto;
       
    }

    .searchFormContainer .searchFormBox #form1 {
        flex:1;
    }

     .searchFormContainer .searchFormBox #form2 {
        flex:2;
        font-size:20px;
    }

     .searchFormContainer .searchFormBox #form3 {
        flex:1.3;
        background-color:orange;
        color: white;
        border:none;
    }

    .searchFormContainer #searchFormId {
        padding-top:40px;
        padding-bottom: 10px;
        font-size:24px;
        width:95%;
        margin: 0 auto
        
    }

    select:invalid { color: gray; }
</style>