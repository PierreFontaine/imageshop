/*
 * UV_mapping_three.js
 */

'use strict';

/** GENERAL NOTE *****************************************************************************************************************/
/** Please choose between RequireJS and Browserify solutions below (toggle/untoogle statements in 'index.html' file accordingly! */
/** End of GENERAL NOTE **********************************************************************************************************/

/** Browserify -> -> 'sweetalert2.min.js' and 'three.min.js' locations are those of npm
 * npm install browserify (from 'index.html' directory location) -> to be done before business libraries! Why?
 * npm install -D browserify-shim (-D -> development dependencies)
 * npm install sweetalert2 (from 'index.html' directory location)
 * npm install three (from 'index.html' directory location)
 * npm list --depth=0   
 */
//var Authoring = require('Authoring');
//require('SoundJS');
//window.swal = require('sweetalert2');
//window.THREE = require('three');
//
//Object.defineProperty(window, "Applause", {value: new Promise(send => {
//        createjs.Sound.on("fileload", event => {
//            send(createjs.Sound.createInstance("sounds/Applause.mp3"));
//        });
//        createjs.Sound.registerSound("sounds/Applause.mp3", "sounds/Applause.mp3");
//    }), enumerable: false, configurable: false, writable: false});
//
//window.DOM_ready.then(value => {// Anonymous function as parameter of 'then'. This function has itself 'value' as parameter...
//    document.body.innerWidth = 800;
//    document.body.innerHeight = 600;
//    new UV_mapping_illustration();
//});
/** End of Browserify */

/** RequireJS -> 'sweetalert2.min.js' and 'three.min.js' locations are those of npm 
 * npm install sweetalert2 (from 'index.html' directory location)
 * npm install three (from 'index.html' directory location)
 * npm list --depth=0
 */
requirejs(['../node_modules/sweetalert2/dist/sweetalert2.min', '../node_modules/three/build/three.min', './Authoring', './SoundJS/soundjs-0.6.2.min'], function (swal, three) {
    window.swal = swal; // Global to be accessed in './Authoring.js'
    window.THREE = three;

    Object.defineProperty(window, "Applause", {value: new Promise(send => {
            createjs.Sound.on("fileload", event => {
                send(createjs.Sound.createInstance("sounds/Applause.mp3"));
            });
            createjs.Sound.registerSound("sounds/Applause.mp3", "sounds/Applause.mp3");
        }), enumerable: false, configurable: false, writable: false});

    window.DOM_ready.then(value => {// Anonymous function as parameter of 'then'. This function has itself 'value' as parameter...
        document.body.innerWidth = 800;
        document.body.innerHeight = 600;
        new UV_mapping_illustration();
    });
});
/** End of RequireJS */

