import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import nipplejs from "nipplejs";

document.body.style.overflow = "hidden";
// const gui = new dat.GUI();

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();



/**
 * Models
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

let mixer = null;
var sizee=0


if(screen.width>700){
sizee=150;
}
if(screen.width < 700){
    sizee=250
    }

   
    // document.querySelector('html').classList.add('is-ios');
//joystick
var options = {
  zone: document.getElementById("zone"),
  mode: "static",
  position: { left: "50%", top: "80%" },
  color: "white",
  size: sizee,
};
var ala=null
var joyManager = nipplejs.create(options);
var up = false;
var down = false;
var left = false;
var right = false;
joyManager.on("move", function (evt, data) {
    ala=data
  var forward = data.vector.y;
  var turn = data.vector.x;
  if (forward !== 0 ) {up=true }})
  
 

joyManager.on("end", function (evt) {
  up = false;
  down = false;
  left = false;
  right = false;
  action.stop();
  action2.stop();

});
var action = null;
/// thhis is a cube i made , the cube will be the one moving and the model will be following it ps: notice that it's invisible
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
//threejs mesh
cube.scale.set(0.4, 1, 0.4);
cube.position.set(0, 0, 0);

scene.add(cube);
cube.visible = false;
const dudeWrapper=new THREE.Mesh(geometry, material);
//threejs mesh
dudeWrapper.scale.set(0.3, 1.5, 0.3);
dudeWrapper.visible = false;
scene.add(dudeWrapper);
var dude = null; //this variable so i can take the model outisde of the scope to use it later
var action2=null
var action3=null

const titleWrapper=new THREE.Mesh(geometry, material);
//threejs mesh
titleWrapper.scale.set(1.5, 0.1, 0.7);
titleWrapper.rotation.y = 0.545;
titleWrapper.position.set(-1.13, -0.03, -2);
titleWrapper.visible = false;
scene.add(titleWrapper);


gltfLoader.load(
  "/models/Adam/Adam.gltf",

  (gltf1) => {
    dude = gltf1.scene; // give it the gltf1 scene
    gltf1.scene.traverse(function (object) {
      if (object.isMesh) object.castShadow = true;
    });
    gltf1.scene.scale.set(2, 2, 2);
    gltf1.scene.position.copy(cube.position); //now the model will be following the cube's position using the copy method
    scene.add(gltf1.scene);
    // Animation
    mixer = new THREE.AnimationMixer(gltf1.scene);
    action = mixer.clipAction(gltf1.animations[0]);


    const dracoLoaderThree = new DRACOLoader();
 dracoLoaderThree.setDecoderPath("/draco/");
 
 const gltfLoaderThree = new GLTFLoader();
 gltfLoaderThree.setDRACOLoader(dracoLoaderThree);
 


 gltfLoaderThree.load(
  '/models/Winston/scene.gltf',
    
     (gltf) =>
     {
         gltf.scene.traverse( function ( object ) {
 
             if ( object.isMesh ) object.castShadow = true;
          
            
         } );
         gltf.scene.scale.set(.025, .025, .025)
         dude.add(gltf.scene)
       
         
         gltf.scene.position.set(-0.2, 0, -.5)
        //  gltf.scene.rotation.y = 0
   
 
         // Animation
         mixerThree = new THREE.AnimationMixer(gltf.scene)
          action2 = mixerThree.clipAction(gltf.animations[10])
          action3 = mixerThree.clipAction(gltf.animations[0])
         
     }
 )
  }
);






/**
 * Models
 */
const dracoLoaderTwo = new DRACOLoader();
dracoLoaderTwo.setDecoderPath("/draco/");

const gltfLoaderTwo = new GLTFLoader();
gltfLoaderTwo.setDRACOLoader(dracoLoaderTwo);

gltfLoaderTwo.load(
  "/models/Title/Title.gltf",

  (gltf) => {
    gltf.scene.traverse(function (object) {
      if (object.isMesh) object.castShadow = true;
    });
    gltf.scene.scale.set(1.5, 1.5, 1.5);
    gltf.scene.rotation.y = 0.545;

    gltf.scene.position.set(-1.13, -0.03, -1.8);
    scene.add(gltf.scene);
  }
);


//static/

let mixerThree = null;

/**
 * Models
 */
 

//raycaster
const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once



function intersect(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(dudeWrapper);
}
function intersection(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(titleWrapper);
}


