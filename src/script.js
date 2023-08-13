import * as BABYLON from "@babylonjs/core/Legacy/legacy";
import "./style.css";

const canvas = document.getElementById("webgl");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.2;

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    (3 * Math.PI) / 2,
    Math.PI / 2,
    4,
    BABYLON.Vector3.Zero(),
    scene
  );

  camera.position = new BABYLON.Vector3(-40, 20, -30);
  camera.attachControl(canvas, true);

  const wall = BABYLON.CreateCylinder("wall", {
    diameterTop: 20,
    diameterBottom: 16,
    height: 10,
    tessellation: 4,
  });

  let wallMaterial = new BABYLON.StandardMaterial("wall Material", scene);
  wallMaterial.diffuseTexture = new BABYLON.Texture(
    "https://media.istockphoto.com/id/497944862/photo/brick-wall.jpg?s=2048x2048&w=is&k=20&c=BBIvuEWC4eo2HOODDf3HA791iguyHRxxNCo9O31VYgA="
  );
  wall.material = wallMaterial;

  var grid = {
    h: 16,
    w: 16,
  };
  const ground = new BABYLON.MeshBuilder.CreateTiledGround("ground", {
    xmin: -50,
    zmin: -50,
    xmax: 50,
    zmax: 50,
    subdivisions: grid,
  });

  let grass = new BABYLON.StandardMaterial("Ground Material", scene);
  grass.diffuseTexture = new BABYLON.Texture(
    "https://static.vecteezy.com/system/resources/thumbnails/022/920/209/small/green-grass-texture-background-grass-garden-concept-used-for-making-green-background-football-pitch-grass-golf-green-lawn-pattern-textured-background-photo.jpg"
  );
  const multiGrass = new BABYLON.MultiMaterial("multi", scene);
  multiGrass.subMaterials.push(grass);
  ground.material = multiGrass;
  ground.material.backFaceCulling = false;

  const roof = BABYLON.CreateCylinder("roof", {
    diameterTop: 0,
    diameterBottom: 25,
    height: 4,
    tessellation: 4,
  });

  let roofMaterial = new BABYLON.StandardMaterial("Roof Material", scene);
  roofMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.2, 0.1);
  roof.material = roofMaterial;
  roof.material.backFaceCulling = false;

  roof.rotation.y = Math.PI / 4;
  wall.rotation.y = Math.PI / 4;

  wall.translate(
    new BABYLON.Vector3(0, 1, 0).normalize(),
    5,
    BABYLON.Space.WORLD
  );

  roof.translate(
    new BABYLON.Vector3(0, 1, 0).normalize(),
    11.5,
    BABYLON.Space.WORLD
  );

  var spotLight = new BABYLON.SpotLight(
    "spotLight",
    new BABYLON.Vector3(-9, 9, 0),
    new BABYLON.Vector3(0.5, -1, 0),
    (150 * Math.PI) / 180,
    2,
    scene
  );
  spotLight.diffuse = new BABYLON.Color3(0.98, 0.85, 0.2);

  spotLight.intensity = 0.7;

  spotLight.shadowEnabled = true;

  spotLight.excludedMeshes.push(ground);

  const door = BABYLON.MeshBuilder.CreatePlane(
    "door",
    { height: 7, width: 5 },
    scene
  );
  door.position.y = 3.5;
  door.position.x = -6.2;
  door.rotation.y = Math.PI / 2;
  door.rotation.x = -(8 * Math.PI) / 180;

  let doorMaterial = new BABYLON.StandardMaterial("wall Material", scene);
  doorMaterial.diffuseTexture = new BABYLON.Texture("door.jpg");
  doorMaterial.diffuseTexture.uScale = 0.6;
  doorMaterial.diffuseTexture.uOffset = 0.2;
  doorMaterial.specularIntensity = 0.3;
  doorMaterial.roughness = 0.5;
  door.material = doorMaterial;

  var greenMaterial = new BABYLON.StandardMaterial("mat1", scene);
  greenMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);

  var sphere1 = BABYLON.MeshBuilder.CreateSphere(
    "sphere1",
    { diameter: 3, segments: 32 },
    scene
  );
  sphere1.material = greenMaterial;
  sphere1.position = new BABYLON.Vector3(-7, 1.5, -3);

  var sphere2 = BABYLON.MeshBuilder.CreateSphere(
    "sphere2",
    { diameter: 1.5, segments: 32 },
    scene
  );
  sphere2.position = new BABYLON.Vector3(-7, 1.5, -4.5);
  sphere2.material = greenMaterial;
  var mesh = BABYLON.Mesh.MergeMeshes([sphere2, sphere1]);

  var sphere3 = BABYLON.MeshBuilder.CreateSphere(
    "sphere3",
    { diameter: 3, segments: 32 },
    scene
  );
  sphere3.material = greenMaterial;
  sphere3.position = new BABYLON.Vector3(-7, 1.5, 3);

  var sphere4 = BABYLON.MeshBuilder.CreateSphere(
    "sphere2",
    { diameter: 1.5, segments: 32 },
    scene
  );
  sphere4.position = new BABYLON.Vector3(-8, 0.5, 3);
  sphere4.material = greenMaterial;
  var mesh = BABYLON.Mesh.MergeMeshes([sphere3, sphere4]);

  BABYLON.ParticleHelper.CreateAsync("rain", scene, false).then((set) => {
    set.start();
  });

  scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
  scene.fogColor = scene.clearColor;
  scene.fogStart = -20;
  scene.fogEnd = 80.0;

  var pointLight1 = new BABYLON.PointLight(
    "pointLight1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  

  pointLight1.diffuse = new BABYLON.Color3(82 / 255, 183 / 255, 227 / 255);
  pointLight1.specular = new BABYLON.Color3(82 / 255, 183 / 255, 227 / 255);

  pointLight1.intensity = 1;

  pointLight1.excludedMeshes.push(ground);

  var pointLight2 = new BABYLON.PointLight(
    "pointLight2",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  pointLight2.diffuse = new BABYLON.Color3(127 / 255, 50 / 255, 168 / 255);
  pointLight2.specular = new BABYLON.Color3(127 / 255, 50 / 255, 168 / 255);
  pointLight2.intensity = 1;
  pointLight1.excludedMeshes.push(door, wall);
  pointLight2.excludedMeshes.push(door, wall);

  var direction = true;

  let instanceCount = 50;
  for (var index = 0; index < instanceCount; index++) {
    let instance = BABYLON.MeshBuilder.CreateBox(
      "box" + index,
      { height: 3, width: 3, depth: 0.5 },
      scene
    );
    let x = 40 - Math.random() * 80;
    let z = 40 - Math.random() * 80;
    if (x > 0) {
      pointLight2.excludedMeshes.push(instance);
    } else {
      pointLight1.excludedMeshes.push(instance);
    }
    instance.position.x = x;
    instance.position.y = 1.5;
    instance.position.z = z;
    instance.rotation.z = Math.random(-10, 10) / 5;
    instance.alwaysSelectAsActiveMesh = true;
    spotLight.excludedMeshes.push(instance);
  }

  scene.registerBeforeRender(function () {
    const positionZ = pointLight1.position.z;
    const positionX = Math.sin(pointLight1.position.z / 5) * 5;
    if (positionZ < 30 && direction) {
      pointLight1.position.x = positionX + 25;
      pointLight1.position.z = positionZ + 0.1;
      pointLight2.position.z = positionZ + 0.1;
      pointLight2.position.x = positionX - 25;
    } else {
      direction = false;
    }

    if (positionZ > -30 && !direction) {
      pointLight1.position.x = positionX + 25;
      pointLight1.position.z = positionZ - 0.1;
      pointLight2.position.z = positionZ - 0.1;
      pointLight2.position.x = positionX - 25;
    } else {
      direction = true;
    }
  });

  return { scene };
};
const { scene } = createScene();

let time = Date.now();
engine.runRenderLoop(function () {
  scene.render();
});

const onResize = () => {
  canvas.width = getWidth();
  engine.resize();
};

window.addEventListener("resize", onResize);
