var runButton = document.getElementById("run_button");

running = false;

runButton.addEventListener("click", function(e){
    if (e.target.value == "Run"){
        e.target.value = "Stop";
        obj1.velocity = parseInt(document.getElementById("velocity1_number").value);
        obj2.velocity = parseInt(document.getElementById("velocity2_number").value);
        document.getElementById("velocity1_number").readOnly = true;
        document.getElementById("velocity2_number").readOnly = true;
        running = true;
    } else {
        e.target.value = "Run";
        obj1.velocity = 0;
        obj2.velocity = 0;
        running = false;
        document.getElementById("velocity1_number").readOnly = false;
        document.getElementById("velocity2_number").readOnly = false;
    }
})