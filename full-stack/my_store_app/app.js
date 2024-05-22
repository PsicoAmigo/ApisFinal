//Codigo javascript
// endpoints disponibles http://localhost:3000/products

const url_base = "http://localhost:3000";
const mainDiv = document.getElementById("main_list");
// getProducts
const getProducts = async () => {
  try {
    const response = await fetch(`${url_base}/products`);
    const { data } = await response.json();
    //Armar html;
    let content = "";
    for (const product of data) {
      content += `
            <div class="box">
                <p><span>Nombre: </span> ${product.name} </p>
                <p><span>Categoria: </span> ${product.category} </p>
                <p><span>Descripcion: </span> ${product.description} </p>
                <p><span>Precio: </span> ${product.price} </p> 
            </div>           
            `;
    }
    mainDiv.innerHTML = content;
  } catch (error) {
    console.log(error);
  }
};

getProducts();