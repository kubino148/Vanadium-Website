
		function main(){
			
			var Size = [];
			var Cabinet_height =  [];
			var Cabinet_width = []; 
			var Cabinet_depth = 2.5;
			var Shelf_thickness = []; 
			var texture = new THREE.TextureLoader().load( "textures/wood.jpg" );
			var offset = [];
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 4, 4 );
			
			
			if(document.getElementById('Cabinet0').checked== true){
			Size[0]= document.getElementById('Shelf0').value;
			Size[0]= parseInt(Size[0]);
			Cabinet_height[0]=document.getElementById('Height0').value;
			Cabinet_height[0]=parseInt(Cabinet_height[0])
			Cabinet_width[0]=document.getElementById('Width0').value; 
			Cabinet_width[0]=parseInt(Cabinet_width[0])
			Cabinet_depth = 14;
			Shelf_thickness[0]= 1; 
			offset[0] = 0;
			}
			
				if(document.getElementById('Cabinet1').checked== true){
			Size[1]= document.getElementById('Shelf1').value;
			Size[1]= parseInt(Size[1]);
			Cabinet_height[1]=document.getElementById('Height1').value;
			Cabinet_height[1]=parseInt(Cabinet_height[1])
			Cabinet_width[1]=document.getElementById('Width1').value; 
			Cabinet_width[1]=parseInt(Cabinet_width[1])
			Cabinet_depth = 14;
			Shelf_thickness[1]= 1; 
			offset[1] = Cabinet_width[0];
				}
				
				if(document.getElementById('Cabinet2').checked== true){
			Size[2]= document.getElementById('Shelf2').value;
			Size[2]= parseInt(Size[2]);
			Cabinet_height[2]=document.getElementById('Height2').value;
			Cabinet_height[2]=parseInt(Cabinet_height[2])
			Cabinet_width[2]=document.getElementById('Width2').value; 
			Cabinet_width[2]=parseInt(Cabinet_width[2])
			Cabinet_depth = 14;
			Shelf_thickness[2]= 1; 
			offset[2] = Cabinet_width[0] + Cabinet_width[1];
				}
				if(document.getElementById('Cabinet3').checked== true){
			Size[3]= document.getElementById('Shelf3').value;
			Size[3]= parseInt(Size[3]);
			Cabinet_height[3]=document.getElementById('Height3').value;
			Cabinet_height[3]=parseInt(Cabinet_height[3])
			Cabinet_width[3]=document.getElementById('Width3').value; 
			Cabinet_width[3]=parseInt(Cabinet_width[3])
			Cabinet_depth = 14;
			Shelf_thickness[3]= 1; 
			offset[3] = Cabinet_width[0] + Cabinet_width[1] + Cabinet_width[2];
				}
			
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
			var camera_pov =  (Cabinet_height[0]+Cabinet_width[0])*0.5;
			camera.position.set(  -camera_pov+30, Cabinet_height[0]/2+20,  camera_pov+30 );
		
			
			
			var scene = new THREE.Scene();
			var renderer = new THREE.WebGLRenderer()
			
			
				
			var container = document.getElementById('canvas');
			container.appendChild(renderer.domElement);
		
			renderer.setSize($(container).width(), $(container).height());	
		
			var sum = Cabinet_width.reduce(function(a, b) { return a + b; }, 0);

			var controls = new THREE.OrbitControls( camera,  container );
			controls.target = new THREE.Vector3(sum/Math.ceil(Size.length/2)/2,Cabinet_height[Math.floor(Size.length/2)]/2,0);			
			controls.update();	
			
			
			
			
			
		
			
		
			
			
			function add_cabinet(Size,Cabinet_height,Cabinet_width,Cabinet_depth,Shelf_thickness,texture,offset){
				
				var ShelfGeometry = new THREE.BoxGeometry( Cabinet_width , Shelf_thickness , Cabinet_depth );
				var material = new THREE.MeshBasicMaterial( { map: texture } );
				
				var top_shelf = new THREE.Mesh( ShelfGeometry, material );	
				var bottom_shelf = new THREE.Mesh( ShelfGeometry, material );	
				
				var StandGeometry = new THREE.BoxGeometry( 1 , Cabinet_height, 1 );
				var rstand1 = new THREE.Mesh( StandGeometry, material );	
				var rstand2 = rstand1.clone();
				var lstand1 = rstand1.clone();
				var lstand2 = rstand1.clone();
				
				scene.add(top_shelf);
				scene.add(bottom_shelf);
				scene.add(rstand1);
				scene.add(rstand2);
				scene.add(lstand1);
				scene.add(lstand2);
				// Positioning	
				
				top_shelf.position.x += Cabinet_width/2+offset;
				bottom_shelf.position.x += Cabinet_width/2+offset;
				
				rstand1.position.x = Cabinet_width+offset;
				rstand2.position.x = Cabinet_width+offset;
				lstand1.position.x = 0+offset;
				lstand2.position.x = 0+offset;
				
				
				rstand1.position.z = Cabinet_depth*0.5;
				rstand2.position.z = -(Cabinet_depth*0.5);
				lstand1.position.z = Cabinet_depth*0.5;
				lstand2.position.z = -(Cabinet_depth*0.5);
				
				rstand1.position.y = Cabinet_height/2;
				rstand2.position.y = Cabinet_height/2;
				lstand1.position.y = Cabinet_height/2;
				lstand2.position.y = Cabinet_height/2;
				
				
				top_shelf.position.y = 0+Shelf_thickness/2;
				bottom_shelf.position.y = Cabinet_height - Shelf_thickness/2;
				
				
				
				var bonus_shelfs = [];
				
				bonus_shelfs[0] = top_shelf;
				bonus_shelfs[0].position.y = top_shelf.position.y;
				bonus_shelfs[1] = bottom_shelf;
				bonus_shelfs[1].position.y = bottom_shelf.position.y;
			
				var divide = Size-1;
				var ratio = Cabinet_height/divide;
				
				var i;
				for (i = 2; i < Size; i++) {
					bonus_shelfs[i] = bottom_shelf.clone();
					scene.add(bonus_shelfs[i]);
					bonus_shelfs[i].position.y = bonus_shelfs[i-1].position.y - ratio;
				}
			}
			
		
			
			
			function animate() {
			requestAnimationFrame( animate );
			renderer.render( scene, camera );
			controls.update();
			}
			
			for(var j=0; j < Size.length; j++){
				add_cabinet(Size[j],Cabinet_height[j],Cabinet_width[j],Cabinet_depth,Shelf_thickness[j],texture,offset[j]);
			}
			animate();
		}