<?php
    header ("Content-Type:text/xml; charset=utf-8");
    include 'dbConnect.php';

    try
    {
        $query = "SELECT * FROM `categories`";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        echo "<categories>\n";
            foreach($stmt as $key => $row){
                echo " <category \n";
                echo "    categoryName='".presenthtml($row['categoryName'])."'\n";
                echo " />\n";
                echo "\n";
            }				
        echo "</categories>\n";	
    }
    catch(PDOException $error)
    {
        console.log("Error: ".$error->getMessage()."<br/>");
    }
?>