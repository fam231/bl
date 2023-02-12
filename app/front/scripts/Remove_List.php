<?php

# Получить JSON как строку
$json_str = file_get_contents('php://input');

# Получить объект
$NameFile = json_decode($json_str);
// $NameFile = "Фикс прайс";
$NameFile_vsOutSpice = str_replace( ' ' , '\ ', $NameFile);
exec("rm ../Lists/$NameFile_vsOutSpice");
// if ( $del ){
//     echo("Список ".$NameFile." Удален");
// }else{
//     echo("Список ".$NameFile." НЕ Удален");
// }

//$Corect_file_name = str_replace( " " , "\\ ", $NameFile);
//exec("echo $Corect_file_name >> ../Lists/log");
//exec("echo $NameFile >> ../Lists/log");



#fwrite($Nfile, $json_obj->masList[0]->ElementName.",".$json_obj->masList[0]->bay_state);
?>
