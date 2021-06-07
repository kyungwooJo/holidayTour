<template>
<div>
    <MainMenu />
    <AnnouncementHeader />
    <div class="QandA-background"> 
        <h2 class="board-title">홀리데이 공지사항</h2>
        <div class= "questionMenuForm">
            <span id="menu-num-part">번호</span>
            <span id="menu-name-part">글쓴이</span>
            <span id="menu-title-part">제목</span>
            <span id="menu-date-part">등록일</span>
            <span id="menu-visitedNum-part">조회</span>
        </div>
        <div class="questionListContainer">
            <div v-for="announcement in computedAnnouncements" :key="announcement._id" class="singleQuestionForm">
                <router-link :to="{ name: 'AnnouncementDetail', params: { id: announcement._id }}">
                    <span class="dot-part" id="menu-num-part">{{announcement.orderNumber+1}}</span>
                    <span class="dot-part" id="menu-name-part">{{announcement.name}} </span>
                    <span class="dot-part" id="menu-title-part">{{announcement.title}}</span>
                    <span class="dot-part" id="menu-date-part">{{formatDate(announcement.created)}}</span>
                    <span class="dot-part" id="menu-visitedNum-part">{{announcement.numOfVisited}}</span>
                </router-link>
                <button v-if="user !== null && user.role == 'admin'" @click="deleteAnnouncement(announcement._id)"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
        <div class="questionArrowBtn">
            <button class="questionArrowLeft" @click="moveArrayBackWordBtn"><i id="arrow-left" class="fas fa-arrow-left"></i></button>
            <button class="questionArrowRight" @click="moveArrayForwardBtn"><i id="arrow-right" class="fas fa-arrow-right"></i></button>
        </div>
        <router-link to='/AddNewAnnouncement' class="quetion-write-btn"><button v-if="this.$root.$data.currentUser.user != null && this.$root.$data.currentUser.user.role=='admin'" class="Questionbtn">작성</button></router-link>
    </div>
</div>
</template>

<script>
import MainMenu from '../components/MainMenu'
import AnnouncementHeader from '../components/AnnouncementHeader'
import axios from 'axios'
import moment from 'moment'

export default {

    data() {
        return {
            announcements: []
        }
    },

    created() {
        this.getAnnouncementList()
    },

    computed: {
        user() {
            return this.$root.$data.currentUser.user
        },

        computedAnnouncements() {
            return this.announcements;
        }
    },

    components: {
        MainMenu,
        AnnouncementHeader
    },

    methods:{
        async getAnnouncementList() {

            try{
                let response = await axios.get('/api/announcements/all')
                this.announcements = response.data
                this.insertOrderValue()
                this.sortArray()
                return true
            }catch(error){
                console.log(error)
            }
        },

        async deleteAnnouncement(id) {

            try{
                let response = confirm("정말 지우시겠습니까?")
                if(response){
                await axios.delete('/api/announcements/' + id)
                this.getAnnouncementList()
                }
            }catch(error){
                console.log(error)
            }

        },

        formatDate(date) {
            return moment(date).format('ddd MMMM YYYY');
        },

        insertOrderValue() {
            for(let i=0; i<this.announcements.length; i++){
                this.announcements[i].orderNumber = i
            }
        },

        sortArray() {
            this.announcements.sort((a, b) => {
                return  b.orderNumber - a.orderNumber ;
            });
        },

        
    }
}
</script>

<style>

</style>