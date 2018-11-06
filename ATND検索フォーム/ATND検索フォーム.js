(function(){
  //strictモードにする
  'use strict';

  //HTML上の要素を取得
  var searchForm = document.getElementById("search-form");
  var searchInput = document.getElementById("search-input");
  var eventList = document.getElementById("event-list");

  //検索結果の取得
  var searchEvents = function (event) {
    //Formの画面遷移機能を削除
    event.preventDefault();

    //テキストボックスが空の場合実行しない
    if(!searchInput.value){
      return;
    }

    //XHRでクロスドメインのデータを取得
    //scriptタグの作成
    var element = document.createElement("script");
    //ATNDのAPIを指定
    //formatにjsonpを指定
    element.src = "http://api.atnd.org/events/?format=jsonp&keyword="
    //URLをエンコード
    + encodeURI(searchInput.value);
    //bodyタグの子要素にscriptタグを追加
    //scriptタグの中はクロスドメイン可
    document.body.appendChild(element);
    //子要素を削除
    document.body.removeChild(element);
  };

  //検索結果の表示
  var showEvents = function (date) {
    //eventListの中のHTMLを空に
    eventList.innerHTML = "";
    //date.eventsが配列でない場合実行しない
    if(!date && date.events instanceof Array){
      return;
    }
    //検索結果の要素それぞれに行う処理
    date.events.forEach(function(eventInfo){
      var event = eventInfo.event;
      //time要素の作成
      var time = document.createElement("time");
      //timeのテキストとしてイベント開催日時を代入
      time.textContent = formatDate(event.started_at);
      //link要素の作成
      var link = document.createElement("a");
      //linkのリンク先ATNDのURLを代入
      link.href = event.event_url;
      //別窓で表示させる
      link.target = "_blank";
      //linkのテキストとしてタイトルを代入
      link.textContent = event.title;
      //li要素の作成
      var li = document.createElement("li");
      //time要素とlink要素をliの子要素に
      li.appendChild(time);
      li.appendChild(link);
      //li要素をeventListの子要素に
      eventList.appendChild(li);
    });
  };

  //日付表示を整える
  var formatDate = function (dateString) {
    var date = new Date(dateString);
    //getYearは1900を+するときれいに表示される
    //getMonthは0~11の数字を取得するため、+1すると1~12の間で表示される
    return (date.getYear() + 1900) + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  };

  //検索ボタンが押されたときにsearchEventsを実行
  searchForm.addEventListener("submit", searchEvents);

  //jsonpをJavaScriptとして実行するための関数を宣言
  //showEventsの実行
  window.callback = showEvents;
}());
