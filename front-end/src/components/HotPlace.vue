<template>
  <div class="hotPlaceVue"> 
    <h2>다른 최신<span class="redHighlight">'핫'</span> 한 여행지</h2>
    <div class="hotTourInfoContainer">
        <div class="TourInfo1">
            <h3>#후쿠오카</h3>
            <img src="../assets/images/finalq1.jpg" alt="">      
        </div>
        <div class="TourInfo2">
            <h3>#하와이</h3>
            <img src="../assets/images/finalq2.jpg" alt="">      
        </div>
        <div class="TourInfo3">
            <h3>#이란</h3>
            <img src="../assets/images/finalq3.jpg" alt="">      
        </div>
        <div class="TourInfo4">
            <h3>#두바이</h3>
            <img src="../assets/images/finalq4.jpg" alt="">      
        </div>
        <div class="TourInfo4">
            <h3>#제주도</h3>
            <img src="../assets/images/finalq5.jpg" alt="">      
        </div>    
    </div>
    <p id="moreInfo">더보기<i class="fas fa-arrow-right"></i></p>
  </div>      
</template>

<script>
export default {

}
</script>

<style>

    h2 {
        text-align: center;
    }
    
    .redHighlight{
        color:crimson;
    }
    
    .hotPlaceVue {
        border: 1px solid black;
        margin-top:15px;
    }

    .hotTourInfoContainer {
        display:flex;
        justify-content: space-around;

    }

    .hotTourInfoContainer h3{
        color: orange;
        padding:0;
        margin:0;
        text-align: center;
    }
    .hotTourInfoContainer img {
        margin-top: 10px;
    }
    
    #moreInfo {
        text-align: end;
        padding-right: 20px;
    }
</style>