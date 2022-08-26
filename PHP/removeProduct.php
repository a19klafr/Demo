<?php
    include 'dbConnect.php';

    $product=getpostAJAX("productName");

    if (empty($product)) err("Missing Form Data");

    try{
        $query="DELETE FROM products WHERE productName=:PRODUCT";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':PRODUCT',$product);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo '<deleted status="OK"/>';

    } catch (PDOException $e) {
            err("Error!: ".$e->getMessage()."<br/>");
            die();
    }
?>