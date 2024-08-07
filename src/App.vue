<template>
  <div id="main"> <!-- 스타일 적용을 위한 root태그 생성 -->
    <div class="search-box">
      <input v-model="city" id="cityInput"/>
    </div>
    <div class="location-box">
      <div>{{location}}</div>
      <div>{{todayDate}}</div>
    </div>
    <div class="weather-box">
      <div>{{temp}}</div>
      <div>{{weather}}</div>
    </div>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref} from "vue";
import axios from "axios";

export default {
  // Vue3 Composition API에서 나온 재사용을 위한 기능
  setup(){
    // 재사용 가능한 변수 선언
    // OpenWeather 에 사용될 apiKey
    let apiKey = ref('611d48034b6b1de018f2d156d78bd781')
    // OpenWeather 기본 url
    let url = ref('https://api.openweathermap.org/data/2.5/weather')
    // 받아올 도시 정보
    let city = ref('');
    // 날씨 정보 가져오기(OpenWeather API, axios 사용)
    const fetchWeather = () => {
      axios.get(url.value, {
        // 설정값중 파라미터 관련 설정
        params : {
          q : city.value, // 입력값으로 받을 도시
          appid : apiKey.value
        }
      }).then(response => {
            console.log(response)
      })
    }

    //컴포넌트가 마운트 될 때 eventListener등록
    onMounted(()=>{
      // input에 대한eventListener 등록
      let cityInput = document.querySelector("#cityInput")
      cityInput.addEventListener('keydown', (e) =>{
        // Enter사용시
        if(e.key === 'Enter'){
          fetchWeather();
        }
      })
    })
    // unmounted될때 EventListener제거
    onUnmounted(()=>{
      let cityInput = document.querySelector("#cityInput")
      cityInput.removeEventListener('keydown', (e) =>{
        // Enter사용시
        if(e.key === 'Enter'){
          fetchWeather();
        }
      })
    })
    // city => city : ref('') 로 변환
    return {apiKey, url, city, fetchWeather}
  }
}


</script>

<style>
/* 모든 요소선택자에대해 마진 및 패딩 0처리 */
* {
  margin: 0;
  padding: 0;
}
#main{
  margin: 0;
  padding: 25px;
  height: 100vh;
  background-image: url("@/assets/cold-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100vh;
  /* display를 FlaxBox 컨테이너로 지정 */
  display: flex;
  /* flaxbox 속성중 가로로 어떻게 나열할지 결정하는 속성 */
  justify-content: center;
  /* flaxbox 속성중 세로로 어떻게 나열할지 결정하는 속성 */
  align-items: flex-start;
  /* 자식 컨테이너 테두리 요소 적용 -> padding이 height값에 포함됨 */
  box-sizing: border-box;

  .search-box{

  }

  /* input 스타일 적용*/
  #cityInput{
    width: 100%;
  }

}
</style>
