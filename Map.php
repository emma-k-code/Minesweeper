<?php

/**
 * Class Map
 * 踩地雷地圖相關方法
 */
class Map
{
    /**
     * 建立地圖
     *
     * @param int $row 地圖的寬
     * @param int $column 地圖的長
     * @param int $m 地雷數
     * @return array
     */
    public function createMap($row = 9, $column = 9, $m = 10)
    {
        $total = $row * $column;

        $map = array_fill(1, $total, 0);

        $rand = array_rand($map, $m);
        if (is_array($rand)) {
            foreach ($rand as $value) {
                $map[$value] = 'M';
            }
        } else {
            $map[$rand] = 'M';
        }


        foreach ($map as $key=>$value) {
            if ($value === 0) {
                // 判斷是否為最右側
                if (($key % $row) != 0) {
                    // 右
                    if ($map[$key + 1] === 'M') {
                        $map[$key]++;
                    }
                    // 右下
                    if (isset($map[$key + ($row + 1)])) {
                        if ($map[$key + ($row + 1)] === 'M') {
                            $map[$key]++;
                        }
                    }
                    // 右上
                    if (isset($map[$key - ($row - 1)])) {
                        if ($map[$key - ($row - 1)] === 'M') {
                            $map[$key]++;
                        }
                    }
                }

                // 判斷是否為最左側
                if (($key % $row) != 1) {
                    // 左
                    if ($map[$key - 1] === 'M') {
                        $map[$key]++;
                    }
                    // 左下
                    if (isset($map[$key + ($row - 1)])) {
                        if ($map[$key + ($row - 1)] === 'M') {
                            $map[$key]++;
                        }
                    }
                    // 左上
                    if (isset($map[$key - ($row + 1)])) {
                        if ($map[$key - ($row + 1)] === 'M') {
                            $map[$key]++;
                        }
                    }
                }

                // 下
                if (isset($map[$key + $row])) {
                    if ($map[$key + $row] === 'M') {
                        $map[$key]++;
                    }
                }
                // 上
                if (isset($map[$key - $row])) {
                    if ($map[$key - $row] === 'M') {
                        $map[$key]++;
                    }
                }
            }
        }

        return $map;
    }
}
