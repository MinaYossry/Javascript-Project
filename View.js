function View() {
    var swapping = false;
    var FIXED = "n";
    var ELEMENTWIDTH = 80;

    this.defaultColor = '#678983';
    this.focusedColor1 = '#009900';
    this.focusedColor = '#0099cc';
    this.sortedColor = '#c85e15';
    this.finishColor = "#181D31";

    this.finishAnimation = function () {
        $("#graph div").animate({
            'background-color': this.finishColor
        }, 100);
    }
    this.generatePseudoCode = function (arr) {
        $("#code").empty();

        for (var i in arr) {
            var sentence = arr[i];
            $("#code").append('<pre>' + sentence + '</pre>')
        }
    }

    this.onCode = function (id) {
        $("#code").children().eq(id).css('background-color', 'red')
    }
    this.offCode = function () {
        $("#code").children().css('background-color', 'rgb(18, 95, 95)')
    }

    this.closePseudoCode = function () {
        $(".over").animate({
            top: "100vh",
        }, 500, "linear");

        $("#openCodeArrow").removeClass("on")
        $("#openCodeArrow").removeClass("fa-arrow-down").addClass("fa-arrow-up");
    }

    this.openPseudoCode = function () {
        $("#openCodeArrow").addClass("on");
        $(".over").animate({
            top: "66.5vh",
        }, 500, "linear");
        $("#openCodeArrow").removeClass("fa-arrow-up").addClass("fa-arrow-down");

    }
    this.generateDivs = function (arr, maxValue) {
        $("#graph").empty();
        var totalWidth = ELEMENTWIDTH * arr.length;
        var leftPos = Math.trunc(totalWidth / -2);
        for (var i = 0; i < arr.length; i++) {
            $("#graph").append(generateDiv(i, arr[i], leftPos, maxValue));
            leftPos += ELEMENTWIDTH;
        }
    }

    var generateDiv = function (index, number, position, maxValue) {
        return $("<div>")
            .attr("id", FIXED + index).text(number)
            .css({
                left: position + "px",
                height: calcHeight(number, maxValue)
            });
    }

    var calcHeight = function (number, maxValue) {
        var minHeight = 50;
        var maxHeight = 150;
        return (((number / maxValue) * maxHeight) + minHeight) + "px";
    }

    this.glow = function (index, color) {
        $("#" + FIXED + index).css({ 'background-color': color });
    }

    this.swap = function (index1, index2) {
        // Get A strings of id of both elements
        var elem1 = $("#" + FIXED + index1);
        var elem2 = $("#" + FIXED + index2);
        if (!swapping) {
            swapping = true;

            var pos1 = parseInt(elem1.css("left"));
            var pos2 = parseInt(elem2.css("left"));

            elem1.attr("id", FIXED + index2)
            elem2.attr("id", FIXED + index1)

            // swap left position of both elements
            elem1.animate({
                left: `${pos2}px`
            }, 500, "easeOutQuart");
            elem2.animate({
                left: `${[pos1]}px`
            }, 500, "easeOutQuart", function () {
                swapping = false;
            });
        }
    }
}