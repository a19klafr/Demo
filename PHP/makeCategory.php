<?php
    include 'dbConnect.php';

    $category=getpostAJAX("categoryName");

    if (empty($category)) err("Missing Form Data");

    try{
        $query="INSERT INTO categories(categoryName) values (:CATEGORY);";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':CATEGORY',$category);
        $stmt->execute();

        header ("Content-Type:text/xml; charset=utf-8");  
        echo '<created status="OK"/>';

    } catch (PDOException $e) {
            err("Error!: ".$e->getMessage()."<br/>");
            die();
    }
?>