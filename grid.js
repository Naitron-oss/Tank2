function randmap(){
    if(random() > 0.5)
        return map1();
    else
        return map2();
}

function map1(){
    var map = [];
    for(var i = -10; i < width; i += 300){
        for(var j = -10; j < height; j += 300){
            if(random() > 0.67){
                map.push(new Wall(i, j, 20, 80));
                map.push(new Wall(i, j, 80, 20));
            }
            else if(random() > 0.67){
                map.push(new Wall(i, j, 10, 10, -1.5, 'blue'));
            }
        }
    }
    map.push(new Wall(width/2, -10, width/2, 20));
    map.push(new Wall(width/2, height+10, width/2, 20));
    map.push(new Wall(-10, height / 2, 20, height / 2));
    map.push(new Wall(width+10, height/2, 20, height/2));
    return map;
}

function map2() {
    var map = [];
    
    for (var i = -10; i < width; i += 250) {
        for (var j = -10; j < height; j += 250) {
            if(random() > 0.8)
                map.push(new Wall(i, j, 10, 10, -1.5, 'blue'));
            else if (random() > 0.5)
                map.push(new Wall(i, j, 20, 90));
            else if (random() > 0)
                map.push(new Wall(i, j, 90, 20));
        }
    }
    map.push(new Wall(width / 2, -10, width / 2, 20));
    map.push(new Wall(width / 2, height + 10, width / 2, 20));
    map.push(new Wall(-10, height / 2, 20, height / 2));
    map.push(new Wall(width + 10, height / 2, 20, height / 2));
    return map;
}