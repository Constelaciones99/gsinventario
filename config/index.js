import { guardarProducto, storage } from './firebase.js';
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

var nombre_producto=document.getElementById("item-producto")

const form_add = document.getElementById("form-agregar");


function showLoading(show) {
  const submitBtn = form_add.querySelector('input[type="submit"]');
  const loadingSpinner = document.getElementById('loading-spinner') || 
    (() => {
      const spinner = document.createElement('span');
      spinner.id = 'loading-spinner';
      spinner.className = 'spinner-border spinner-border-sm ms-2';
      spinner.setAttribute('aria-hidden', 'true');
      submitBtn.parentNode.insertBefore(spinner, submitBtn.nextSibling);
      return spinner;
    })();
  
  submitBtn.disabled = show;
  loadingSpinner.style.display = show ? 'inline-block' : 'none';
}

// Función para subir imágenes
async function uploadFileToStorage(file) {
  try {
    // Validación del archivo
    if (!file) return null;
    
    if (!file.type.match('image.*')) {
      //throw new Error('Solo se permiten archivos de imagen');
    }
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      //throw new Error('La imagen es demasiado grande (máximo 5MB)');
    }

    // Subir el archivo
    const storageRef = ref(storage, `productos/${file.name}`);
    //const storageRef = ref(storage, JSON.stringify({"otras":[],"principal":`${file.name}`}));

    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtener URL pública
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error('Error en uploadFileToStorage:', error);
    //throw error;
  }
}

// Evento submit mejorado
form_add.addEventListener("submit", async (event) => {
  event.preventDefault();
  showLoading(true);

  try {
    // Obtener valores del formulario
    var nombre = form_add["select_prod"].value || form_add["name_prod"].value;
    var cant = form_add["cantidad"].value;
    var mark = form_add["marca"].value;
    var categorias = form_add["categoriastodas"].value
    var details = form_add["detalles"].value;
    var obs = form_add["observaciones"].value;
    var fecha = new Date();
    var file = form_add['foto'].files[0];

    //Validaciones básicas nombre_producto
    if (!nombre || !cant) {
      throw new Error('Nombre y cantidad son campos requeridos');
    }


    // Subir imagen si existe
    let imagenUrl = "";
    if (file) {
      //alert(file)
      try {
        imagenUrl = await uploadFileToStorage(file);
      } catch (uploadError) {
        console.error("Error subiendo imagen:", uploadError);
        throw new Error(`Error al subir la imagen: ${uploadError.message}`);
      }
    }

    if(details==""){
      details="Sin detalles"
    }
    if(obs==""){
      obs="Sin observaciones"
    }

    if(mark==""){
      mark="sin marca"
    }

    alert("nombre: "+nombre+" - cantidad: "+ cant+" - marca: "+ mark+" - categorias: "+ categorias+" - detalles: " +details+" - obs: "+ obs+" - img: "+ imagenUrl+" - fecha: "+ fecha)

    // Guardar producto en Firestore
    await guardarProducto(nombre, cant, mark, categorias, details, obs, imagenUrl, fecha);
    
    // Feedback al usuario
    form_add.reset();
    document.getElementById("selects").value=JSON.stringify(["sin categorias"])
    nombre_producto.disabled=true
    alert("Producto guardado exitosamente");
    window.location.reload()
    //cerrarDialog('agregar');
    
  } catch (error) {
    alert("Error en el proceso completo:", error);
    alert(`Error: ${error.message}`);
  } finally {
    showLoading(false);
  }
});