//Codigo javascript
//Codigo javascript
// endpoints disponibles http://localhost:3000/products

const url_base = "http://localhost:3000";
const mainDiv = document.getElementById("main_list");
idProductoEditar = 0;
// getProducts
const getProducts = async () => {
  try {
    const response = await fetch(`${url_base}/products`);
    const { data } = await response.json();
    //Armar html;
    console.log("ingreso a la app");
    let content = "";
    for (const product of data) {
      content += `
            <div class="box">
                <p><span>Nombre: </span> ${product.name} </p>
                <p><span>Categoria: </span> ${product.category} </p>
                <p><span>Descripcion: </span> ${product.description} </p>
                <p><span>Precio: </span> ${product.price} </p>
				<button onclick="borrarProducto(${product.id})">Eliminar</button>
            </div>           
            `;
            
    } 
    mainDiv.innerHTML = content;
  } catch (error) {
    console.log(error);
  }
};

getProducts();

function borrarProducto(id){
	console.log(id);
	fetch(`${url_base}/products/` + id, {
		method: 'DELETE'
	}).then(() => {
		console.log("borrado");
		getProducts();
	});
  
}

function crearProducto(){
	
	let nameInput = document.getElementById("name-input").value;
	let categoriaInput = document.getElementById("categoria-input").value;
	let descripcionInput = document.getElementById("descripcion-input").value;
	let precioInput = document.getElementById("precio-input").value;
	
	let data = {
	"name": nameInput,
	"category": categoriaInput,
	"description":descripcionInput,
	"price": precioInput
	};

	fetch(`${url_base}/products/`, {
		method: 'POST',
		 headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	}).then(() => {
		console.log("creado");
		getProducts();
	});	
}

async function cargarProducto(id){
	const response = await fetch(`${url_base}/products/` + id);
	const prod = await response.json();
	console.log(prod);
	
	document.getElementById("name-edit").value = prod.name;
	document.getElementById("categoria-edit").value = prod.category;
	document.getElementById("descripcion-edit").value= prod.description;
	document.getElementById("precio-edit").value= prod.price;
	idProductoEditar =prod.id;
}
	
function guardarModificarProducto(){
	
	let nameInput = document.getElementById("name-edit").value;
	let categoriaInput = document.getElementById("categoria-edit").value;
	let descripcionInput = document.getElementById("descripcion-edit").value;
	let precioInput = document.getElementById("precio-edit").value;
	
	let data = {
		"id": idProductoEditar,
		"name": nameInput,
		"category": categoriaInput,
		"description":descripcionInput,
		"price": precioInput
	};

	fetch(`${url_base}/products/` + idProductoEditar, {
		method: 'PUT',
		 headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	}).then(() => {
		console.log("actualizado");
		getProducts();
		document.getElementById("name-edit").value = "";
		document.getElementById("categoria-edit").value = "";
		document.getElementById("descripcion-edit").value= "";
		document.getElementById("precio-edit").value= "";
		idProductoEditar = 0;
	});	
}