GitHub supports emoji! 
# Publishing

## HTML Tag (inline vs block)
> #### 1. inline 요소
👉 span, a, small, big, em, u, s, del, br, q, b, strong, mark, sub, video, audio
- 한줄에 여러개 배치
- 기본 너비값이 컨텐츠의 너비값
- 크기값을 가질 수 <U>없음</U>
- **상하** margin을 가질 수 <U>없음</U>

<br>

> #### 2. block 요소
👉 div, table, figure, figcaption, caption, header, nav, footer, section, article, aside, p, block, quote, ul, ol, li, td, th, form, hr, h1~h6 
- 한줄에 <U>한개</U>만 배치
- 기본 너비값이 <U>100%</U>
- 크기값을 가질 수 있음
- **상하** margin을 가질 수 있음

<br>

> #### 3. inline-block 요소
👉 img, input 태그, button, fontawesome
- 한줄에 여러개 배치
- 기본 너비값이 컨텐츠의 너비값
- 크기값을 가질 수 <U>있음</U>
- **상하** margin을 가질 수 <U>있음</U>   

<br>
  
<hr/>

<br>

## Notes
- ol, li tag 을 활용한 네비게이션(ul 닫는 태그 위치 헷갈리지 말자!)
  ```
  <ul>
    <li>첫번째 목록</li>
    <li>두번째 목록
      <ul>
        <li>두번째의 첫번째 목록</li>
        <li>두번째의 두번째 목록</li>
      </ul>
    </li>
    <li>세번째 목록</li>
  </ul>
  ```
- 영향을 안받게 하기
  - 자식 요소에 크기에 따라 영향 안받게
    ```
    .parent{
      overflow: hidden;
    }
    ```
  - box가 margin과 padding의 영향을 안받게
    ```
    box-sizing: border-box
    ```
- btn에 cursor 주기
  ```
  btn{
    cursor: pointer;
  }
  ``` 
- ul,li bullet 없애기
  ```
  ul, li{
    list-style: none;
    list-style-type: none;
  }
  ```
<br>

- position 속성
  ```
  .parent {
    position: relative;
  }
  .siblings{
    position: absolute;
  }
  ```

<br>

- float 속성  
💦 자식에 float속성이 있으면 부모요소에 overflow: hidden 또는 자식의 높이값 만큼 height 준다
  - left
  - right
  - margin: auto
  - none (float: left와는 완전 다름)

<br>

- 가로배치하는 2가지 방법
  - 1.float와 overflow를 활용하여 배치 : 1px 오차 없이 가능
    ```
    .parent {
      <!-- 자식의 높이값을 찾을 수 있게 -->
      overflow: hidden;
    }
    .siblings {
      float: left;
      <!-- border사이즈에 영향 받게 1px 까지 하기 위해 -->
      box-sizing: border-box;
    }
    ```
  - 2.자식요소 display: inline-block으로 배치
    ```
    .siblings {
      <!-- inline 속성으로 강제 변환 -->
      display: inline-block;
    }
    ```
  - 3.flex 이용
    ```
    .parent{
      display: flex;
    }
    .siblings{
      flex:1;
    }
    ```
<br>

- 수직 중앙 배치
  - css code
    ```
    .div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    } 
    ```
    ```
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      <!-- 높이 값을 줘야 수직 중앙 할 수 있음 -->
      height: 100vh;
    }
    ```
