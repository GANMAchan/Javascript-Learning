(function(){
  //Strictモードにする
  'use strict';

  //経過時間を保存する変数
  var passedTime = 0;
  //setInterval用の変数
  var intervalId = null;
  //ID:timerの要素を取得し、変数timerに代入
  var timer = document.getElementById('timer');

  //開始ボタンの動作
  function start(){
    //intervalIdがnullの場合のみ動作
    if(intervalId != null){
      return;
    }
    //一秒ごとに更新
    intervalId = setInterval(function(){
      passedTime++;
      //passedTimeの値が変わる毎にrenderを表示
      render();
    },1000); //ms　
  }

  //停止ボタンの動作
  function stop(){
    //intervalIdがnullでない場合のみ動作
    if(intervalId != null){
    //intervalIdの動作を解除
    clearInterval(intervalId);
    intervalId = null;
    }
  }

  //リセットボタンの動作
  function reset(){
    //タイマーを停止しpassedTimeを0に
    stop();
    passedTime = 0;
    render();
  }

  //現在のpassedTimeを表示する機能
  function render(){
    //分を表示する変数
    var minutes = Math.floor(passedTime / 60);
    //秒を表示する変数
    var seconds = passedTime % 60;
    timer.textContent = zero(minutes) + ':' + zero(seconds);
  }

  render();

  //分、秒が一桁の場合二桁目にをそれぞれ追加
  function zero(num){
    return('0' + num).slice(-2);
  }


  //画面上のボタンを押したときの動作と機能を紐付け
  document.getElementById('start').addEventListener('click',start);
  document.getElementById('stop').addEventListener('click',stop);
  document.getElementById('reset').addEventListener('click',reset);

}());
