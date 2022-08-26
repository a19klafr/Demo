function getProductCategories(nr)
{
    var ajax = $.ajax( "./PHP/getProductCategories.php", {
        type: 'POST'
    })
    if(nr==1){
        ajax.done(showProductCategories)
    } else {
        ajax.done(getFilteredCategories)
    }
    ajax.fail(errorMessage);
}
function showProductCategories(returnedData)
{
    var prodCatTable = document.getElementById("prodCatBox");
    var output = "";

    // Fix characters in XML notation to HTML notation
    fixChars(returnedData);
    // An XML DOM document is returned from AJAX
    var resultset=returnedData.childNodes[0];

    output="<table>";
    output+="<tr><th colspan='3'><h3>Product categories</h3></th>";
    output+="<tr><th>Product</th><th>Category</th><th></th></tr>";

    // Iterate over all nodes in root node (i.e. productcategories)
    for (i = 0; i < resultset.childNodes.length; i++) {
        // Iterate over all child nodes of that node that are productcategory nodes
        if(resultset.childNodes.item(i).nodeName=="productcategory"){
            var prodCat=resultset.childNodes.item(i);
        
            //output for table
            output+="<tr>";
            output+="<td>"+prodCat.attributes['product'].value+"</td>";
            output+="<td>"+prodCat.attributes['category'].value+"</td>";
            output+="<td class='btnBox'>";
            output+="<button onclick='deleteProductCategories(\"";
            output+=prodCat.attributes['product'].value;
            output+="\", \"";
            output+=prodCat.attributes['category'].value;
            output+="\");'>";
            output+=" Remove ";
            output+="</button>";
            output+="</td>";
            output+="</tr>";
        }
    }
    output+="</table>";
    prodCatTable.innerHTML=output;
}

function addProductCategories(nr)
{
    var product = document.getElementById("prodName"+nr);
    var categories = document.getElementsByName("categoryChoice"+nr);

    for(var i = 0; i < categories.length; i++){
        if(categories[i].checked){
            var category = categories[i].value;
            
            $.ajax( "./PHP/addProductCategory.php", {
                type: 'POST',
                data: { 
                    product: encodeURIComponent(product.value),
                    category: encodeURIComponent(category)
                }
            })
            .done(getProductCategories(1))
            .fail(errorMessage);
        }
    }
}

function deleteProductCategories(prod,cat)
{
    var ajax = $.ajax( "./PHP/removeProductCategory.php", {
        type: 'POST',
        data: { 
            product: encodeURIComponent(prod),
            category: encodeURIComponent(cat)
        }
    })
    if(prod == ""){
        ajax.done(deleteCategory(cat))
    } else if (cat == "") {
        ajax.done(deleteProduct(prod))
    }
    ajax.fail(errorMessage)
    .always(function() {
        getProductCategories(1);
    });   
}

function getFilteredCategories(returnedData)
{
    //alert("REACHING THE FUNCTION!!");
    var products = document.getElementsByClassName("productCollection");
    var prodTitles = document.getElementsByClassName("productTitle");
    var catBoxes = document.getElementsByClassName("categoryList");
    var output = "";

    // // Fix characters in XML notation to HTML notation
    // fixChars(returnedData);
    // // An XML DOM document is returned from AJAX
    // var resultset=returnedData.childNodes[0];

    // //Looping through product cards on page2
    // for(i = 0; i<products.length; i++){
    //     var title = prodTitles[i].innerHTML;
    //     var catBox = catBoxes[i];


    //     // Iterate over all nodes in root node (i.e. categories)
    //     for (i = 0; i < resultset.childNodes.length; i++) {
    //         // Iterate over all child nodes of that node that are category nodes
    //         if(resultset.childNodes.item(i).nodeName=="productcategory"){
    //             // Retrieve first name and last name for node
    //             var category=resultset.childNodes.item(i);

    //                 if(title == category.attributes['product'].value){
    //                     console.log("title: "+title+" product: "+category.attributes['product'].value);
    //                     // output+=category.attributes['category'].value;
    //                     // output+=", ";
    //                 }
                    
                    
    //         }
    //     }
    //     //catBox.innerHTML+=output;
    // }
}