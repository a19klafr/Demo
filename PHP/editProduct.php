<?php
    include 'dbConnect.php';

    $product=getpostAJAX("productName");
    $price=getpostAJAX("price");
    $image=getpostAJAX("image");

    if (empty($price)) err("Missing Form Data");

    try{
        $query="UPDATE products SET price=:PRICE, image=:IMG WHERE productName=:PRODUCT";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':PRODUCT',$product);
        $stmt->bindParam(':PRICE',$price);
        $stmt->bindParam(':IMG',$image);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo '<updated status="OK"/>';

    } catch (PDOException $e) {
            err("Error!: ".$e->getMessage()."<br/>");
            die();
    }
?>