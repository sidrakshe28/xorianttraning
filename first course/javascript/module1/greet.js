
var p = document.getElementById('your_paragraph');
var btn = document.getElementById('btn');
var txt = document.getElementById('theText');
btn.onclick = function(){
    p.textContent = txt.value;
};