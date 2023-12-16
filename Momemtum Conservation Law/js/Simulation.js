var container = document.getElementById("container");
var context = container.getContext("2d");

class Body {
    constructor(position, mass, color, velocity){
        this.position = position;
        this.color = color;
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

function OnElasticCollisionWithObject(obj1, obj2){
    if (obj1.position + obj1.radius >= obj2.position - obj2.radius){
        var v1 = obj1.velocity;
        var v2 = obj2.velocity;
        obj1.position =  obj2.position - obj2.radius - obj1.radius;
        obj2.position = obj1.position + obj1.radius +  obj2.radius;

        obj1.velocity = (obj1.mass - obj2.mass) / (obj1.mass + obj2.mass) * v1 + (2 * obj2.mass) / (obj1.mass + obj2.mass) * v2;
        obj2.velocity = (2 * obj1.mass) / (obj1.mass + obj2.mass) * v1 + (obj2.mass - obj1.mass) / (obj1.mass + obj2.mass) * v2
    }console.log(obj1.velocity, obj2.velocity);
}

function OnInelasticCollisionWithObject(obj1, obj2){
    if (obj1.position + obj1.radius >= obj2.position - obj2.radius){
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

const obj1 = new Body(150, 10, 'red', 0);
const obj2 = new Body(650, 10, 'orange', 0);

obj1.drawObject();
obj2.drawObject();

function updateScreen(){
    context.clearRect(0, 0, 800, 300);
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
        document.getElementById("velocity1_number").value = obj1.velocity.toFixed(2);
        document.getElementById("velocity2_number").value = obj2.velocity.toFixed(2);
    }
}

setInterval(updateScreen, 20);