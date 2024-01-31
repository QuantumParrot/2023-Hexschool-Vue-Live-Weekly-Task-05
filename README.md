## 參考文章

### 一、Vee-Validate 與 Vite 的整合

```
npm i vee-validate
npm i @vee-validate/rules
npm i @vee-validate/i18n
```

npm 的方式會和 CDN 有些許不同，因為套件不是寫在全域物件下，所以必須透過 ES6 的 import 語法

***

#### 1\. @vee-validate/rules ( 驗證規則 )

參考自：[官方文件](https://vee-validate.logaretm.com/v4/guide/global-validators#vee-validaterules)

**步驟一**：

``` js
import { defineRule } from 'vee-validate';
```
**步驟二：**

``` js
// 驗證規則部分引入 ver.

import { required, email } from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);

// 小孩子才選擇 ver.

import * as AllRules from '@vee-validate/rules'; // AllRules 為自定義命名

Object.keys(AllRules).forEach((rule) => {

  defineRule(rule, AllRules[rule]);

})
```

就 OK 哩

***

#### 2\. @vee-validate/i18n ( 多國語系套件 )

參考自：[官方文件](https://vee-validate.logaretm.com/v4/guide/i18n#using-vee-validatei18n)

**步驟一**：

``` js
import { configure } from 'vee-validate';
import { setLocale, localize } from '@vee-validate/i18n';
```

**步驟二**：

引入翻譯資源 ( JSON 檔案為 @vee-validate/i18n 套件內建 )

``` js
import zh_TW from '@vee-validate/i18n/dist/locale/zh_TW.json';
```

**步驟三**：

``` js
configure({

  generateMessage: localize({ zh_TW }),

  // validateOnInput: true,
  // 可加可不加，如果加了就是 input 式驗證 ( 立即驗證 )，不加就是 change 式驗證 ( 離開焦點之後才驗證 )

});
```

**步驟四**：

``` js
setLocale('zh_TW');
```

就可以哩

***

#### 3\. resetForm()

參考自：[官方文件](https://vee-validate.logaretm.com/v4/guide/components/handling-forms/)

resetForm 是 vee-validate 套件提供的表單清空方法，一般情況下可以用 ref 語法綁上 form 元件，透過 ref 呼叫它。

不過，如果將表單資料交給 pinia 管理的話，就必須改用以下方式：

**步驟一**：

在表單元件上用 v-slot 將 resetForm 方法取出 ( 和 errors 一樣用解構的方式取出來即可 )

``` vue
<template>
    <VForm v-slot="{ resetForm }">
        <button @submit="onSubmit">submit</button>
    </VForm>
</template>
```
**步驟二**：

接著在提交按鈕綁定的事件裡 ( 以上面的範例來說就是 onSubmit ) ，似乎 (?) 就會自動帶入 resetForm 方法，

一樣用解構把它取出來用即可 ( 下面是 options API 的寫法 )

``` js
// 🍍 此為 pinia store 的內部 //

actions: {

  onSubmit(values, { resetForm }) {

    // values 一樣是套件預設參數，會是整個表單元件裡所有資料 ( 必須使用它給的元件才會寫入，原生 HTML 標籤會被排除 )

    axios.post(...)

      .then((res) => {

      // ... (略) ...

      // 取得 API 回傳資料之後，直接呼叫它，就能清空ㄌ !!

      resetForm();

      }).catch((error) => { console.log(error) })

  }

}
```

完成 ~

***

### 二、vue-loading-overlay 與 Pinia 的整合

這是看過 1/30 每日助教專欄裡助教 Billy.Ji 回覆同學 Ann Chou 的提問 ＋ 估狗之後想到的解方 ( 謝謝同學和助教 !! )

是可以跑，但是不確定可不可以這樣用＠＠

內容略長，[寫在此處](https://determined-pram-34a.notion.site/Vue-Loading-Overlay-Pinia-4cdb2489c9aa47f5a6b1519088859fee)

***

### 其他超讚的參考文章

卡斯伯老師撰寫的 vee-validate 教學文件：[Vue 3 VeeValidation 驗證套件](https://hackmd.io/FFv0a5cBToOATP7uI5COMQ)

2023 Vue 直播班同學 Leo 撰寫的教學文件：[VeeValidation 在 Vite Vue 中的運用實作](https://fast-rise-3b2.notion.site/VeeValiadation-Vite-Vue-1dca9d5349434b66b8bb3d7ee67e148b)
