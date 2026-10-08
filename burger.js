var scene, camera, renderer, clock, mixer, actions=[], mode, isWireframe= false;
let loadedModel;
let sound, secondSound;
init();

function init() {

   const assetPath =  './';
   clock = new THREE.Clock();

   scene = new THREE.Scene();
   scene.background = new THREE.Color(0xfff2f2);

   const canvas = document.getElementById('threeContainer');
   const modelSection = document.querySelector('.model-section');
   const width = modelSection.clientWidth;
   const height = modelSection.clientHeight;

   camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
   camera.position.set(-34, 2, 25);
   
   renderer = new THREE.WebGLRenderer({ canvas: canvas });
   renderer.setSize(width, height);
   onResize();

   const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
   scene.add(ambient);

   const light = new THREE.DirectionalLight(0xffffff, 2);
   light.position.set(10, 10, 28);
   scene.add(light);

   const controls = new THREE.OrbitControls(camera, renderer.domElement);
   controls.target.set(1, 1, 0);
   controls.minDistance =4;
   controls.maxDistance = 7;
   controls.update();


   

   mode = 'add';
   const btn = document.getElementById("btn");
   btn.addEventListener('click', function(){

    if (actions.length > 0){
        if (mode === "add"){
            actions.forEach(action =>{
                action.timeScale = 1;
                action.reset();
                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;  
                action.play();  
        if (sound.isPlaying) sound.stop();
            sound.play();  
            });
        }
    }
   });


   //Adding a wireframe button logic
const wireframebtn = document.getElementById('toggleWireframe');
wireframebtn.addEventListener('click', function() {
    isWireframe = !isWireframe;
    toggleWireframe(isWireframe);
});


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
   
 
   //load the GLTF model
    const loader = new THREE.GLTFLoader();
    loader.load(assetPath + 'assets/3D/add potato.glb', function(gltf){
    const model = gltf.scene;
    scene.add(model);
    loadedModel = model;


    mixer = new THREE.AnimationMixer(model);
    const animations = gltf.animations;

    animations.forEach(clip => {
        const action = mixer.clipAction(clip);
        actions.push(action);
    });
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



function toggleWireframe(enable) {
    scene.traverse(function(object)
{
    if (object.isMesh){
        object.material.wireframe = enable;
    }
});
   }





