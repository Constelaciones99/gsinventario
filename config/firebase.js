import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getStorage} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

import { getFirestore,  
          collection, 
          addDoc, 
          getDocs, 
          onSnapshot,
          deleteDoc, 
          doc
        } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js'
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAbmB39xaosD2G3zrVBtnOmX70HZ3nlpDA",
    authDomain: "inventary-74f46.firebaseapp.com",
    projectId: "inventary-74f46",
    storageBucket: "inventary-74f46.firebasestorage.app",
    messagingSenderId: "262404945117",
    appId: "1:262404945117:web:f71e0e1fa0ae65007d9734"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const storage = getStorage(app); // ← Agrega esta línea
  const db=getFirestore()
  export { db, storage };

export function guardarProducto(nombre, cantidad, marca, categoria, detalles, observacion, imagen, fecha){
   categoria=JSON.parse(categoria)

   var imagenes={'otras':['raton.png','raton(1).png','raton(2).png'], 
            'principal':imagen
            }
    
   if(categoria=="" || categoria==[] || categoria==['']){
      categoria=["sin categoria"]
   }
   if(detalles==""){
    detalles="sin detalles"
   }
   if(observacion==""){
    observacion="sin observaciones"
   }
   if(marca==""){
    marca="sin marca"
   }

   alert("nombre: "+nombre+" - cantidad: "+cantidad+" - categoria: "+categoria+" - detalles: "+detalles+" - observacion: "+observacion+" - marca: "+marca+" - imagenes: "+imagenes)
  addDoc(collection(db, "prueba"), {
    nombre, cantidad, marca,categoria, detalles, observacion, imagenes, fecha
  });
}

  export function obtenerProd(){
            res=getDocs(db,"prueba")
            console.log(res)
  }

  export function listaProd(callback){
      onSnapshot(collection(db,"prueba"), callback)
  }

  export function eliminarProd(id){
      deleteDoc(doc(db,"prueba",id))
  }
