<?php
    header ("Content-Type:text/xml; charset=utf-8");
    include 'dbConnect.php';

    try
    {
        $query = "SELECT * FROM `products`";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        echo "<products>\n";
            foreach($stmt as $key => $row){
                echo " <product \n";
                echo "    productName='".presenthtml($row['productName'])."'\n";
                echo "    price='".presenthtml($row['price'])."'\n";
                echo "    image='".presenthtml($row['image'])."'\n";
                echo " />\n";
                echo "\n";
            }				
        echo "</products>\n";	
    }
    catch(PDOException $error)
    {
        console.log("Error: ".$error->getMessage()."<br/>");
    }
?>