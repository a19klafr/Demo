function showPage(p)
{
    pageArr = document.getElementsByClassName("page");
    listArr = document.getElementsByClassName("menuitem");
    for (var i = 0; i < pageArr.length; i++) {
        var page = pageArr[i];
        var li = listArr[i];
        page.style.display = "none";
        li.style.fontWeight = "normal";
    }
    document.getElementById("page" + p).style.display = "block";
    document.getElementById("menu" + p).style.fontWeight = "bold";
}
function showForms(f)
{
    formArr = document.getElementsByClassName("form");
    for (var i = 0; i < formArr.length; i++) {
        var form = formArr[i];
        form.style.display = "none";
    }
    document.getElementById("form" + f).style.display = "flex";
}
function fixChars(returnedData)
{
    x=returnedData.getElementsByTagName('*');
    for (i=0;i<x.length;i++){
        for(j=0;j<x[i].attributes.length;j++){
            x[i].attributes[j].nodeValue=x[i].attributes[j].nodeValue.replace(/%/g,"&");
        }
    } 
}
function errorMessage(jqXHR)
{
    console.log(jqXHR);
}