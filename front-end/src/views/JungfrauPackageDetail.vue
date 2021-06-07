<template>
<div>
  <MainMenu />
          <GoogleMap v-if="markerOptionList[0] != null" class="packageGoogleMap"
            api-key="AIzaSyB5P72APYKedoyVcGh4Fg906PxUnU_GTRg"
            style="width: 70%; height: 300px"
            :center="markerOptionList[0].position"
            :zoom="5"
            :position="markerOptionList[0].position"
          > 
          <Marker v-for="option in markerOptionList" :options="option" :key="option"/>
          </GoogleMap>
  <hr id="marginForLightBox">
        <div v-if="this.$root.$data.currentUser.user != null && this.$root.$data.currentUser.user.role=='admin'" class="deleteAndEditBtns">
            <div>
                <label for="">삭제</label>
                <button @click="togglePasswordForm"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div>
                <label for="">편집</label>
                <button @click="toggleEditForm"><i class="fas fa-edit"></i></button>
            </div>
        </div>

  <div v-for="(path, idx) in packageInfo.pathForDetail" :key="path">
    <div class="packageDetailInfoBox">
      <div class="packageDayandImageContainer">
        <p class="packageDay">Day{{idx +1}}</p>
        <div claa="imageWithMap">
          <img :src="path" alt="">
        </div>
      </div>
      <p>{{packageInfo.descriptionForDetail[idx]}}</p>
  </div>
  <hr>
  </div>

  <div v-if="isEdit"> 
    <EditJungfrauPackage :info="packageInfo"/>
  </div>

  <Footer />
</div>
</template>

<script>
import axios from 'axios'
import MainMenu from '../components/MainMenu'
import EditJungfrauPackage from '../components/EditJungfrauPackage'
import Footer from '../components/Footer'
import { GoogleMap, Marker } from 'vue3-google-map'

export default {

  data() {
    return {
      packageInfo: {},
      pathForHeader: String,
      isEdit: false,
      center: { lat: 35.6892, lng: 51.3890 },
      center2: { lat: 37.6892, lng: 53.3890 },
      markerOptions1: { position: { lat: 35.6892, lng: 51.3890 }, label: 'Day1', title: 'LADY LIBERTY' },
      markerOptionList: []
    }
  },

  components: {
    MainMenu,
    EditJungfrauPackage,
    Footer,
    GoogleMap,
    Marker
  },

  created() {
    this.getPackageInfo()
  },

  methods:{
    async getPackageInfo() {

      try{
      let response = await axios.get('/api/jungfrauPackage/' + this.$route.params.id)
      this.packageInfo = response.data
      console.log(this.packageInfo.coordinateList)
      for(let i=0; i<this.packageInfo.coordinateList.length; i++){

        let item = {position: {lat: Number(this.packageInfo.coordinateList[i].lat), lng: Number(this.packageInfo.coordinateList[i].lng)}, 
                               label: 'Day' + (i+1),  
                    }
        console.log(this.packageInfo.coordinateList[i].lat)        
        this.markerOptionList.push(item) 
      }
      console.log(this.markerOptionList)
  
      }catch(error){
        console.log(error)
        console.log(this.markerOptionList)
      }
    },

    toggleEditForm() {
      this.isEdit = !this.isEdit
    },

  }
}
</script>

<style>

.packageGoogleMap{
  margin: 0 auto;
  margin-top:30px;
}
  #marginForLightBox{
    margin-top:35px;
  }
  .packageDetailInfoBox{
    display:flex;
    align-items: center;
    font-size: 18px;
  }

  .packageDay{
    font-weight: bold;
    margin: 0 0 0 80px;
  }

  .packageDetailInfoBox img{
    margin:0;
    margin-right:20px;
    margin-bottom:20px;
  }

  .packageDayandImageContainer{
    display: flex;
    flex-direction: column;
  }

  .packageDayandImageContainer p{
    margin-bottom:20px;
    white-space: pre-line;
  }

  .imageWithMap{
    display: flex;
  }

  #detailHeaderImage{
    width:100%;
  }

  #slider{
  overflow: hidden;
  margin-top:50px;
}

#slider figure{
  position: relative;
  width:300%;
  margin:0;
  left:0;
  animation: 20s slider infinite;
}

#slider figure img{
  width:5%;
  float: left;
}

@keyframes slider{
  0% {
    left:0;
  }


  100%{
    left:-50%;
  }

}
</style>