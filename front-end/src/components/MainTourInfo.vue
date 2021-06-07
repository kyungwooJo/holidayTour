<template>
  <div class="tourInfoContainer">
      <div class="tourResources">
          <img class="swissInfoDecoration" src="../assets/images/decoration.png">
          <div class="tourResouecesHeader swissInfoContainer">
            <img src="../assets/images/swissflag.jpg" alt="">
            <h3>스위스 여행정보</h3>
          </div>
          <div class="swissInfoContainer">
            <a><button>비자</button> </a>
          </div>
          <div class="swissInfoContainer">
            <a><button>음식</button> </a>

          </div>
          <div class="swissInfoContainer">
            <a><button>문화</button> </a>
          </div>
          <div class="swissInfoContainer">
            <a><button>종교</button> </a>
          </div>
          <div class="swissInfoContainer">
            <a><button>관광</button> </a>
          </div>
      </div>
      <div class="sildeshow middle">
        <div class="slides">
            <input type="radio" name="r" id="r1" checked>
            <input type="radio" name="r" id="r2">
            <input type="radio" name="r" id="r3">
            <input type="radio" name="r" id="r4">
            <input type="radio" name="r" id="r5">
            <div class="slide s1">
                <img v-if="jungfrauInfoList[0] != undefined" :src="jungfrauInfoList[0].path" alt="">
            </div>
            <div class="slide">
                <img v-if="jungfrauInfoList[1] != undefined" :src="jungfrauInfoList[1].path" alt="">
            </div>
            <div class="slide">
                <img v-if="jungfrauInfoList[2] != undefined" :src="jungfrauInfoList[2].path" alt="">
            </div>
            <div class="slide">
                <img v-if="jungfrauInfoList[3] != undefined" :src="jungfrauInfoList[3].path" alt="">
            </div>
            <div class="slide">
                <img v-if="jungfrauInfoList[4] != undefined" :src="jungfrauInfoList[4].path" alt="">
            </div>                                               
        </div>

        <div class="navigation">
            <label @click="showTourInfo(0)" for="r1" class="bar bar1"></label>
            <label @click="showTourInfo(1)" for="r2" class="bar"></label>
            <label @click="showTourInfo(2)" for="r3" class="bar"></label>
            <label @click="showTourInfo(3)" for="r4" class="bar"></label>
            <label @click="showTourInfo(4)" for="r5" class="bar"></label>
        </div>
        <router-link to="/AdminJungfrauInfoEdit" ><button v-if="user !== null && user.role=='admin'" class="jungfrauEditBtn"><i class="fas fa-edit"></i></button></router-link>
        <div class="arrows">
            <label @click="rightArrowClick(selectedInfoId)" :for="selectedLabel"><i id="arrow-right" class="fas fa-arrow-right"></i></label>
            <label @click="leftArrowClick(selectedInfoId)" :for="selectedLabel"><i id="arrow-left" class="fas fa-arrow-left"></i></label>
        </div>    
    </div>  
    <div class="tourInfo">
        <h1>{{tourInfo[selectedInfoId].title}}</h1>
        <p>{{tourInfo[selectedInfoId].tourInfo}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            selectedInfoId: 0,
            selectedLabel: '',
            jungfrauInfoList: [],
            tourInfo: [
                {
                    id:1,
                    title: "Niagara Fall",
                    tourInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum tincidunt sem, ac feugiat leo pretium a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                },
                {
                    id:2,
                    title: "Grand Canyon",
                    tourInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum tincidunt sem, ac feugiat leo pretium a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                },
                {
                    id:3,
                    title: "Yosemite Local",
                    tourInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum tincidunt sem, ac feugiat leo pretium a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                },
                {
                    id:4,
                    title: "Yellowstone Vacation",
                    tourInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum tincidunt sem, ac feugiat leo pretium a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                },
                {
                    id:5,
                    title: "Canadian Rockies",
                    tourInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum tincidunt sem, ac feugiat leo pretium a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                },
                {
                    id:6,
                    title: "Hawaii Volcanoes",
                    tourInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum tincidunt sem, ac feugiat leo pretium a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                },                
            ]
        }
    },

    computed: {
        user() {
            return this.$root.$data.currentUser.user;
        },

        jungList() {
            return this.jungfrauInfoList
        }
    },

    methods: {
        showTourInfo(id) {
            this.selectedInfoId = id
            this.selectedLabel = 'r' + id
            console.log(this.selectedInfoId)
            console.log(this.selectLabel)
        },

        rightArrowClick(id) {
            if((id + 1) < 5 ) {
                this.selectedInfoId = id + 1
                this.selectedLabel = 'r' + (id +2)
                console.log(this.selectedLabel)
            }
        },

        leftArrowClick(id) {
            if((id -1) !== -1 ) {
                this.selectedInfoId = id -1
                this.selectedLabel = 'r' + (id)
                console.log(this.selectedLabel)
            }
        },

        async getJungInfoList() {
            try{
                let response = await axios.get('/api/jungfrauInfo/all')
            
                this.jungfrauInfoList = response.data
                
                for(let i=0; i<this.jungfrauInfoList.length; i++){
                    this.tourInfo[i].title = this.jungfrauInfoList[i].title
                    this.tourInfo[i].tourInfo = this.jungfrauInfoList[i].description
                }
            }catch(error){
                console.log(error)
            }
        }
    },

    created() {
        this.getJungInfoList()
        console.log('dsds')
    }
}
</script>