var UV_mapping_illustration = function (author) {
    this._authoring = new Authoring();
    if (author)
        this._authoring.set(author);
    document.addEventListener('Franck is ready...', this.Franck_as_3D_image.bind(this), false);
    this._image = new Image();
    this._image.onload = function () {
        document.dispatchEvent(new Event('Franck is ready...'));
    };
    this._image.src = 'img/Franck.jpg';

    this._camera = new THREE.PerspectiveCamera(50, document.body.innerWidth / document.body.innerHeight, 0.1, 20000);
    this._camera.position.z = 3000;
    this._renderer = new THREE.WebGLRenderer(/*{alpha: true}*/);
    this._renderer.setClearColor(new THREE.Color(0xFF0000), 0.5);
    this._renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._scene = new THREE.Scene();

    document.body.appendChild(this._renderer.domElement);

    this._scene.add(
            (function () {
                var geometry = new THREE.Geometry;
                var max_u = 3;
                var max_v = 3;
                for (var u = 0; u < max_u; u++) {
                    for (var v = 0; v < max_v; v++) {
                        geometry.vertices.push(new THREE.Vector3(u * 100, 100, v * 100));
                    }
                }
                // 'max_u == 3 && max_v == 3':
//        var face = new THREE.Face3(0, 1, 3); // 'u == 0 && v == 0'
//        face.color = new THREE.Color("rgb(0, 0, 255)");
//        geometry.faces.push(face);
//        face = new THREE.Face3(3, 1, 4);
//        face.color = new THREE.Color("rgb(255, 0, 0)");
//        geometry.faces.push(face);
//
//        face = new THREE.Face3(1, 2, 4); // 'u == 0 && v == 1'
//        face.color = new THREE.Color("rgb(0, 0, 255)");
//        geometry.faces.push(face);
//        face = new THREE.Face3(4, 2, 5);
//        face.color = new THREE.Color("rgb(255, 0, 0)");
//        geometry.faces.push(face);
//
//        face = new THREE.Face3(3, 4, 6); // 'u == 1 && v == 0'
//        face.color = new THREE.Color("rgb(0, 0, 255)");
//        geometry.faces.push(face);
//        face = new THREE.Face3(6, 4, 7);
//        face.color = new THREE.Color("rgb(255, 0, 0)");
//        geometry.faces.push(face);
//
//        face = new THREE.Face3(4, 5, 7); // 'u == 1 && v == 1'
//        face.color = new THREE.Color("rgb(0, 0, 255)");
//        geometry.faces.push(face);
//        face = new THREE.Face3(7, 5, 8);
//        face.color = new THREE.Color("rgb(255, 0, 0)");
//        geometry.faces.push(face);
                /** End of demo. */
                for (var u = 0; u < max_u - 1; u++) {
                    for (var v = 0; v < max_v - 1; v++) {
//                alert("face1: " + (u * max_v + v) + "/" + (u * max_v + v + 1) + "/" + ((u + 1) * max_v + v));
//                alert("face2: " + ((u + 1) * max_v + v) + "/" + (u * max_v + v + 1) + "/" + ((u + 1) * max_v + v + 1));
                        var face = new THREE.Face3(u * max_v + v, u * max_v + v + 1, (u + 1) * max_v + v);
                        face.color = new THREE.Color(new THREE.Color(0x00FF00));
                        geometry.faces.push(face);
                        face = new THREE.Face3((u + 1) * max_v + v, u * max_v + v + 1, (u + 1) * max_v + v + 1);
                        face.color = new THREE.Color(new THREE.Color(0x0000FF));
                        geometry.faces.push(face);
                    }
                }

                var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    vertexColors: THREE.FaceColors
                }));

                mesh.name = "object 1";
                return mesh;
            })()
            ); // 'add'
    this._scene.add(
            (function () {
                var canvas = document.createElement('canvas');
                canvas.width = 16;
                canvas.height = 16;
                var img_data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
                var buffer = new Uint32Array(img_data.data.buffer);
                for (var u = 0; u < canvas.width / 2; u++) {
                    for (var v = 0; v < canvas.height / 2; v++) {
                        var index = (v * canvas.width + u);
                        buffer[index] = (255 << 24) | (0 << 16) | (0 << 8) | 255; // red
                    }
                }
                for (var u = canvas.width / 2; u < canvas.width; u++) {
                    for (var v = 0; v < canvas.height / 2; v++) {
                        var index = (v * canvas.width + u);
                        buffer[index] = (255 << 24) | (0 << 16) | (255 << 8) | 0; // green
                    }
                }

                for (var u = 0; u < canvas.width / 2; u++) {
                    for (var v = canvas.height / 2; v < canvas.height; v++) {
                        var index = (v * canvas.width + u);
                        buffer[index] = (255 << 24) | (255 << 16) | (0 << 8) | 0; // blue
                    }
                }
                for (var u = canvas.width / 2; u < canvas.width; u++) {
                    for (var v = canvas.height / 2; v < canvas.height; v++) {
                        var index = (v * canvas.width + u);
                        buffer[index] = (255 << 24) | (255 << 16) | (255 << 8) | 255; // white
                    }
                }
                canvas.getContext('2d').putImageData(img_data, 0, 0);

                var geometry = new THREE.Geometry;
                var spacing_u = 100;
                var spacing_v = 100;
                for (var u = 0; u < canvas.width; u++) {
                    for (var v = 0; v < canvas.height; v++) {
                        geometry.vertices.push(new THREE.Vector3(u * spacing_u, v * spacing_v, 100));
                    }
                }

                for (var u = 0; u < canvas.width - 1; u++) {
                    for (var v = 0; v < canvas.height - 1; v++) {
//                        var alpha = buffer[buffer.length + u - (v + 1) * canvas.width] >>> 24;
                        var blue = (buffer[buffer.length + u - (v + 1) * canvas.width] & 0x00FF0000) >> 16;
                        var green = (buffer[buffer.length + u - (v + 1) * canvas.width] & 0x0000FF00) >> 8;
                        var red = buffer[buffer.length + u - (v + 1) * canvas.width] & 0x000000FF;
                        // alert(buffer.length + u - (v + 1) * canvas.width + " rgb(" + red + "," + green + "," + blue + ")");
                        var face = new THREE.Face3(u * canvas.height + v, u * canvas.height + v + 1, (u + 1) * canvas.height + v);
                        face.color = new THREE.Color("rgb(" + red + "," + green + "," + blue + ")");
                        geometry.faces.push(face);
                        face = new THREE.Face3((u + 1) * canvas.height + v, u * canvas.height + v + 1, (u + 1) * canvas.height + v + 1);
                        face.color = new THREE.Color("rgb(" + red + "," + green + "," + blue + ")");
                        geometry.faces.push(face);
                    }
                }

                var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                    vertexColors: THREE.FaceColors,
                    wireframe: true
                }));

                geometry.computeBoundingBox();
                mesh.translateX(-geometry.boundingBox.max.x / 2);
                mesh.translateY(-geometry.boundingBox.max.y / 2);

                mesh.name = "object 2";
                return mesh;
            })()
            ); // 'add'

    this._animate = function () {
        window.requestAnimationFrame(this._animate.bind(this));

        this._scene.getObjectByName("object 1").rotation.x += 0.01;
        this._scene.getObjectByName("object 1").rotation.y += 0.01;
        this._scene.getObjectByName("object 1").rotation.z += 0.01;

        if (this._scene.getObjectByName("Franck")) // "Franck" may have not been added to the scene yet... Using 'Promise' gracefully solves this!
            this._scene.getObjectByName("Franck").rotation.y += 0.05;

        this._renderer.render(this._scene, this._camera);
    };

    this._animate();
    Applause.then(sound => {
        sound.play();
    });
    window.setInterval(() => {
        swal({
            showConfirmButton: false,
            title: 'img/Franck.jpg',
            text: 'Pixels have been superimposed on a plane geometry, face-by-face, through UV mapping algorithm!',
            timer: 2000
        });
    }, 5000);
};

