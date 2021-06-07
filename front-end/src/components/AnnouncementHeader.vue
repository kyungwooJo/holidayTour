<template>
<hr class="hrAbove"> 
<div class="announcementHeaderContainer">
  <div class="announcementTextPart">
  <h3 id="announcementLine1">공지사항</h3>
  <p id="announcementLine2">New & Notice</p>
  <p id="announcementLine3">홀리데이 여행사에서 알려드립니다</p>
  <p id="announcementLine4">홀리데이 여행사에서 진행하는 각종 이벤트 및 주요 여행 패키지 정보들을 공지하는 공간입니다</p>
  </div>
  <i class="fas fa-bullhorn"></i>
</div>
<hr class="hrBelow">
</template>

<script>
export default {

}
</script>

<style>
    .announcementHeaderContainer{
        display: flex;
        margin-top:30px;
        font-weight: bold;
        background-color:#e0ebeb
    }

    .announcementHeaderContainer svg{
        font-size:100px;
        color: #751aff
    }

    .announcementTextPart{
        margin-right: 150px;
    }

    .hrAbove{
        margin-top:30px;
    }

    .hrBelow{
        margin-top:30px;
    }

    #announcementLine1{
        font-size:32px;
        margin:0;

    }

    #announcementLine2{
        font-size:24px;
        color:#66c2ff;
        margin:0;
        margin-top:8px;
    }
    #announcementLine3{
        font-size:18px;
        color:#00cc99;
        margin:0;
        margin-top:8px;
    }

     #announcementLine4{
        font-size:14px;
        color:#a3c2c2;
        margin:0;
        margin-top:8px;
    }
</style>