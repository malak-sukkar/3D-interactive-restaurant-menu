var scene, camera, renderer, clock, mixer, actions=[], mode, isWireframe= false;
let loadedModel;
let secondModelMixer, secondModelActions = [];
let secondSound;
init();

function init() {

   const assetPath =  './';
   clock = new THREE.Clock();

   scene = new THREE.Scene();
   scene.background = new THREE.Color(0xfff2f2)

   const canvas = document.getElementById('threeContainer');
   const modelSection = document.querySelector('.model-section');
   const width = modelSection.clientWidth;
   const height = modelSection.clientHeight;

   camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
   camera.position.set(0, 10, 12);
   
   renderer = new THREE.WebGLRenderer({ canvas: canvas });
   renderer.setSize(width, height);
   onResize();

   const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
   scene.add(ambient);

   const light = new THREE.DirectionalLight(0xffffff, 2);
   light.position.set(0, 20, -15);
   scene.add(light);

   const controls = new THREE.OrbitControls(camera, renderer.domElement);
   controls.target.set(0, 0, 0);
   controls.minDistance =8;
   controls.maxDistance = 16;
   controls.update();

    // Add audio  
    const listener = new THREE.AudioListener();
    camera.add(listener);
    secondSound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('assets/audio/happy-birthday.mp3', function (buffer){
        secondSound.setBuffer(buffer);
        secondSound.setLoop(false);
        secondSound.setVolume(1.0);
    }
);


   mode = 'strawberry';
   const btn = document.getElementById("btn");
   btn.addEventListener('click', function(){

    if (actions.length > 0){
        if (mode === "strawberry"){
            actions.forEach(action =>{
                action.timeScale = 1;
                action.reset();
                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;    
                action.play();  
        
            });
        }
    }
   });
 
const playSecondModelAnimationBtn = document.getElementById("playSecondModelAnimation");
playSecondModelAnimationBtn.addEventListener('click', function (){
    if (secondModelActions.length > 0) {
        secondModelActions.forEach(action => {
            action.timeScale = 1;
            action.reset();
            action.setLoop(THREE.LoopOnce);
            action.clampWhenFinished = true;
            action.play();
               if (secondSound.isPlaying) sound.stop();
        secondSound.play();
        });
    } else
    {
        console.warn('No animation available for the second model.');
    }
});

 
   //load the GLTF model
const loader = new THREE.GLTFLoader();
function loadModel(modelPath) {
    if(loadedModel){
        scene.remove(loadedModel);
    }


loader.load(modelPath, function(gltf) 
{
    const model = gltf.scene;

model.position.set(0, 0, 0);
    scene.add(model);

    loadedModel = model;

    mixer = new THREE.AnimationMixer(model);
    const animations = gltf.animations;
    actions = [];

    animations.forEach(clip => {
        const action = mixer.clipAction(clip);
        actions.push(action);
    });

    if (modelPath === 'assets/3D/cake_with_candle.glb'){
        secondMixer = mixer;
        secondModelActions = actions;
    }
});
}


loadModel('assets/3D/strawberry-cake.glb');

const switchBtn = document.getElementById("switchModel");
switchBtn.addEventListener('click', function () {
    if (mode === 'strawberry'){
         loadModel('assets/3D/cake_with_candle.glb');
         mode = 'candle';
    }
    else{
        loadModel('assets/3D/strawberry-cake.glb');
        mode = 'strawberry';
    }
});

   window.addEventListener('resize', onResize, false);

    animate();

}

function animate(){
    requestAnimationFrame(animate);
    if (mixer){
        mixer.update(clock.getDelta());

    }
    
    renderer.render(scene,camera);
}

function onResize(){
    const modelSection = document.querySelector('.model-section');
    const width = modelSection.clientWidth;
    const height = modelSection.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

//Adding a wireframe button logic
const wireframebtn = document.getElementById('toggleWireframe');
wireframebtn.addEventListener('click', function() {
    isWireframe = !isWireframe;
    toggleWireframe(isWireframe);
});

function toggleWireframe(enable) {
    scene.traverse(function(object)
{
    if (object.isMesh){
        object.material.wireframe = enable;
    }
});
}

// Add rotation button logic
const rotateBtn = document.getElementById('rotate');
rotateBtn.addEventListener('click', function(){
    if (loadedModel){
        const axis = new THREE.Vector3(0,1,0);
        const angle = Math.PI / 8;
        loadedModel.rotateOnAxis(axis, angle);
    } else{
        console.warn('Model not loaded yet.');
    }
});