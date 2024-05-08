//variables globales
const d = document;
let nombrePro = d.querySelector(".nombre-producto");
let precioPro = d.querySelector(".precio-producto");
let presentacionPro = d.querySelector(".presentacion-producto");
let imagenPro =  d.querySelector(".imagen-producto");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table tbody");
let inputBusqueda = d.querySelector(".input-busqueda");


//agregar un evento  de click al boton del formulario
btnGuardar.addEventListener("click", () => {
   //alert(nombrePro.value);
   let datos = validarDatos();
  if (datos != null) {
   guardarDatos(datos);
  }
  
   borrarTabla();
   mostrarDatos();
});

//funcion para validar los campos  del formulario
function validarDatos() {
   let datosform;
   if (nombrePro.value == "" || precioPro.value=="" 
   ||imagenPro.value=="" ) {
      alert("todos los campos del formulario deben de estar completos");
      return;
   }
   else{
     datosform={
      nombre : nombrePro.value,
      precio : precioPro.value,
      presentacion : presentacionPro.value,
      imagen : imagenPro.value,
      
     }
   
   console.log(datosform);
   nombrePro.value="";
   precioPro.value = "";
   presentacionPro = "";
   imagenPro.value ="";
   
   return datosform;
   }
}

//funcion guardae datos en el local storage
const listadoProductos ="productos";
function guardarDatos(datos) {
   let productos =[];

   //extraer datos guardados previamente en el localStorage
   let productosGuardados =  JSON.parse(localStorage.getItem(listadoProductos));
   //validar los datosa previamente  guardados en el local storage
   if (productosGuardados !=null ) {
      productos = productosGuardados;
   }
   //agregar un dato unevo al array
   productos.push(datos);

   //guardar en local storage
   localStorage.setItem(listadoProductos, JSON.stringify(productos));
   //validar que los datos fueron guardados
   alert("datos guardados con exito");
}

//funcion para extraer datos del local storage
function mostrarDatos() {
   let productos=[];
   //extraer datos guardados previamente en el localStorage
   let productosGuardados =  JSON.parse(localStorage.getItem(listadoProductos));
   //validar los datosa previamente  guardados en el local storage
   if (productosGuardados !=null ) {
      productos = productosGuardados;
   }
   //console.log(productos);
   //mostrar los datos en la tabla
   productos.forEach((p,i)=>{
      let fila = d.createElement("tr");
      fila.innerHTML =`
      <td>${i+1}</td>
      <td>${p.nombre}</td>
      <td>${p.presentacion}</td>
      <td>${p.precio}</td>
      <td> <img src="${p.imagen}" width="50%"></td>
      <td>
      <span  onclick="actualizarproductos(${i})"class="btn editar  btn-warning">Editar</span>
      <span  onclick="elminarProductos(${i})" class="btn eliminar btn-danger">Eliminar</span>
      </td>
      
      `;
      tabla.appendChild(fila);
   });
}

//quitar datos repetidos de la tabla
function borrarTabla() {
   let filas = d.querySelectorAll("table tbody tr");
   //console.log(filas);
   filas.forEach((f)=>{
      f.remove();
   });
   
}

//funcion para eliminar un producto de la tabla
function elminarProductos(pos) {
   let productos =[];
   //extraer datos guardados previamente en el localStorage
   let productosGuardados =  JSON.parse(localStorage.getItem(listadoProductos));
   //validar los datosa previamente  guardados en el local storage
   if (productosGuardados !=null ) {
      productos = productosGuardados;
   }
   //crear  una variable de confirmar  para eliminar
   let confirmar = confirm("¿Desea  Eliminar este Producto:"+productos[pos].nombre+"?");
   if (confirmar) {
      alert("lo eliminaste");
        productos.splice(pos, 1);
       alert("producto fue eliminado");
       //guardar los datos que quedaron eliminados del localStorage
       localStorage.setItem(listadoProductos ,JSON.stringify(productos));
       borrarTabla();
       mostrarDatos();
   }
}
//actualizar productos
function actualizarproductos(pos) {
   let productos =[];
   //extraer datos guardados previamente en el localStorage
   let productosGuardados =  JSON.parse(localStorage.getItem(listadoProductos));
   //validar los datosa previamente  guardados en el local storage
   if (productosGuardados !=null ) {
      productos = productosGuardados;
   }
   //pasar los datos al formulario
   nombrePro.value=productos[pos].nombre;
   precioPro.value=productos[pos].precio;
   presentacionPro.value=productos[pos].presentacion;
   //selecionar el boton de actualizar
   let btnActualizar = d.querySelector( ".btn-actualizar" );
   btnActualizar.classList.toggle("d-none");
   btnGuardar.classList.toggle("d-none");
   //agrear un evento al boton de actualizar
   btnActualizar.addEventListener('click', function() {
      productos[pos].nombre = nombrePro.value;
      productos[pos].precio = precioPro.value;
      productos[pos].presentacion = presentacionPro.value;
      //guardar los pedidos editados en el localStorage
      localStorage.setItem(listadoProductos ,JSON.stringify(productos));
      alert( "Se Actualizó Correctamente" );
    
      nombrePro.value="";
      precioPro.value = "";
      presentacionPro = "";  
      borrarTabla();
      mostrarDatos();
      btnActualizar.classList.toggle("d-none");
      btnGuardar.classList.toggle("d-none");
   });
  
      
}

//mostrar todos los datos de la tabla al recargar
d.addEventListener("DOMContentLoaded",function name() {
   borrarTabla();
   mostrarDatos();
   
   
})
 // vamos a crear el buscador con una funcion
 inputBusqueda.addEventListener("input", function() {
   let term = inputBusqueda.value.toLowerCase();
   let productos = JSON.parse(localStorage.getItem(listadoProductos)) || [];

   let resultados = productos.filter(producto => producto.nombre.toLowerCase().includes(term));

   borrarTabla();
   resultados.forEach((p,i)=>{
      let fila = d.createElement("tr");
      fila.innerHTML =`
         <td>${i+1}</td>
         <td>${p.nombre}</td>
         <td>${p.presentacion}</td>
         <td>${p.precio}</td>
         <td> <img src="${p.imagen}" width="50%"></td>
         <td>
            <span  onclick="actualizarproductos(${i})"class="btn editar btn-warning">Editar</span>
            <span  onclick="eliminarProductos(${i})" class="btn eliminar btn-danger">Eliminar</span>
         </td>
      `;
      tabla.appendChild(fila);
   });
});