/*
＜半角スぺースを入れないパターン＞
全角カンマ（ピリオド）＋半角文字
"「" + "半角文字" + "」"
*/
(function () {
  'use strict';

  // 全角・半角チェック
  function isZenkaku(obj){
    var len=escape(obj).length;
    if(len>=4 || escape(obj) == '%0A'){
      // 全角の場合
      return true;
    }else{
      // 半角の場合
      return false;
    }
  }

  // str の idx 文字目の次に半角スペースを挿入
    function insertSpace(str, idx){
      return str.slice(0, idx) + ' ' + str.slice(idx);
    };

  document.getElementById('btn').addEventListener('click', function(){

  //   document.getElementById('text2').value =
  //            (document.getElementById('text1').value.match(/\w+(?=[\W$])|\W+(?=[\w$])/) || []).join(' ');

    // 入力されたテキスト
    var text = document.getElementById('text1').value;
    // 半角スペースを入れるインデックスを保持
    var spacenum = [];
    var j = 0;

    // 全角→半角へ変換
    text = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    });

    for (var i = 0; i < text.length; i++) {
      if (text[i] == '{' || text[i] == '\n' || text[i] == '．' || text[i] == '，' || text[i] == '「' || text[i] == '」' || text[i] == ' ' ) {
        continue;
      }else if ((isZenkaku(text[i]) == true && isZenkaku(text[i + 1]) == false )
      || (isZenkaku(text[i]) == false && isZenkaku(text[i + 1]) == true )) {
        // ”全角＋半角” or ”半角＋全角”のとき
        if (text[i + 1] == '}' || text[i + 1] == '」' || text[i + 1] == ' ' || text[i+1] == '.'){continue;}
        spacenum[j] = i+1;
        j++;
      }
    }
    // 半角スペース挿入
    for (var i = 0; i < spacenum.length; i++) {
      var index = spacenum.length - i;
      text = text.slice(0, index) + ' ' + text.slice(index);
    }
    document.getElementById('text2').value = text; //text2に出力
  });


})();
