<?php
    include 'dbConnect.php';

    $product=getpostAJAX("product");
    $category=getpostAJAX("category");

    if (empty($product) && empty($category)) err("Missing Form Data");

    try{
        if($product != ""){
            $query="DELETE FROM productcategory WHERE product=:PRODUCT";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':PRODUCT',$product);
        } else if($category != ""){
            $query="DELETE FROM productcategory WHERE category=:CATEGORY";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':CATEGORY',$category);
        } else {
            $query="DELETE FROM productcategory WHERE product=:PRODUCT AND category=:CATEGORY";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':PRODUCT',$product);
            $stmt->bindParam(':CATEGORY',$category);
        }
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo '<deleted status="OK"/>';

    } catch (PDOException $e) {
        err("Error!: ".$e->getMessage()."<br/>");
        die();
    }
?>