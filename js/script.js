let scene, camera, renderer, cloudParticles = [] ;

function init() {
  scene = new THREE.Scene();
  // scene.background = new THREE.Color('gray')
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  camera.position.x = 1.16;
  camera.position.y = 150;
  camera.position.z = 0.27;

  ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);
  directionalLight = new THREE.DirectionalLight(0xffeedd);
  scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  let loader = new THREE.TextureLoader();
  loader.load("smoke.jpg", function(texture) {
    cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
    });

    for (let p = 0; p < 25; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        500,
        Math.random() * 500 - 450
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 360;
      cloud.material.opacity = 0.6;
      cloudParticles.push(cloud)
      scene.add(cloud);
    }
    animate()
  });

  function animate() {
      cloudParticles.forEach(p => {
          p.rotation.z -= 0.002;
      });
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
  }
}



init();
renderer.render(scene, camera);
