function randmap(){
    if(random() > 0.5)
        return map1();
    else
        return map2();
}

function map1(){
    var map = [];
    map.push(new Wall(width/2, 0, width/2, 20));
    map.push(new Wall(width/2, height, width/2, 20));
    map.push(new Wall(0, height / 2, 20, height / 2));
    map.push(new Wall(width, height/2, 20, height/2));
    for(var i = 0; i < width; i += 200){
        for(var j = 0; j < height; j += 200){
            if(random() > 0.75){
                map.push(new Wall(i, j, 10, 50));
                map.push(new Wall(i, j, 50, 10));
            }
            else if(random() > 0.67){
                map.push(new Wall(i, j, 10, 10));
            }
        }
    }
    return map;
}

function map2() {
    var map = [];
    map.push(new Wall(width / 2, 0, width / 2, 20));
    map.push(new Wall(width / 2, height, width / 2, 20));
    map.push(new Wall(0, height / 2, 20, height / 2));
    map.push(new Wall(width, height / 2, 20, height / 2));
    
    for (var i = 0; i < width; i += 200) {
        for (var j = 0; j < height; j += 200) {
            if(random() > 0.8)
                map.push(new Wall(i, j, 10, 10));
            else if (random() > 0.5)
                map.push(new Wall(i, j, 10, 80));
            else if (random() > 0)
                map.push(new Wall(i, j, 80, 10));
        }
    }
    return map;
}