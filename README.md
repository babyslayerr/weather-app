# 날씨 앱 
이 애플리케이션은 Vue와 OpenWeatherMap API를 사용하여 전 세계 도시의 현재 날씨를 검색할 수 있는 간단한 날씨 앱이다.

## 주요기능
- 도시 검색으로 도시 날씨(온도) 검색
- 기후 상태 추가 표시
- 온도에 따른 반응형 디자인


![Animation](https://github.com/user-attachments/assets/f33ed778-3775-4440-93ff-2418993ab9df)


## 버전 정보
- node v18.12.0
- npm 8.19.2

## 설치방법
- 레파지토리 클론
- 패키지 설지
```bash
  npm install
```
- 개발 서버 시작
```bash
  npm run serve
```
## 사용방법
검색 창에 도시 이름을 입력한다. ex) seoul
"Enter" 키를 누른다.
앱이 해당 도시의 현재 날씨 데이터를 표시합니다.

### 사용기술
- ```Vue``` : 간편한 웹 디자인을 위한 프레임워크
- ```axios``` : 서버 통신을 위한 라이브러리
- ```openWeatherMap API``` : 날씨 정보를 제공하는 외부 API

