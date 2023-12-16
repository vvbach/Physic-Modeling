var runButton = document.getElementById("run_button");

running = false;

runButton.addEventListener("click", function(e){
    if (e.target.value == "Run"){
        e.target.value = "Stop";
        obj1.velocity = parseInt(velocity1_input.value);
        obj2.velocity = parseInt(velocity2_input.value);
        velocity1_input.readOnly = true;
        velocity2_input.readOnly = true;
        running = true;
    } else {
        e.target.value = "Run";
        obj1.velocity = 0;
        obj2.velocity = 0;
        running = false;
        velocity1_input.readOnly = false;
        velocity2_input.readOnly = false;
    }
})