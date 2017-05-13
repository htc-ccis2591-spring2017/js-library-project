/* CCIS 2591 - JavaScript
    Library Project - THREE.JS
    Cheryl Davis
*/
$(document).ready(function(){
  document.body.style.backgroundImage = "url('images/BlueAbstract.jpg')";
  let myHeading = "<div id='heading'><h1>Cheryl's Three.js Demo</h1></div>";
  $("body").append(myHeading);
  $("#heading h1").css("color", "#ffd700");
  makePage();
  $("#spaceImg").on("mouseover", function(){
    let message = "Click to experience a moveable scene. Click and drag to look around. Click the cube to change it's look. Double-click the planet or Borg to watch them explode!"
    createPopUp(message);
  });
  $("#spaceImg").on("mouseout", function(){$("#message").remove();});
  $("#coinImg").on("mouseover", function(){
    let message = "Flip a 3D coin. Click and hold to spin. Try moving the mouse at same time. Release for random heads or tails."
    createPopUp(message);
  });
  $("#coinImg").on("mouseout", function(){$("#message").remove();});
  $("#spaceImg").on("click", function(){
    $("#stage").remove();
      spaceScene();
      createHome();
      $("#homeBtn").on("click", function(){
        window.location.reload();
    });
  });
  $("#coinImg").on("click", function(){
    $("#stage").remove();
      coinFlipper();
      createHome();
      $("#homeBtn").on("click", function(){
        window.location.reload();
      });
  });
})
//creates space scene with rotation, and particle anaimation
function spaceScene(){
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.1, 3000);
    camera.position.z = 100;
  let renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 1.0);
      renderer.setPixelRatio(window.devicePixelRatio);
      document.body.appendChild(renderer.domElement);
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  addStars(scene);
  //creates cube object and adds it to the scene
  let cubeGeometry = new THREE.BoxGeometry(200, 200, 200); //defines the object shape
  let cubeMaterial = new THREE.MeshLambertMaterial({ //defines the object's substance
    color: 0xf5deb3,
    map: new THREE.TextureLoader().load("images/borg-cube.jpg") //maps jpg turning simple cube into Borg
  });
  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -300;
    cube.position.y = -100;
    cube.position.z = -1000;
    cube.rotation.x = .1;
  scene.add(cube);
  //creates planet and adds it to the scene
  let planet1Geometry = new THREE.SphereGeometry(100, 100, 100);
  let planet1Material = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('images/lavatile.jpg')});
  let planet1 = new THREE.Mesh(planet1Geometry, planet1Material);
    planet1.position.x = 250;
    planet1.position.y = 50;
    planet1.position.z = -550;
  scene.add(planet1);
  //creates second planet and adds to scene
  let planet2Geometry = new THREE.SphereGeometry(10, 10, 10);
  let planet2Material = new THREE.MeshPhongMaterial({color: 0x00ced1});
  let planet2 = new THREE.Mesh(planet2Geometry, planet2Material);
    planet2.position.x = -50;
    planet2.position.y = 150;
    planet2.position.z = -500;
  scene.add(planet2);
  //create space station
  let torGeometry = new THREE.TorusGeometry( 50, 25, 50, 25 );
  let torTexture = new THREE.TextureLoader().load("images/spacesta.jpg");
    torTexture.wrapS = THREE.RepeatWrapping;
    torTexture.wrapT = THREE.RepeatWrapping;
    torTexture.repeat.set(2,2,1);
  let torMaterial = new THREE.MeshPhongMaterial({
     color: 0xb0c4de,
     map: torTexture,
   });
  let torus = new THREE.Mesh( torGeometry, torMaterial );
    torus.position.x = -250;
    torus.position.y = 100;
    torus.rotation.y = 10;
    scene.add( torus );
    //giving objects lighting helps define dimensions
  let ambLight = new THREE.AmbientLight(0xffffff, 0.5); //lights the entire scene
  scene.add(ambLight);
  let dirLight = new THREE.DirectionalLight(0x6b8e23, .5, 500); //light specifically set on a target
  dirLight.target = cube;
  scene.add(dirLight);
  //makes the scene resizable
  window.addEventListener('resize', function() {
    let width = window.innerWidth,
        height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix(); //refreshes the renderer
  });
  //changes the cube texture when clicked
  let counter = 1;
  $(renderer.domElement).on("click",function(event){
    let x = (event.clientX / window.innerWidth) * 2 - 1,
        y = -(event.clientY / window.innerHeight) * 2 + 1,
        dir = new THREE.Vector3(x, y, -1);
        dir.unproject(camera)
    let ray = new THREE.Raycaster(camera.position, dir.sub(camera.position).normalize())
    let clicked = ray.intersectObject(cube);
    if (clicked.length > 0){
      let borg2 = new THREE.TextureLoader().load("images/borg2.jpg"),
          borg1 = new THREE.TextureLoader().load("images/borg-cube.jpg"),
          blue = new THREE.TextureLoader().load("images/circuit.jpg"),
          lava = new THREE.TextureLoader().load("images/lavatile.jpg"),
          station = new THREE.TextureLoader().load("images/spacesta.jpg");
      let textures = [borg1, borg2, blue, lava, station];
            console.log(counter);
      if (counter < 5) {
        let newTexture = textures[counter];
          cube.material.map = newTexture;
          cube.material.needsUpdate = true;
          counter = counter + 1;
     }
     else{
       counter = 0;
       cube.material.map = new THREE.TextureLoader().load("images/crate.gif")
       cube.material.needsUpdate = true;
     }
   }
})
  $(renderer.domElement).on("dblclick", function(event) {
      let x = (event.clientX / window.innerWidth) * 2 - 1,
          y = -(event.clientY / window.innerHeight) * 2 + 1,
          dir = new THREE.Vector3(x, y, -1);
          dir.unproject(camera)
      let ray = new THREE.Raycaster(camera.position, dir.sub(camera.position).normalize())
      let clickPlanet1 = ray.intersectObject(planet1);
      let clickCube = ray.intersectObject(cube);
      if ( clickPlanet1.length > 0 ) {
        scene.remove(planet1);
        let sprite = new THREE.TextureLoader().load("images/flame.jpg");
        explodeAnimation(sprite);
      }
      else if (clickCube.length > 0) {
        scene.remove(cube);
        let sprite = new THREE.TextureLoader().load("images/bits.jpg");
        explodeAnimation(sprite);
      }
  });
  //works with OrbitControls to make scene movable with mouse click & drag
  let animate = function() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  //renders the graphics on the page and provides animation loop
  function render(){
    planet1.rotation.y += 0.001;
    torus.rotation.z += .0005;
      requestAnimationFrame (render);
      renderer.render(scene, camera);
  }
  render();
  animate();

  //creates 3D explosion using particle mapped with sprite images
  function explodeAnimation(sprite){
    let movementSpeed = 70;
    let totalObjects = 1000;
    let objectSize = 10;
    let sizeRandomness = 4000;
    let dirs = [];
    let parts = [];
    let explode = function(x,y) {
      let geometry = new THREE.Geometry();
      for (i = 0; i < totalObjects; i ++){
        let vertex = new THREE.Vector3();
        vertex.x = x;
        vertex.y = y;
        vertex.z = 0;
        geometry.vertices.push(vertex);
        dirs.push({x:(Math.random() * movementSpeed)-(movementSpeed/2),y:(Math.random() * movementSpeed)-(movementSpeed/2),z:(Math.random() * movementSpeed)-(movementSpeed/2)});
      }
      let material = new THREE.PointsMaterial({size: objectSize, map: sprite});
      let particles = new THREE.Points(geometry, material);
      this.object = particles;
      this.status = true;
      this.xDir = (Math.random() * movementSpeed)-(movementSpeed/2);
      this.yDir = (Math.random() * movementSpeed)-(movementSpeed/2);
      this.zDir = (Math.random() * movementSpeed)-(movementSpeed/2);
      scene.add(this.object);
      this.update = function(){
        if (this.status == true){
          let pCount = totalObjects;
          while(pCount--) {
            let particle =  this.object.geometry.vertices[pCount]
            particle.y += dirs[pCount].y;
            particle.x += dirs[pCount].x;
            particle.z += dirs[pCount].z;
          }
          this.object.geometry.verticesNeedUpdate = true;
        }
      }
    } //end explode
      parts.push(new explode(0, 0));
      let renderAgain = function() {
          requestAnimationFrame (renderAgain);
          let pCount = parts.length;
            while(pCount--) {
                parts[pCount].update();
              }
            renderer.render(scene, camera);
          }
      renderAgain();
  }//end explodeAnimation
} //end spaceScene
  //creates a star field in the background
  function addStars(scene){
    let starsGeometry = new THREE.Geometry();
    for ( let i = 0; i < 10000; i ++ ) {
      let star = new THREE.Vector3();
      star.x = THREE.Math.randFloatSpread( 2000 );
      star.y = THREE.Math.randFloatSpread( 2000 );
      star.z = THREE.Math.randFloatSpread( 2000 );
      starsGeometry.vertices.push( star )
    }
    let starsMaterial = new THREE.PointsMaterial({
      color: 0x888888,
      size: 1.5
    });
    let starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
  } //end addStars
