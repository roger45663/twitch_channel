

// // 以下為 vanilla js 的方式撰寫
// // 使用 IIFE 將程式碼區分出來，避免跟其他框架或libary汙染到
// (function() {
//     "use strict";
//     // 從第幾筆資料開始抓
//     let nowIndex = 0;
//     // 防止資料不斷讀取
//     let isLoading = false;
//     // 遊戲類別
//     const gameInfo = 'League%20of%20Legends';
//     // 使用者ID
//     const clientId = 'bmc67x4ldrzz8sin53rxhzy3kxzerv';
//     // 取得資料筆數
//     const limit = 12;
//     // 使用 js 的 hoisting 特性開啟網頁時，馬上抓取API資料以及進行渲染頁面
//     appendData();

//     // 取得 Twitch API 資料
//     function getData(cb) {
//         let url = `https://api.twitch.tv/kraken/streams/?client_id=${clientId}&game=${gameInfo}&limit=${limit}&offset=${nowIndex}`
//         isLoading = true;
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.send(null);
//         xhr.onload = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 let parseData = JSON.parse(xhr.responseText);
//                 cb(null, parseData);
//             } else {
//                 cb(1);
//             }
//         }
//     }

//     function appendData() {
//         // 回呼函式(callback function)
//         // 呼叫 getData 這個函式，同時丟一個函式給它
//         getData((err, item) => {
//             if (err) {
//                 // 取得失敗跳出資訊
//                 alert('讀取不到資料');
//             } else {
//                 // 將cb丟回來的資料，進行處理
//                 const datas = item.streams;
//                 const container = document.querySelector('.container');

//                 // 依迴圈的方式依序將資料渲染到頁面上
//                 for (const data of datas) {
//                     // 依序將分離出來的資料，丟到 rendering 這個函式，
//                     // 進行 HTML 標籤組建並丟回，將組建完的資料，加到
//                     // 要渲染的標籤裡
//                     container.appendChild(rendering(data));
//                 }
//                 nowIndex += 12;
//                 isLoading = false;
//             }
//         })
//     }


//     // 渲染頁面
//     function rendering(data) {
//         let el = document.createElement('div');
//         el.classList.add('channel');
//         el.innerHTML += `
//         <div class="channelTop">
//             <img src="${data.preview.medium}" alt="channel image" onload="this.style.opacity=1;">
//         </div>
//         <div class="channelBottom">
//             <div class="portrait">
//                 <img src="${data.channel.logo}" alt="hostPortrait" onload="this.style.opacity=1;">
//             </div>
//             <div class="channelIfo">
//                 <h3 class="channelName">${data.channel.status}</h3>
//                 <h4 class="hostName">${data.channel.display_name}</h4>
//             </div>
//         </div>
//     `;
//         return el;
//     }

//     // scroll 偵測
//     window.addEventListener('scroll', function () {
//         // 瀏覽器滾輪和頁面頂部之間的距離
//         let scrollHeight = document.documentElement.scrollTop;
//         // 所見畫面視窗的高度
//         let windowInnerHeight = window.innerHeight;
//         // 實際頁面總高
//         let totalHeight = document.documentElement.scrollHeight;
//         // 判斷頁面滑到快底部時，及觸發裡面的程式
//         if (scrollHeight + windowInnerHeight >= totalHeight - 200) {
//             if (!isLoading) {
//                 appendData();
//             }
//         }
//     })
// })();

// 以下為 jQuery 方式撰寫
var I18N = {
    en: require('./lang-en'),
    ch: require('./lang-zh-tw')
};

var $ = require('jquery');
$(document).ready(function() {
    

    // 從第幾筆資料開始抓
    let nowIndex = 0;
    let isLoading = false;
    // 預設一開始的語言
    let LANG = 'zh-tw';
    // 使用 js 的 hoisting 特性開啟網頁時，馬上抓取API資料以及進行渲染頁面
    appendData(LANG);

    // 取得 Twitch API 資料
    function getData(lang,cb) {
        // 遊戲類別
        const gameInfo = 'League%20of%20Legends';
        // 使用者ID
        const clientId = 'bmc67x4ldrzz8sin53rxhzy3kxzerv';
        // 取得資料筆數
        const limit = 12;
        isLoading = true;

        // 使用 jQuery 的 $.ajax 函式
        $.ajax({
            // 型態為取得 API 資料，所以設定為GET
            type: "GET",
            // 是否為非同步，是的話，輸入true，同步則輸入false
            async: true,
            // 要取得資料的網址
            url: `https://api.twitch.tv/kraken/streams/?client_id=${clientId}&game=${gameInfo}&limit=${limit}&offset=${nowIndex}&language=${lang}`,
            // 資料取得成功，就會執行裡面的程式
            success: (response) => {
                // 將取得的資料，丟到 callback function 裡
                // 第一個參數代表，取得資料的狀態，第二個參數才是取得的資料
                cb(null, response);
            },
            // 取得失敗，則執行裡面的程式
            error: (err) => {
                cb(err);
            }
        })
    }

    function appendData(lang) {
        // 回呼函式(callback function)
        // 呼叫 getData 這個函式，同時丟一個函式給它
        getData(lang,(err, item) => {
            if (err) {
                // 取得失敗跳出資訊
                alert('讀取不到資料');
            } else {
                // 將cb丟回來的資料，進行處理
                const datas = item.streams;
                const container = $('.container')

                // 依迴圈的方式依序將資料渲染到頁面上
                for (const data of datas) {
                    // 依序將分離出來的資料，丟到 rendering 這個函式，
                    // 進行 HTML 標籤組建並丟回，將組建完的資料，加到
                    // 要渲染的標籤裡
                    container.append(rendering(data));
                }
                nowIndex += 12;
                isLoading = false;
            }
        })
    }


    // 渲染頁面
    function rendering(data) {
        // 使用 ES6 的模板方式組件資料
        return `
        <a class="channel" href="${data.channel.url}" target="_blank">
            <div class="channelTop">
                <img src="${data.preview.medium}" alt="channel image" onload="this.style.opacity=1;">
            </div>
            <div class="channelBottom">
                <div class="portrait">
                    <img src="${data.channel.logo}" alt="hostPortrait" onload="this.style.opacity=1;">
                </div>
                <div class="channelIfo">
                    <h3 class="channelName">${data.channel.status}</h3>
                    <h4 class="hostName">${data.channel.display_name}</h4>
                </div>
            </div>
        </a>
        `;
    }

    // scroll 偵測
    $(window).scroll(function() {
        // 判斷頁面滑到快底部時，及觸發裡面的程式
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {

            if(!isLoading) {
                appendData(LANG);
            }
        }
    })

    // 語言切換
    // 分別新增 en 和 zh-tw 的 js 檔
    $('.title .wrap a').on('click', function(e) {
        e.preventDefault();
        // 然後判斷點擊的是什麼語言後，變更標題語言
        if ($(this)[0].innerHTML === '中文') {
            $('.titleText').text(I18N['ch']['TITLE']);
            LANG = 'zh-tw';
        } else if ($(this)[0].innerHTML === 'English') {
            $('.titleText').text(I18N['en']['TITLE']);
            LANG = 'en';
        }
        // 將內容清空
        $('.container').empty();
        nowIndex = 0;
        // 再將要渲染的語言丟給 appendData 去重新渲染頁面
        appendData(LANG);
    })
})