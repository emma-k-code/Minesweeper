<?php

header("content-type: text/html; charset=utf-8");

require_once 'Map.php';

$row = $_GET['row'];
$column = $_GET['column'];
$m = $_GET['m'];

if ($row <= 1 || $column <= 1) {
    echo '長寬不可小於等於1';
    return;
}
if ($m <= 0) {
    echo '地雷數不可小於1';
    return;
}

$total = $row * $column;

if ($m >= $total) {
    echo '地雷數不可大等於方格數量';
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
        <span id="icon" style="display:none;">
        </span>
        <?php
            if ($showMap[$key] === 'M') {
                echo '<img id="imgM" src="icon/bomb.png" height="36 width="36" style="display:none;">';
            }
        ?>
        <span id="flag" class="glyphicon glyphicon-flag" style="display:none">
        </span>
        </td>

    <?php endfor ?>

    </tr>
<?php endfor ?>