function getCategories()
{
    $.ajax( "./PHP/getCategories.php", {
        type: 'POST'
    })
    .done(showCategories)
    .fail(errorMessage);
}
function showCategories(returnedData)
{
    var catTable = document.getElementById("categoryBox");
    var output = "";
    var checkboxes1 = document.getElementById("categoryChecks1");
    var checkboxes2 = document.getElementById("categoryChecks2");
    var check1 = "";
    var check2 = "";

    // Fix characters in XML notation to HTML notation
    fixChars(returnedData);
    // An XML DOM document is returned from AJAX
    var resultset=returnedData.childNodes[0];

    output="<table>";
    output+="<tr><th colspan='2'><h3>Categories</h3></th></tr>";
    output+="<tr><th>Category</th><th></tr>";

    // Iterate over all nodes in root node (i.e. categories)
    for (i = 0; i < resultset.childNodes.length; i++) {
        // Iterate over all child nodes of that node that are category nodes
        if(resultset.childNodes.item(i).nodeName=="category"){
            // Retrieve first name and last name for node
            var category=resultset.childNodes.item(i);
        
            //output for category table, page3
            output+="<tr>";
            output+="<td>"+category.attributes['categoryName'].value+"</td>";
            output+="<td class='btnBox'>";
            output+="<button onclick='deleteProductCategories(\"\",\"";
            output+=category.attributes['categoryName'].value;
            output+="\");'>";
            output+=" Remove ";
            output+="</button>";
            output+="</td>";
            output+="</tr>";

            //output for checkboxes1, page3
            check1+="<div>";
            check1+="<input type='checkbox' name='categoryChoice1'";
            check1+="id='"+category.attributes['categoryName'].value+"' ";
            check1+="value='"+category.attributes['categoryName'].value+"' />";
            check1+="<label for='"+category.attributes['categoryName'].value+"'>";
            check1+=category.attributes['categoryName'].value;
            check1+="</label>";
            check1+="</div>";

            //output for checkboxes2, page3
            check2+="<div>";
            check2+="<input type='checkbox' name='categoryChoice2'";
            check2+="id='"+category.attributes['categoryName'].value+"' ";
            check2+="value='"+category.attributes['categoryName'].value+"' />";
            check2+="<label for='"+category.attributes['categoryName'].value+"'>";
            check2+=category.attributes['categoryName'].value;
            check2+="</label>";
            check2+="</div>";
        }
    }
    output+="</table>";
    catTable.innerHTML=output;
    checkboxes1.innerHTML=check1;
    checkboxes2.innerHTML=check2;
}

function updateCategoryTable(returnedData)
{
    getCategories();
}
function addCategory(){
    var category = document.querySelector('input[name="addCategory"]').value;

    $.ajax( "./PHP/makeCategory.php", {
        type: 'POST',
        data: { 
            categoryName: encodeURIComponent(category)
        }
    })
    .done(updateCategoryTable)
    .fail(errorMessage);
}
function deleteCategory(cat)
{
    $.ajax( "./PHP/removeCategory.php", {
        type: 'POST',
        data: { 
            categoryName: encodeURIComponent(cat)
        }
    })
    .done(updateCategoryTable)
    .fail(errorMessage);
}