<?php
    include 'dbConnect.php';

    $product=getpostAJAX("productName");
    $price=getpostAJAX("price");
    $image=getpostAJAX("image");

    if (empty($product) || empty($price)) err("Missing Form Data");

    try{
        $query="INSERT INTO products(productName,price,image) values (:PRODUCT,:PRICE,:IMG);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':PRODUCT',$product);
        $stmt->bindParam(':PRICE',$price);
        $stmt->bindParam(':IMG',$image);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo '<created status="OK"/>';

    } catch (PDOException $e) {
            err("Error!: ".$e->getMessage()."<br/>");
            die();
    }
?>