<?php
    //--------------------------------------------------------------------------
    // presenthtml - Allows us to pass national characters - & is replaced with %
    //--------------------------------------------------------------------------
    function presenthtml($str) {
            return str_replace("&","%",$str);
    }
    
    //--------------------------------------------------------------------------
    // getpostAJAX - Allows us to pass posts even if array position does not exist
    //--------------------------------------------------------------------------
    function getpostAJAX($param) {
            if(isset($_POST[$param])){
                    if($_POST[$param]==="0"){
                            $ret="0";							
                    }else if(empty($_POST[$param])){
                            $ret="UNK";
                    }else{
                            $ret=htmlentities(urldecode($_POST[$param]));							
                    }
            }else{
                    $ret="UNK";
            }
            return $ret;
    }

    //--------------------------------------------------------------------------
    // err - Displays nicely formatted error and exits
    //--------------------------------------------------------------------------
    function err($errmsg) {
            header("HTTP/1.0 500 Internal server error:".$errmsg,true,500);
            echo $errmsg;
            exit;
    }

    $pdo = null;
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "demo";

    try
    {
        $pdo = new PDO("mysql:host=".$host.";dbname=".$dbname, $username, $password);
        
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $error)
    {
        err("Error!: ".$error->getMessage());
        die();
    }
    
?>