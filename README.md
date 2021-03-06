# Publishing

## HTML Tag (inline vs block)
> #### 1. inline ์์
๐ span, a, small, big, em, u, s, del, br, q, b, strong, mark, sub, video, audio
- ํ์ค์ ์ฌ๋ฌ๊ฐ ๋ฐฐ์น
- ๊ธฐ๋ณธ ๋๋น๊ฐ์ด ์ปจํ์ธ ์ ๋๋น๊ฐ
- ํฌ๊ธฐ๊ฐ์ ๊ฐ์ง ์ <U>์์</U>
- **์ํ** margin์ ๊ฐ์ง ์ <U>์์</U>

<br>

> #### 2. block ์์
๐ div, table, figure, figcaption, caption, header, nav, footer, section, article, aside, p, block, quote, ul, ol, li, td, th, form, hr, h1~h6 
- ํ์ค์ <U>ํ๊ฐ</U>๋ง ๋ฐฐ์น
- ๊ธฐ๋ณธ ๋๋น๊ฐ์ด <U>100%</U>
- ํฌ๊ธฐ๊ฐ์ ๊ฐ์ง ์ ์์
- **์ํ** margin์ ๊ฐ์ง ์ ์์

<br>

> #### 3. inline-block ์์
๐ img, input ํ๊ทธ, button, fontawesome
- ํ์ค์ ์ฌ๋ฌ๊ฐ ๋ฐฐ์น
- ๊ธฐ๋ณธ ๋๋น๊ฐ์ด ์ปจํ์ธ ์ ๋๋น๊ฐ
- ํฌ๊ธฐ๊ฐ์ ๊ฐ์ง ์ <U>์์</U>
- **์ํ** margin์ ๊ฐ์ง ์ <U>์์</U>   

<br>
  
<hr/>

<br>

## Notes
- ol, li tag ์ ํ์ฉํ ๋ค๋น๊ฒ์ด์(ul ๋ซ๋ ํ๊ทธ ์์น ํท๊ฐ๋ฆฌ์ง ๋ง์!)
  ```
  <ul>
    <li>์ฒซ๋ฒ์งธ ๋ชฉ๋ก</li>
    <li>๋๋ฒ์งธ ๋ชฉ๋ก
      <ul>
        <li>๋๋ฒ์งธ์ ์ฒซ๋ฒ์งธ ๋ชฉ๋ก</li>
        <li>๋๋ฒ์งธ์ ๋๋ฒ์งธ ๋ชฉ๋ก</li>
      </ul>
    </li>
    <li>์ธ๋ฒ์งธ ๋ชฉ๋ก</li>
  </ul>
  ```
- ์ํฅ์ ์๋ฐ๊ฒ ํ๊ธฐ
  - ์์ ์์์ ํฌ๊ธฐ์ ๋ฐ๋ผ ์ํฅ ์๋ฐ๊ฒ
    ```
    .parent{
      overflow: hidden;
    }
    ```
  - box๊ฐ margin๊ณผ padding์ ์ํฅ์ ์๋ฐ๊ฒ
    ```
    box-sizing: border-box
    ```
- btn์ cursor ์ฃผ๊ธฐ
  ```
  btn{
    cursor: pointer;
  }
  ``` 
- ul,li bullet ์์ ๊ธฐ
  ```
  ul, li{
    list-style: none;
    list-style-type: none;
  }
  ```
<br>

- position ์์ฑ
  ```
  .parent {
    position: relative;
  }
  .siblings{
    position: absolute;
  }
  ```

<br>

- float ์์ฑ  
๐ฆ ์์์ float์์ฑ์ด ์์ผ๋ฉด ๋ถ๋ชจ์์์ overflow: hidden ๋๋ ์์์ ๋์ด๊ฐ ๋งํผ height ์ค๋ค
  - left
  - right
  - margin: auto
  - none (float: left์๋ ์์  ๋ค๋ฆ)

<br>

- ๊ฐ๋ก๋ฐฐ์นํ๋ 2๊ฐ์ง ๋ฐฉ๋ฒ
  - 1.float์ overflow๋ฅผ ํ์ฉํ์ฌ ๋ฐฐ์น : 1px ์ค์ฐจ ์์ด ๊ฐ๋ฅ
    ```
    .parent {
      <!-- ์์์ ๋์ด๊ฐ์ ์ฐพ์ ์ ์๊ฒ -->
      overflow: hidden;
    }
    .siblings {
      float: left;
      <!-- border์ฌ์ด์ฆ์ ์ํฅ ๋ฐ๊ฒ 1px ๊น์ง ํ๊ธฐ ์ํด -->
      box-sizing: border-box;
    }
    ```
  - 2.์์์์ display: inline-block์ผ๋ก ๋ฐฐ์น
    ```
    .siblings {
      <!-- inline ์์ฑ์ผ๋ก ๊ฐ์  ๋ณํ -->
      display: inline-block;
    }
    ```
  - 3.flex ์ด์ฉ
    ```
    .parent{
      display: flex;
    }
    .siblings{
      flex:1;
    }
    ```
<br>

- ์์ง ์ค์ ๋ฐฐ์น
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
      <!-- ๋์ด ๊ฐ์ ์ค์ผ ์์ง ์ค์ ํ  ์ ์์ -->
      height: 100vh;
    }
    ```
