var container = document.getElementById("container");
var context = container.getContext("2d");

var velocity1_input = document.getElementById("velocity1_input");
var velocity2_input = document.getElementById("velocity2_input");

class Body {
    constructor(position, mass, velocity){
        this.position = position;
        this.color = 0;
        this.velocity = velocity;
        this.mass = mass;
        
    }

    drawObject() {
        this.radius = 10 + this.mass / 100 * 40 ;

        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.position, 150, this.radius, 0, 2 * Math.PI);
        context.fill();

        this.position += this.velocity;
    }
}

function IsColliding(obj1, obj2){
    return Math.abs(obj1.position - obj2.position) <= obj1.radius + obj2.radius;
}

function OnElasticCollisionWithObject(obj1, obj2){
    if (IsColliding(obj1, obj2)){
        var v1 = obj1.velocity;
        var v2 = obj2.velocity;
        obj1.position =  obj2.position - obj2.radius - obj1.radius;
        obj2.position = obj1.position + obj1.radius +  obj2.radius;

        obj1.velocity = (obj1.mass - obj2.mass) / (obj1.mass + obj2.mass) * v1 + (2 * obj2.mass) / (obj1.mass + obj2.mass) * v2;
        obj2.velocity = (2 * obj1.mass) / (obj1.mass + obj2.mass) * v1 + (obj2.mass - obj1.mass) / (obj1.mass + obj2.mass) * v2
    }
}

function OnInelasticCollisionWithObject(obj1, obj2){
    if (IsColliding(obj1, obj2)){
        var v1 = obj1.velocity;
        var v2 = obj2.velocity;
        obj1.position = obj2.position - obj2.radius - obj1.radius;
        obj2.position = obj1.position + obj1.radius +  obj2.radius;

        obj1.velocity = (obj1.mass * v1 + obj2.mass * v2) / (obj1.mass + obj2.mass);
        obj2.velocity = (obj1.mass * v1 + obj2.mass * v2) / (obj1.mass + obj2.mass);
    }
    
}

function OnElasticCollisionWithWall(obj){
    if (obj.position - obj.radius <= 0){
        obj.velocity = -obj.velocity;
        obj.position = obj.radius
    }
    else if (obj.position + obj.radius >= 800) {
        obj.velocity = -obj.velocity;
        obj.position = 800 - obj.radius;
    }
}

function OnInelasticCollisionWithWall(obj){
    if (obj.position - obj.radius <= 0){
        obj.velocity = 0;
        obj.position = obj.radius
    }
    else if (obj.position + obj.radius >= 800) {
        obj.velocity = 0;
        obj.position = 800 - obj.radius;
    }
}

const obj1 = new Body(150, 10, 0);
const obj2 = new Body(650, 10, 0);

obj1.drawObject();
obj2.drawObject();

function updateScreen(){
    context.clearRect(0, 0, 800, 300);

    
    obj1.color = document.getElementById("color1_input").value;
    obj2.color = document.getElementById("color2_input").value;

    obj1.drawObject();
    obj2.drawObject();

    
    if (running){
        if (document.getElementById("elastic_check_box").checked == true){
            OnElasticCollisionWithObject(obj1, obj2);
            OnElasticCollisionWithWall(obj1);
            OnElasticCollisionWithWall(obj2);
        }
        else {
            OnInelasticCollisionWithObject(obj1, obj2);
            OnInelasticCollisionWithWall(obj1);
            OnInelasticCollisionWithWall(obj2);
        }

        velocity1_input.value = obj1.velocity.toFixed(2);
        velocity2_input.value = obj2.velocity.toFixed(2);
        
    }
}

setInterval(updateScreen, 20);