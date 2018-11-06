(function(){
  //Strictモードにする
  'use strict';

  //配列の作成
  var todos = localStorage.getItem('todos');
  //todosに文字列が存在する場合それを読み込む
  if(todos){
    todos = JSON.parse(todos);
  //何もない場合は空の配列を宣言する
  }else{
    todos = [];
  }

  //HTMLと機能の紐付け
  var todoForm = document.getElementById('todo-Form');
  var todoList = document.getElementById('todo-List');
  var todoInput = document.querySelector('#todo-Form input');

  //追加ボタンを押した際の配列の捜査機能
  //クリック時に画面遷移しないようにする
  var addItem = function(e){
    e.preventDefault();

    //テキストボックスが空の場合動作しない
    if(!todoInput.value){
      return;
    };
    //配列にtodoInputの値を追加
    todos.push({text:todoInput.value,done:false});
    render();
    //クリック後テキストボックスを空にする
    todoInput.value = '';
  };

  //HTMLの操作機能をまとめる変数renderの作成
  var render = function(){
    //リストの中身を空にする
    todoList.innerHTML = '';
    //配列todosの値todoにを渡す
    todos.forEach(function(todo){
      //チェックボックスの作成
      var checkBox = document.createElement('input');
      checkBox.type = 'checkbox';　// = input type = "checkbox"
      //チェックボックスの状態を反映
      checkBox.checked = todo.done;
      //チェックボックスの値が変わったときにその状態を保存
      checkBox.addEventListener ('change',function(){
        todo.done = event.target.checked;
        render();
      });
      //テキストコンテントを作成
      var span = document.createElement('span');
      span.textContent = todo.text;

      //label要素を作成
      var label = document.createElement('label');
      //labelの子要素にチェックボックスとテキストコンテントを追加
      label.appendChild(checkBox);
      label.appendChild(span);

      //削除ボタンの作成
      var deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';
      //削除ボタンクリック時の動作
      deleteButton.addEventListener('click',function(){
        //削除したい要素が何番目かを取得
        var index = todos.indexOf(todo);
        //取得した位置から1個分の要素を削除
        todos.splice(index,1);
        render();
      });

      //リストに項目を追加
      var listItem = document.createElement('li');
      //listItemにlabelを子要素として追加
      listItem.appendChild(label);
      listItem.appendChild(deleteButton);
      //todoListにlistItemを子要素として追加
      todoList.appendChild(listItem);
    });

    //ローカルストレージにtodosを文字列に変換し保存
    localStorage.setItem('todos',JSON.stringify(todos));
};

    //削除機能
    var deleteItem = function(e){
      //削除ボタンの親要素を取得
        var listItem = e.target.parentElement;
        //listItemに追加したli要素を削除
        todoList.removeChild(listItem);
    };

    //送信ボタンに機能を紐付け
    todoForm.addEventListener('submit',addItem);

    render();

}());