//creates three.js scene which coin flip animation
function coinFlipper(){
    let spin = "false";
    let bgTexture = new THREE.TextureLoader().load("images/LtBlue.jpg");
      bgTexture.wrapS = THREE.RepeatWrapping;
      bgTexture.wrapT = THREE.RepeatWrapping;
    let scene = new THREE.Scene();
      scene.background = bgTexture;
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.1, 3000);
      camera.position.z = 75;
    let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    //make quarter
    let qtrGeometry = new THREE.CylinderGeometry(15,15,1.5,50,false),
        qtrMat = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('images/coins/QuarterFrt.png')}),
        coin = new THREE.Mesh(qtrGeometry, qtrMat);
        coin.rotation.x = 1.5;
        coin.rotation.y = 1.55;
    scene.add(coin);
    let ambLight = new THREE.AmbientLight(0xffffff, .75); //lights the entire scene
      scene.add(ambLight);
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
  //makes the scene resizable
  window.addEventListener('resize', function() {
    let width = window.innerWidth,
        height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix(); //refreshes the renderer
  });
  let animate = function() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  function coinFlip() {
      return (Math.floor(Math.random() * 2) == 0);
  }
  function flipCoin(){
    if (coinFlip() == false){
     coin.material.map = new THREE.TextureLoader().load("images/coins/QuarterBk.jpg");
     coin.material.needsUpdate = true;
    }
   else {
     coin.material.map = new THREE.TextureLoader().load("images/coins/QuarterFrt.png");
     coin.material.needsUpdate = true;
    }
  }//end flipCoin
  //spins coin on mousedown
   $(renderer.domElement).on("mousedown", function(event){
     x = (event.clientX / window.innerWidth) * 2 - 1;
     y = -(event.clientY / window.innerHeight) * 2 + 1;
     dir = new THREE.Vector3(x, y, -1)
     dir.unproject(camera)
     ray = new THREE.Raycaster(camera.position, dir.sub(camera.position).normalize())
     let clickCoin = ray.intersectObject(coin);
     if (clickCoin.length > 0 ) {
        spin = "true"
        coin.material.map = new THREE.TextureLoader().load("images/coins/quarter.png");
        coin.material.needsUpdate = true;
       }
   });//end onClickFunction
   $(renderer.domElement).on("mouseup", function(event){
     spin = "false";
     flipCoin();
     camera.position.set(0,0,75);
     coin.rotation.x = 1.5;
     coin.rotation.y = 1.55;
  });
  //renders the graphics on the page and provides animation loop
    function render(){
      if (spin =="true"){
        coin.rotation.x += 1;
        coin.rotation.y += 1;
      }
      requestAnimationFrame (render);
      renderer.render(scene, camera);
    }
    render();
    animate();
}//end coinFlipper
function createHome(){
  let homeBtn = document.createElement("BUTTON");
    homeBtn.id = "homeBtn";
    homeBtn.style.cssText = "background-color:cyan;font-size:15px;color:black";
  let btnText = document.createTextNode("Home");
  homeBtn.appendChild(btnText);
  $("#heading h1").after(homeBtn);
}
function makePage(){
  let newDiv = document.createElement("DIV");
  newDiv.id = "stage";
  document.getElementById("heading").appendChild(newDiv);
let spaceImg = document.createElement("img");
  spaceImg.id = "spaceImg";
  spaceImg.src = "images/myscene.jpg";
  document.getElementById("stage").appendChild(spaceImg);
let coinImg = document.createElement("img");
  coinImg.id = "coinImg";
  spaceImg.style.cssText = "float:left;margin-right:50px";
  coinImg.src = "images/coinflip.jpg";
  document.getElementById("stage").appendChild(coinImg);
}
function createPopUp(comment){
  let newDiv = document.createElement("DIV");
    newDiv.id = "message";
    newDiv.class = "alert";
    newDiv.style.cssText = "padding:20px;background-color:blue;color:white;font-size:20px;margin-bottom:20px";
    let newText = document.createTextNode(comment)
    newDiv.appendChild(newText);
    document.getElementById("stage").appendChild(newDiv);
}
