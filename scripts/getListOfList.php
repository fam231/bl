<?php
$filelist=glob("../../Lists/*");
$answ = array();
// for($i=0; $i<count($filelist); $i++){
//     $answ = $answ . $filelist[$i] . "+";
// }

foreach($filelist as $filepath){
        $filename = explode("../../Lists/", $filepath);
	$item_answ = array($filename[1]);
	//$fileItems = array_merge($file[1], file("../Lists/".$file[1]));
       	array_push($item_answ, file($filepath));
	//if ($file[1] !="Base_List") {
        array_push($answ, $item_answ);
       // }
        
        // $answ = $answ . $file[1] . ";";
}
echo json_encode($answ);
?>
