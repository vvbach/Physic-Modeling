function RestrictInput(e, obj){
    var min = 1;
    var max = 100;
    if (e.target.value == ''){
        return;
    }
    if (e.target.value < min) {
        e.target.value = min;
    }
    else if (e.target.value > max){
        e.target.value = max;
    }
    obj.mass = parseInt(e.target.value);
}

document.getElementById("mass1_input").addEventListener("input", e => RestrictInput(e, obj1));;
document.getElementById("mass2_input").addEventListener("input", e => RestrictInput(e, obj2));
