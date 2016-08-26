$(document).ready(init);

function init() {
    $('#start').click(setTable);

    $('#primary').click(level);
    $('#middle').click(level);
    $('#high').click(level);
}

function level() {
    if ($(this).text() == "初級") {
        $("#row").val(9);
        $("#column").val(9);
        $("#m").val(10);
    }
    if ($(this).text() == "中級") {
        $("#row").val(16);
        $("#column").val(16);
        $("#m").val(40);
    }
    if ($(this).text() == "高級") {
        $("#row").val(30);
        $("#column").val(16);
        $("#m").val(99);
    }
}

function setTable(){
    $('#showTable').html("Loading...");
    $.get("CreateGame.php?row=" + $("#row").val() + "&column=" + $("#column").val() + "&m=" + $("#m").val(), function(data){
        $('#showTable').html(data);
        $('#showTable td').click(clickMap);
        $('#showTable td').hover(onMap, outMap);
        $('#showTable td').mousedown(function(event) {
            if ($(this).find('#content').is(':hidden')) {
                switch (event.which) {
                    case 3:
                        $(this).find('#flag').toggle();
                        break;
                }
            }
        });
	});
}

function onMap() {
    if ($(this).find('#content').is(':visible')) {
        return;
    }
    $(this).removeClass();
    $(this).addClass('onMap');
}

function outMap() {
    if ($(this).find('#content').is(':visible')) {
        return;
    }
    $(this).removeClass();
    $(this).addClass('outMap');
}

function clickMap() {

    if ($(this).find('#flag').is(':visible')) {
        return;
    }

    if ($(this).find('#content').is(':visible')) {
        return;
    }

    gameover = true;
    $('#showTable td').each(function() {
        if ($(this).find('#content').is(':hidden')) {
            gameover = false;
        }
    });

    if (gameover) {
        return;
    }

    $(this).removeClass();

    print(2, $(this));

    if ($(this).find('#content').text().trim() == '') {
        var trIndex = $(this).closest('tr').index();
        var tdIndex = $(this).closest('td').index();

        print(3, $(this));

        aroundPoint(trIndex, tdIndex);
    }

    if (checkPass()) {
        $('#showTable td').each(function() {
            $(this).find('#flag').hide();
            var color = checkPoint($(this));
            print(color, $(this));
        });
        $("#myModal .modal-title").text('過關');
        $("#myModal .modal-body p").text('過關!!!');
        $("#myModal").modal('show');
    }

    if ($(this).find('#content').text().trim() == 'M') {
        checkOver($(this));
    }

    function checkPass() {
        var i = 0
        $('#showTable td').each(function() {
            if ($(this).find('#content').is(':hidden')) {
                if ($(this).find('#content').text().trim() != 'M') {
                    i++;
                }
            }
        });

        if (i == 0) {
            return true;
        }
    }

    function checkOver(point) {
        $('#showTable td').each(function() {
            $(this).find('#flag').hide();
            var color = checkPoint($(this));
            print(color, $(this));
        });

        print(4, point);

        $("#myModal .modal-title").text('Game Over');
        $("#myModal .modal-body p").text('遊戲結束');
        $("#myModal").modal('show');
    }

    function aroundPoint(trIndex, tdIndex) {
        var point = [];
        var zeroPoint = [];

        // 判斷是否為最上方
        if (trIndex != 0) {
            // 上
            p = $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex);
            if (p.find('#content').text().trim() == '') {
                zeroPoint.push(p);
            } else {
                point.push(p);
            }


            // 判斷是否為最左側
            if (tdIndex != 0) {
                // 左上
                p = $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex-1);
                if (p.find('#content').text().trim() == '') {
                    zeroPoint.push(p);
                } else {
                    point.push(p);
                }
            }

            // 右上
            p = $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex+1);
            if (p.find('#content').text().trim() == '') {
                zeroPoint.push(p);
            } else {
                point.push(p);
            }
        }

        // 判斷是否為最左側
        if (tdIndex != 0) {
            // 左
            p = $('#showTable tr').eq(trIndex).find('td').eq(tdIndex-1);
            if (p.find('#content').text().trim() == '') {
                zeroPoint.push(p);
            } else {
                point.push(p);
            }
            // 左下
            p = $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex-1);
            if (p.find('#content').text().trim() == '') {
                zeroPoint.push(p);
            } else {
                point.push(p);
            }
        }

        // 右
        p = $('#showTable tr').eq(trIndex).find('td').eq(tdIndex+1);
        if (p.find('#content').text().trim() == '') {
            zeroPoint.push(p);
        } else {
            point.push(p);
        }
        // 右下
        p = $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex+1);
        if (p.find('#content').text().trim() == '') {
            zeroPoint.push(p);
        } else {
            point.push(p);
        }
        // 下
        p = $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex);
        if (p.find('#content').text().trim() == '') {
            zeroPoint.push(p);
        } else {
            point.push(p);
        }

        openAround(point);
        openZeroAround(zeroPoint);
    }

    function openAround(point) {
        $.each(point, function() {
            if ($(this).find('#content').is(':hidden')) {
                print(2, $(this));
            }
        });
    }

    function openZeroAround(point) {
        $.each(point, function() {
            if ($(this).find('#content').is(':hidden')) {
                print(3, $(this));
                openAround(aroundPoint($(this).closest('tr').index(), $(this).closest('td').index()));
            }
        });
    }

    function checkPoint(point) {
        if (point.find('#flag').is(':hidden')) {
            point.find('#content').show();
            if (point.find('#content').text().trim() == '') {
                return 3;
            } else if (point.find('#content').text().trim() == 'M') {
                return 1;
            } else {
                return 2;
            }
        }

        return 0;
    }

    function print(color, point) {

        // 1-M 2-Number 3-Zero 4-Boom
        if (color == 1) {
            color = {
                'background':'#ff0000',
                'background':'-webkit-radial-gradient(left top, #ff0000, #b30000)',
                'background':'-o-linear-gradient(bottom right, #ff0000, #b30000)',
                'background':'-moz-linear-gradient(bottom right, #ff0000, #b30000)',
                'background':'linear-gradient(to bottom right, #ff0000, #b30000)',
            };
        }
        if (color == 2) {
            color = {
                'background':'#0000cc',
                'background':'-webkit-radial-gradient(left top, #0000cc, #4d4dff)',
                'background':'-o-linear-gradient(bottom right, #0000cc, #4d4dff)',
                'background':'-moz-linear-gradient(bottom right, #0000cc, #4d4dff)',
                'background':'linear-gradient(to bottom right, #0000cc, #4d4dff)',
            };
        }
        if (color == 3) {
            color = {
                'background':'#99ccff',
                'background':'-webkit-radial-gradient(left top, #99ccff, #cce6ff)',
                'background':'-o-linear-gradient(bottom right, #99ccff, #cce6ff)',
                'background':'-moz-linear-gradient(bottom right, #99ccff, #cce6ff)',
                'background':'linear-gradient(to bottom right, #99ccff, #cce6ff)',
            };
        }
        if (color == 4) {
            color = {
                'background':'#99ccff',
                'background':'-webkit-radial-gradient(left top, #ffff00, #ffcc00)',
                'background':'-o-linear-gradient(bottom right, #ffff00, #ffcc00)',
                'background':'-moz-linear-gradient(bottom right, #ffff00, #ffcc00)',
                'background':'linear-gradient(to bottom right, #ffff00, #ffcc00)',
            };
            point.find('#content').prop('style', 'color: black');
        }

        if (color != 0) {
            point.css(color);
            point.find('#content').show();
        }
    }
}