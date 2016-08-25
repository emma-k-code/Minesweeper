<?php

header("content-type: text/html; charset=utf-8");

require_once 'Map.php';

$row = $_GET['row'];
$column = $_GET['column'];
$m = $_GET['m'];

if ($row <= 0 || $column <= 0 || $m <= 0) {
    echo '輸入的數字不可小於等於0';
    return;
}

$total = $row * $column;

if ($m > $total) {
    echo '地雷數不可大於方格數量';
    return;
}

$map = new Map;
$showMap = $map->createMap($row,$column,$m);

?>
<?php for ($i = 0; $i < $column; $i++) :?>
   <tr height="40px" align="center">

    <?php for ($h = 0; $h < $row; $h++) :?>
        <td  width="40px">
        <span id="content" style="display:none;">
        <?php
            $key = $i * $row + ($h + 1);
            if ($showMap[$key] === 0) {
                echo "";
            } else {
                echo $showMap[$key];
            }
        ?>
        </span>
        <span id="flag" style="display:none">
            F
        </span>

        </td>

    <?php endfor ?>

    </tr>
<?php endfor ?>