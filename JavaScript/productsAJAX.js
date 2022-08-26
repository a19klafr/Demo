function getProducts()
{
    $.ajax( "./PHP/getProducts.php", {
        type: 'POST'
    })
    .done(showProducts)
    .fail(errorMessage);
}
function showProducts(returnedData){
    var productInfo = document.getElementById("productCard");
    var productTbl = document.getElementById("productBox");
    var productSelect = document.getElementById("prodName2");
    var info = "";
    var output = "";
    var select = "";

    // Fix characters in XML notation to HTML notation
    fixChars(returnedData);
    // An XML DOM document is returned from AJAX
    var resultset=returnedData.childNodes[0];

    output+="<table>";
    output+="<tr><th colspan='5'><h3>Products</h3></th></tr>";
    output+="<tr><th>Product</th><th>Price</th><th>Image</th><th></th><th></th></tr>";

    // Iterate over all nodes in root node (i.e. products)
    for (i = 0; i < resultset.childNodes.length; i++) {
        // Iterate over all child nodes of that node that are product nodes
        if(resultset.childNodes.item(i).nodeName=="product"){
            // Retrieve first name and last name for node
            var product=resultset.childNodes.item(i);

            //Output for products, page2
            info+="<div class='productCollection'>"; //Start of outer DIV
            info+="<img class='productImage' src='#' alt='Product image'>";
            info+="<div class='productItem'>";
            info+="<h3 class='productTitle'>"+product.attributes['productName'].value+"</h3>";
            info+="<div class='productInformation'>";
            info+="<span class='priceInformation'>Price: "+product.attributes['price'].value+"</span>";
            info+="<span class='categoryInformation'>Categories:";
            info+="<div class='categoryList'></div>";
            info+="</span>";
            info+="</div>";
            info+="</div>";
            info+="</div>";
            info+="</div>"; //End of outer DIV
        
            // Output for product table, page3
            output+="<tr>";
            output+="<td>"+product.attributes['productName'].value+"</td>";
            output+="<td>"+product.attributes['price'].value+"</td>";
            output+="<td>"+product.attributes['image'].value+"</td>";
            output+="<td class='btnBox'>";
            output+="<button onclick='updateForm(\"";
            output+=product.attributes['productName'].value;
            output+="\", \"";
            output+=product.attributes['price'].value;
            output+="\", \"";
            output+=product.attributes['image'].value;
            output+= "\");'>";
            output+=" Edit ";
            output+="</button>";
            output+="<td class='btnBox'>";
            output+="<button onclick='deleteProductCategories(\"";
            output+=product.attributes['productName'].value;
            output+="\", \"\");'>";
            output+=" Remove ";
            output+="</button>";
            output+="</td>";
            output+="</tr>";
            
            //Output for product select box,, page3
            select+="<option value='";
            select+=product.attributes['productName'].value;
            select+="'>";
            select+=product.attributes['productName'].value;
            select+="</option>";
        }
    }
    output+="</table>";

    productInfo.innerHTML=info;
    productTbl.innerHTML=output;
    productSelect.innerHTML=select;

    getProductCategories(2);
}

function updateProductTable(returnedData)
{
    getProducts();
}
function addProduct(){
    var product = document.querySelector('input[name="prodName1"]').value;
    var price = document.querySelector('input[name="addPrice"]').value;
    var image = document.querySelector('input[name="addImage"]').value;

    $.ajax( "./PHP/makeProduct.php", {
        type: 'POST',
        data: { 
            productName: encodeURIComponent(product),price: encodeURIComponent(price),
            image: encodeURIComponent(image)
        }
    })
    .done(addProductCategories(1),
    updateProductTable)
    .fail(errorMessage);
}
function deleteProduct(prod)
{
    $.ajax( "./PHP/removeProduct.php", {
        type: 'POST',
        data: { 
            productName: encodeURIComponent(prod)
        }
    })
    .done(updateProductTable)
    .fail(errorMessage);
}

function updateForm(name,price,img)
{
    showForms(2);

    document.querySelector('input[name="updateProduct"]').value = name;
    document.querySelector('input[name="updatePrice"]').value = price;
}


function updateProduct()
{
    var product = document.querySelector('input[name="updateProduct"]').value;
    var price = document.querySelector('input[name="updatePrice"]').value;
    var image = document.querySelector('input[name="updateImage"]').value;

    $.ajax( "./PHP/editProduct.php", {
        type: 'POST',
        data: { 
            productName: encodeURIComponent(product),
            price: encodeURIComponent(price),
            image: encodeURIComponent(image),
        }
    })
    .done(updateProductTable)
    .fail(errorMessage);
}