window.addEventListener('mousedown', event => {



// THREE RAYCASTER
clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


const found = intersect(clickMouse);
const titleFound=intersection(clickMouse)
if(titleFound.length>0){
  window.open("https://www.google.com");
}
if(found.length>0){
  
  const listener = new THREE.AudioListener();

    const audio = new THREE.Audio( listener );
    const file = './Am ADAM.m4a';

    if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {
      
        const loader = new THREE.AudioLoader();
        loader.load( file, function ( buffer ) {

            audio.setBuffer( buffer );
            audio.play();

        } );

    } 
    else {

        const mediaElement = new Audio( file );
        mediaElement.play();

        audio.setMediaElementSource( mediaElement );

    }


	}
});
//ios eventlistner
window.addEventListener('touchstart', event => {



  // THREE RAYCASTER
  clickMouse.x = (event.pageX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.pageY / window.innerHeight) * 2 + 1;
  
  
  const found = intersect(clickMouse);
  const titleFound=intersection(clickMouse)
  if(titleFound.length>0){
    window.location.href = "https://www.google.com";
    
  }
  if(found.length>0){
    
    const listener = new THREE.AudioListener();
  
      const audio = new THREE.Audio( listener );
      const file = './Am ADAM.m4a';
  
    
  
          const mediaElement = new Audio( file );
          mediaElement.play();
  
          audio.setMediaElementSource( mediaElement );
  
  
  
  
    }
  });





/**
 * Camera
 */

var camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
camera.position.set(2, 3, 2);

/**
 * Lights
 */

// Ambient light
const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 0.5;
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1);
scene.add(hemisphereLight);

// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

// Rect area light
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
rectAreaLight.position.set(6, 10, 0);
// rectAreaLight.lookAt(new THREE.Vector3(-0.5,0,1))
scene.add(rectAreaLight);

// // Spot light
// const spotLight = new THREE.SpotLight(0xffffff, 1, 10, Math.PI * 0.2, 0.25, 1)
// spotLight.position.set(4, 6.5, 3)
// scene.add(spotLight)

// spotLight.target.position.x = - 0.75
// spotLight.castShadow = true

// scene.add(spotLight.target)

// // Spot light

const spotLightTwo1 = new THREE.SpotLight(
  0x00ffff,
  0.2,
  10,
  Math.PI * 0.2,
  0.25
);
spotLightTwo1.position.set(2, 3, 1);
spotLightTwo1.lookAt(new THREE.Vector3((-0.5, 0, 1)));

scene.add(spotLightTwo1);
// spotLightTwo.lookAt(new THREE.Vector3((-0.5,0,1)))

const spotLightTwo = new THREE.PointLight(
  0x00ffff,
  0.2,
  10,
  Math.PI * 0.2,
  0.25
);
spotLightTwo.position.set(2, 3, 1);
//here i added the light as a child for the camera so it will follow the camera's movment
camera.add(spotLightTwo);
scene.add(camera);
// spotLightTwo.lookAt(new THREE.Vector3((-0.5,0,1)))
spotLightTwo.castShadow = true;

const spotLightHelper = new THREE.PointLightHelper(spotLightTwo);
scene.add(spotLightHelper);

// // Helpers
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
// scene.add(hemisphereLightHelper)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
// scene.add(directionalLightHelper)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
// scene.add(pointLightHelper)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)

// Spot light3
const spotLightThree = new THREE.SpotLight(0xffffff, 1, 3, Math.PI * 0.2, 0.25);
spotLightThree.position.set(-2.6, 1.3, -4.2);
scene.add(spotLightThree);
// spotLightThree.lookAt(new THREE.Vector3((-0.8,1,1)))
spotLightThree.castShadow = true;

/**
 * Floor
//  */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(1600, 1600),
  new THREE.MeshStandardMaterial({
    color: 0xffff0f,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.background = new THREE.Color(0xeaf0f2);
scene.add(floor);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Controls
// const controls = new OrbitControls(camera, canvas)

// controls.enablePan = true
// controls.enableZoom = true
// // controls.target.set( 0, .5, 0 )
// controls.enableRotate = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.autoUpdate = true;
renderer.shadowMap.enabled = true;

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;
  //here we copy the cube's position and apply it to the model
  if (dude) dude.position.copy(cube.position);
  if (dude) dude.rotation.copy(cube.rotation);
  dudeWrapper.position.copy(cube.position);
  dudeWrapper.position.y=0.7
   dudeWrapper.rotation.copy(cube.rotation);
  // Model animation
  if (mixer) {
    //here we put the mouvment for the model with each diraction the joystick take
    mixer.update(deltaTime);
    // if (up === true) {
    
    //   action.play();
    //   action2.play()
    // }
  }
  if (up === true) {

    // cube.rotation.y=Math.PI-ala.angle.radian-0.5
    cube.rotation.y=ala.angle.radian+0.6595+Math.PI/2
        var speedFactor = 0.03;
  
    
        const direction = new THREE.Vector3();
    
        cube.getWorldDirection(direction);
        action.play();
      action2.play()
     

    
        cube.position.add(direction.multiplyScalar(speedFactor));
  }

  if (mixerThree) {
    mixerThree.update(deltaTime);
    action3.play()
  }
  // // Update controls
  // controls.update()

  camera.position.x = cube.position.x + 2;
  camera.position.z = cube.position.z + 2;
  camera.position.y = 3;
  camera.lookAt(cube.position);
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();