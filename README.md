GitHub supports emoji! 
# Publishing

## HTML Tag (inline vs block)
> #### 1. inline 요소
👉 span, a, small, big, em, u, s, del, br, q, b, strong, mark, sub, video, audio
- 한줄에 여러개 배치
- 기본 너비값이 컨텐츠의 너비값
- 크기값을 가질 수 <U>없음</U>
- **상하** margin을 가질 수 <U>없음</U>

> #### 2. block 요소
👉 div, table, figure, figcaption, caption, header, nav, footer, section, article, aside, p, block, quote, ul, ol, li, td, th, form, hr, h1~h6 
- 한줄에 <U>한개</U>만 배치
- 기본 너비값이 <U>100%</U>
- 크기값을 가질 수 있음
- **상하** margin을 가질 수 있음
> #### 3. inline-block 요소
👉 img, input 태그, button, fontawesome
- 한줄에 여러개 배치
- 기본 너비값이 컨텐츠의 너비값
- 크기값을 가질 수 <U>있음</U>
- **상하** margin을 가질 수 <U>있음</U>   
  
<hr/>
  
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

- float 속성  
💦 자식에 float속성이 있으면 부모요소에 overflow: hidden 또는 자식의 높이값만큼 height 준다
  - left
  - right
  - margin: auto
  - none (float: left와는 완전 다름)

- 가로배치하는 2가지 방법
  - float와 overflow를 활용하여 배치 : 1px 오차 없이 가능 (box-sizing: border-box로 border값까지 계산)
  - display: inline-block으로 배치