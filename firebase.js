import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getStorage} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

import { getFirestore,  
          collection, 
          addDoc, 
          getDocs, 
          onSnapshot,
          deleteDoc, 
          doc, 
          getDoc} from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js'
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
   alert("categoria: "+categoria)
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

  export const elemento=async function(id){
        const docRef = doc(db, "prueba", id);
        const docSnap = await getDoc(docRef);
        //return(docSnap.data().nombre)
  }

  export const actProd=async function(id,newProd){
    
    try {
      const docRef=doc(db,"prueba",id)
      await updateDoc(docRef,newProd)
      alert("siuuu")
      
        } catch (error) {
          alert(error)
        }
  }