<style>

    .tourInfoContainer {
        display:flex;
        background-color:#F0F3F4;
    }

    .tourInfoContainer .sildeshow{
        flex:2
    }

    .tourInfoContainer .tourInfo{
        flex: 1.2
    }

    .tourInfoContainer .tourResources{
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom:50px;
    }

    .tourInfoContainer a{
        font-size: 20px;
    }

    .tourInfoContainer .tourResouecesHeader{
        display: flex;
    }

    .tourInfoContainer .tourResouecesHeader img{
        width:40px;
        
    }

    .tourInfoContainer .tourResouecesHeader img,
    .tourInfoContainer .tourResouecesHeader h3{
        margin: 0;
    }

    .tourInfoContainer .tourResouecesHeader h3 {
        font-size: 24px
    }

    .tourInfoContainer .swissInfoContainer{
        margin-bottom:10px;
        
    }

    .tourInfoContainer .swissInfoDecoration{
        margin-bottom:30px
    }

    .tourResources button{
        background-color: #008CBA;
        color:white;
        border:none;
        padding: 5px 20px;
        border-radius: 10px;  
        font-size:16px; 
        transition: all 0.2s;     
    }

    .tourResources button:hover{
        background-color:orange
    }

 /* National-Park-info part start*/  

 .tourInfo{
     width:300px;
     height: 354px;
     margin-top:34px;
     margin-left:20px;
     border: 1px solid gray;
 }

 .nationalParkInfoBox {
     width: 450px;
     height:370px;
     margin-top:35px
 }
 .nationalParkSingleInfo {
     border: 1px solid gray;
     padding:10px 5px;
     
 }
 .nationalParkSingleInfo svg{
     font-size:28px;
     color: #1763e2;
 }

  .nationalParkSingleInfo a{
     text-decoration: none;
     color:#2D90FF;
     margin-left:10px;
     font-size:20px;
 }


 /* National-Park info end*/  




 /* Image-Slide part start*/   
    .sildeshow {
        margin-left:20px;
        margin-bottom:30px;
        width: 650px;
        height: 390px;
        position: relative;
        overflow: hidden;
    }

    .sildeshow img {
        width: 650px;
    }

    .navigation {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display:flex;

    }



    .arrows svg{
        font-size:32px;
    }

    .jungfrauEditBtn {
        position:absolute;
        bottom:20px;
        right: 30px;
        font-size:20px;
    }

    .arrows #arrow-right {
        position: absolute;
        bottom:200px;
        right: 30px;
    }

    .arrows #arrow-left {
        position: absolute;
        bottom:200px;
        left: 30px;
    }

    .bar{
        width: 50px;
        height:10px;
        border: 2px solid #111;
        margin: 6px;
        cursor: pointer;
    }

    .bar:hover{
        background: #fff;
    }

    .slides {
        width:500%;
        height: 100%;
        display:flex;
    }
    
    .slide{
        width: 20%;
        transition: 0.6s;
    }

    .slide img {
        width: 100%;
        height: 100%;
    }

    .bar{
        border-radius: 10px;
    }
    

    input[name='r'] {
        position: absolute;
        visibility: hidden;
    }

    #r1:checked ~ .s1 {
        margin-left: 0;
    }

    #r2:checked ~ .s1 {
        margin-left: -20%;
    }

    #r3:checked ~ .s1 {
        margin-left: -40%;
    }

    #r4:checked ~ .s1 {
        margin-left: -60%;
    }

    #r5:checked ~ .s1 {
        margin-left: -80%;
    }
 /* Image-Slide part end*/     
</style>