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
    $(this).addClass('number');
    $(this).find('#content').show();

    if ($(this).find('#content').text().trim() == '') {
        var trIndex = $(this).closest('tr').index();
        var tdIndex = $(this).closest('td').index();

        $(this).removeClass();
        $(this).addClass('zero');

        openAround(trIndex, tdIndex);
    }

    if (checkPass()) {
        alert('過關!!!');
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
            $('#showTable td').each(function() {
                if ($(this).find('#content').text().trim() == 'M') {
                    $(this).removeClass();
                    $(this).addClass('m');
                } else if($(this).find('#content').text().trim() == '') {
                    $(this).removeClass();
                    $(this).addClass('zero');
                } else {
                    $(this).removeClass();
                    $(this).addClass('number');
                }
                $(this).find('#content').show();
                $(this).find('#flag').hide();
            });

            return true;
        }
    }

    function checkOver(point) {
        $('#showTable td').each(function() {
            if ($(this).find('#content').text().trim() == 'M') {
                $(this).removeClass();
                $(this).addClass('m');
            } else if($(this).find('#content').text().trim() == '') {
                $(this).removeClass();
                $(this).addClass('zero');
            } else {
                $(this).removeClass();
                $(this).addClass('number');
            }
            $(this).find('#content').show();
            $(this).find('#flag').hide();
        });

        point.removeClass();
        point.addClass('boom');
        alert('遊戲結束');
    }

    function openAround(trIndex, tdIndex) {
        // 判斷是否為最上方
        if (trIndex != 0) {
            // 上
            if ($('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex).find('#flag').is(':hidden')) {
                $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex).removeClass();
                $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex).find('#content').show();
                if ($('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex).find('#content').text().trim() == '') {
                    $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex).addClass('zero');
                } else {
                    $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex).addClass('number');
                }
            }


            // 判斷是否為最左側
            if (tdIndex != 0) {
                // 左上
                if ($('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex-1).find('#flag').is(':hidden')) {
                    $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex-1).removeClass();
                    $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex-1).find('#content').show();
                    if ($('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex-1).find('#content').text().trim() == '') {
                        $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex-1).addClass('zero');
                    } else {
                        $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex-1).addClass('number');
                    }
                }
            }

            // 右上
            if ($('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex+1).find('#flag').is(':hidden')) {
                $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex+1).removeClass();
                $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex+1).find('#content').show();
                if ($('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex+1).find('#content').text().trim() == '') {
                    $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex+1).addClass('zero');
                } else {
                    $('#showTable tr').eq(trIndex-1).find('td').eq(tdIndex+1).addClass('number');
                }
            }
        }

        // 判斷是否為最左側
        if (tdIndex != 0) {
            // 左
            if ($('#showTable tr').eq(trIndex).find('td').eq(tdIndex-1).find('#flag').is(':hidden')) {
                $('#showTable tr').eq(trIndex).find('td').eq(tdIndex-1).removeClass();
                $('#showTable tr').eq(trIndex).find('td').eq(tdIndex-1).find('#content').show();
                if ($('#showTable tr').eq(trIndex).find('td').eq(tdIndex-1).find('#content').text().trim() == '') {
                    $('#showTable tr').eq(trIndex).find('td').eq(tdIndex-1).addClass('zero');
                } else {
                    $('#showTable tr').eq(trIndex).find('td').eq(tdIndex-1).addClass('number');
                }
            }
            // 左下
            if ($('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex-1).find('#flag').is(':hidden')) {
                $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex-1)
                $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex-1).find('#content').show();
                if ($('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex-1).find('#content').text().trim() == '') {
                    $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex-1).addClass('zero');
                } else {
                    $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex-1).addClass('number');
                }
            }
        }

        // 右
        if ($('#showTable tr').eq(trIndex).find('td').eq(tdIndex+1).find('#flag').is(':hidden')) {
            $('#showTable tr').eq(trIndex).find('td').eq(tdIndex+1).removeClass();
            $('#showTable tr').eq(trIndex).find('td').eq(tdIndex+1).find('#content').show();
            if ($('#showTable tr').eq(trIndex).find('td').eq(tdIndex+1).find('#content').text().trim() == '') {
                $('#showTable tr').eq(trIndex).find('td').eq(tdIndex+1).addClass('zero');
            } else {
                $('#showTable tr').eq(trIndex).find('td').eq(tdIndex+1).addClass('number');
            }
        }

        // 右下
        if ($('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex+1).find('#flag').is(':hidden')) {
            $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex+1).removeClass();
            $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex+1).find('#content').show();
            if ($('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex+1).find('#content').text().trim() == '') {
                $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex+1).addClass('zero');
            } else {
                $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex+1).addClass('number');
            }
        }
        // 下
        if ($('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex).find('#flag').is(':hidden')) {
            $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex).removeClass();
            $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex).find('#content').show();
            if ($('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex).find('#content').text().trim() == '') {
                $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex).addClass('zero');
            } else {
                $('#showTable tr').eq(trIndex+1).find('td').eq(tdIndex).addClass('number');
            }
        }
    }
}