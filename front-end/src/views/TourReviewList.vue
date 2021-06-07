<template>
<div>
    <MainMenu />
    <div class="searchFormContainer">
        <div id="searchFormId"><label for="destinations">검색 </label><i class="fas fa-search"></i></div>
        <div class="searchFormBox">
            <select class="searchBarText" id="filterSelect" name="destinations" required>
                <option value="" disabled selected>분류</option>
                <option id="filterByNumber" value="번호">번호</option>
                <option id="filterByName" value="작성자">작성자</option>
                <option id="filterByTitle" value="제목">제목</option>
            </select>
            <input class="searchBarTextInput" id="filterInputBox" type="text" placeholder="입력">
            <button class="searchBarText" id="form3" @click="slice">확인</button>
        </div>
    </div>    

    <div class="QandA-background"> 
        <h2 class="board-title">Tour 리뷰</h2>
        <div class= "questionMenuForm">
            <span id="menu-num-part">번호</span>
            <span id="menu-name-part">글쓴이</span>
            <span id="menu-title-part">제목</span>
            <span id="menu-date-part">등록일</span>
            <span id="menu-visitedNum-part">조회</span>
        </div>
        <div class="questionListContainer">
            <div v-for="review in computedReviews" :key="review.id" class="singleQuestionForm">
                <router-link :to="{ name: 'TourReviewDetail', params: { id: review._id }}">
                    <span class="dot-part" id="menu-num-part">{{review.orderNumber+1}}</span>
                    <span class="dot-part" id="menu-name-part">{{review.name}} </span>
                    <span class="dot-part" id="menu-title-part">{{review.title}}</span>
                    <span class="dot-part" id="menu-date-part">{{formatDate(review.created)}}</span>
                    <span class="dot-part" id="menu-visitedNum-part">{{review.numOfVisited}}</span>
                </router-link>
                <button v-if="user !== null && user.role == 'admin'" @click="deleteReview(review._id)"><i class="fas fa-trash-alt"></i></button>       
            </div>
        </div>
        <div class="questionArrowBtn">
            <button class="questionArrowLeft" @click="moveArrayBackWordBtn"><i id="arrow-left" class="fas fa-arrow-left"></i></button>
            <button class="questionArrowRight" @click="moveArrayForwardBtn"><i id="arrow-right" class="fas fa-arrow-right"></i></button>
        </div>
        <router-link to='/TourReview' class="quetion-write-btn"><button class="Questionbtn">작성</button></router-link>
    </div>
</div>
</template>

<script>
import MainMenu from '../components/MainMenu'
import axios from 'axios'
import moment from 'moment';
export default {
    data() {
        return {
            reviews:[],
            originalReviews:[]
        }
    },

    mounted() {
        this.getReviews()        
    },

    computed: {
        user() {
            return this.$root.$data.currentUser.user;
        },

        computedReviews() {
            return this.reviews;
        },
    },

    components: {
        MainMenu
    },

    methods: {
        async getReviews() {
            try {
                let response = await axios.get('/api/tourReviews')
                this.reviews = response.data
                this.originalReviews = this.reviews
                this.insertOrderValue()
                this.sortArray()
                return true;
            }catch(error){
                console.log(error);
            }
        },

        async deleteReview(id){
            try{
                let response = confirm('정말 삭제 하시겠습니까?')
                if(response){
                await axios.delete('/api/tourReviews/' + id)
                this.getReviews()
                }
            }catch(error){
                console.log(eorror)
            }
        },

        formatDate(date) {
            return moment(date).format('ddd MMMM YYYY');
        },

        insertOrderValue() {
            for(let i=0; i<this.reviews.length; i++){
                this.reviews[i].orderNumber = i
            }
        },

        sortArray() {
            this.reviews.sort((a, b) => {
                return  b.orderNumber - a.orderNumber ;
            });
        },

        slice() {

            this.reviews = this.originalReviews;
            let filterSelect= document.getElementById('filterSelect');
            let selectedOption = filterSelect.value;

            let filterInputValue = document.getElementById('filterInputBox').value
            
            if(selectedOption == "작성자"){
                this.reviews = this.reviews.filter( reviews => reviews.name == filterInputValue)
            }

            if(selectedOption == "번호"){
                this.reviews = this.reviews.filter( reviews => reviews.orderNumber == filterInputValue-1)
            }

            if(selectedOption == "제목") {
                this.reviews = this.reviews.filter (reviews => reviews.title.search(filterInputValue) >= 0)
                
            }
        }
    }
}
</script>

<style>
    .searchBarText{
        height: 30px;
    }

    .searchBarTextInput{
       margin-left: 10px;
    }
</style>