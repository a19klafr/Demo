<?php
    include 'dbConnect.php';

    $product=getpostAJAX("product");
    $category=getpostAJAX("category");

    if (empty($product) || empty($category)) err("Missing Form Data");

    try{
        $query="INSERT INTO productcategory(product,category) values (:PRODUCT,:CATEGORY);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':PRODUCT',$product);
        $stmt->bindParam(':CATEGORY',$category);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo '<created status="OK"/>';

    } catch (PDOException $e) {
            err("Error!: ".$e->getMessage()."<br/>");
            die();
    }
?>