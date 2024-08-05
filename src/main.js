import { createApp } from 'vue' // package.json에 선언되어있는 라이브러리 안의 createApp메소드를 가져옴
import App from './App.vue' // /App.vue에 선언되어있는 App을 import

createApp(App).mount('#app') // import한 Vue앱을 public 폴더안에 index.html안의 id가 app인 Dom요소에 마운트
