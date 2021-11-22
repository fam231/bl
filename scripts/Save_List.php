<?php

# Получить JSON как строку
$json_str = file_get_contents('php://input');

# Получить объект
$json_obj = json_decode($json_str);


$NameFile = $json_obj->NameList;
$dataStr = $json_obj->dataStr;

// $Corect_file_name = str_replace( " " , "\\ ", $NameFile);
//exec("echo $Corect_file_name >> ../Lists/log");
//exec("echo $NameFile >> ../Lists/log");
if($dataStr == "") {
    exec("rm ../Lists/$NameFile");
}else{
   $Nfile=fopen("../Lists/".$NameFile, "w");
   fwrite($Nfile, $dataStr ); 
   fclose($Nfile);
};

echo("Список сохранен");

#fwrite($Nfile, $json_obj->masList[0]->ElementName.",".$json_obj->masList[0]->bay_state);
?>
