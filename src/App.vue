<template>
  <div id="main"
       v-bind:class="typeof weather.main != 'undefined' && toC(weather.main.temp) > 16?'warm':''"
  > <!-- 스타일 적용을 위한 root태그 생성 동적으로 클래스를 지정-->
    <div class="search-box">
      <input v-model="city" id="cityInput" placeholder="Enter the City/>
    </div>
    <div v-if="weather.main"> <!-- 외부데이터 가져오기전 보이지 않는 영역(객체는 true를 반환하기 때문에 속성까지 접근)-->
      <div class="location-box">
        <div> {{weather.name}}, {{weather.sys.country}}</div>
      </div>
      <div class="weather-box">
        <div class="temperature-text">{{ toC(weather.main.temp) }}°C</div>
        <div class="weather-text">{{ weather.weather[0].main }}</div>
      </div>
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
    // 전송할 도시 정보
    let city = ref('');

    // 받아올 데이터
    let weather = ref({})
    // 날씨 정보 가져오기(OpenWeather API, axios 사용)
    const fetchWeather = () => {
      axios.get(url.value, {
        // 설정값중 파라미터 관련 설정
        params : {
          q : city.value, // 입력값으로 받을 도시
          appid : apiKey.value // openWeather API키
        }
      }).then(response => {
        // 제공받은 데이터 콘솔 출력
        // console.log(response);
        // 제공받은 데이터 set처리
        weather.value = response.data;
      }).catch((error) =>{
        // 외부 api에서 제공한 Error메세지 출력
        alert(error.response.data.message)
        // 에러발생시 weather 내용 초기화
        weather.value = {}
      })
    }

    /*온도변환 From K To C*/
    const toC = (kelvin) => {
      return Math.round(kelvin-273.15);
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
    return {apiKey, url, city, fetchWeather, weather,toC}
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
  /* flex 방향 세로로 설정 */
  flex-direction: column;
  /* flaxbox 속성중 가로로 어떻게 나열할지 결정하는 속성 */
  justify-content: flex-start;
  /* flaxbox 속성중 세로로 어떻게 나열할지 결정하는 속성 */
  align-items: center;
  /* 자식 컨테이너 테두리 요소 적용 -> padding이 height값에 포함됨 */
  box-sizing: border-box;
  /* 글자 가운데 정렬 */
  text-align: center;

  transition: 0.4s;
}
/*동적 클래스 생성*/
#main.warm{
  /* 사용자 경험을 증가시키기 위한 화면 전환 속도 조정 */
  transition: 0.4s;
  background-image: url("@/assets/warm-bg.jpg");
}
#cityInput{
  /* input 사이즈 조정*/
  padding: 15px;
  font-size: 20px;
  /* 뒷 하얀 배경 삭제 */
  background: none;
  /* 기본 테두리 삭제 */
  border: none;
  /* 포커스시 나타나는 테두리 삭제 */
  outline: none;
  /* 투명성 제공 */
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
}
.location-box {
  margin: 20px;
  font-style: italic;
  font-size: 20px;
  color: #fff;
}
.weather-box{
  color: #fff;
}
.temperature-text{
  padding: 10px 25px;
  /* 테두리 반지름 */
  border-radius: 16px;
  box-shadow: 5px 5px rgba(0,0,0,0.25);
  /* 텍스트 관련 설정 */
  font-size: 100px;
  font-weight: 900;
  /*글자 그림자*/
  text-shadow: 5px 5px rgba(0,0,0,0.25);
  /* 배경 투명 설정*/
  background-color: rgba(255,255,255,0.25);

}
.weather-text{
  padding: 20px;
  font-size: 40px;
  font-weight: bold;
  font-style: italic;
  /* 글자 그림자 */
  text-shadow: 5px 5px rgba(0,0,0,0.25);
}
</style>
