<?php
    header ("Content-Type:text/xml; charset=utf-8");
    include 'dbConnect.php';

    try
    {
        $query = "SELECT * FROM `productcategory` ORDER BY product";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        echo "<productcategories>\n";
            foreach($stmt as $key => $row){
                echo " <productcategory \n";
                echo "    product='".presenthtml($row['product'])."'\n";
                echo "    category='".presenthtml($row['category'])."'\n";
                echo " />\n";
                echo "\n";
            }
        echo "</productcategories>\n";	
    }
    catch(PDOException $error)
    {
        console.log("Error: ".$error->getMessage()."<br/>");
    }
?>