UV_mapping_illustration.prototype.Franck_as_3D_image = function () {
    if (!(this._image !== undefined && this._image !== null && this._image instanceof Image && this._image.complete))
        alert("Abnormal situation...");

    var canvas = document.createElement('canvas');
    canvas.width = this._image.width;
    canvas.height = this._image.height;
    canvas.getContext('2d').drawImage(this._image, 0, 0, this._image.width, this._image.height);
    var image_data_buffer = new Uint32Array(canvas.getContext('2d').getImageData(0, 0, this._image.width, this._image.height).data.buffer);

    var geometry = new THREE.Geometry;
    var spacing_u = 6;
    var spacing_v = 6;
    for (var u = 0; u < this._image.width; u++) {
        for (var v = 0; v < this._image.height; v++) {
            geometry.vertices.push(new THREE.Vector3(u * spacing_u, v * spacing_v, 0));
        }
    }
    if (image_data_buffer.length !== geometry.vertices.length)
        alert("Image sampling does not match to geometry...");
    for (var u = 0; u < this._image.width - 1; u++) {
        for (var v = 0; v < this._image.height - 1; v++) {
            var alpha = image_data_buffer[image_data_buffer.length + u - (v + 1) * this._image.width] >>> 24;
            var blue = (image_data_buffer[image_data_buffer.length + u - (v + 1) * this._image.width] & 0x00FF0000) >> 16;
            var green = (image_data_buffer[image_data_buffer.length + u - (v + 1) * this._image.width] & 0x0000FF00) >> 8;
            var red = image_data_buffer[image_data_buffer.length + u - (v + 1) * this._image.width] & 0x000000FF;
            var face = new THREE.Face3(u * this._image.height + v, u * this._image.height + v + 1, (u + 1) * this._image.height + v);
            face.color = new THREE.Color("rgb(" + red + "," + green + "," + blue + ")");
            geometry.faces.push(face);
            face = new THREE.Face3((u + 1) * this._image.height + v, u * this._image.height + v + 1, (u + 1) * this._image.height + v + 1);
            face.color = new THREE.Color("rgb(" + red + "," + green + "," + blue + ")");
            geometry.faces.push(face);
        }
    }

    var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: new THREE.Color("rgb(255,255,0)"), // Yellow
        side: THREE.DoubleSide,
        vertexColors: THREE.FaceColors
    }));
    mesh.name = "Franck";
// Positioning:
    geometry.computeBoundingBox();
    geometry.center();
    this._scene.add(mesh);
};

