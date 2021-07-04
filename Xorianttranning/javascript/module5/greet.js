
document.getElementById("para").onclick = function() {
    fun()
    document.getElementById('change').onclick = changeColor;  
    };
    
    function fun() {
        document.getElementById("demo").innerHTML = "You clicked the button, I am new paragraph.";
    
        
        document.body.style.color = "purple";
        
        document.getElementsByTagName("body")[0].style.fontSize = "25px";
        
    }