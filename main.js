$(document).ready(function () {
    var counter = 0;
    var direction = false;
    var svgContainer = document.getElementById('lift-container');
    var ns = "http://www.w3.org/2000/svg";
    var svg = svgContainer.getElementsByTagNameNS(ns, "path");
    var verticalLength = svg[0].getTotalLength();
    var rect = svgContainer.getElementsByTagName('rect');

    var svgContainer2 = document.getElementById("outerWrapper");
    var svg2 = svgContainer2.getElementsByTagNameNS(ns, "path");
    /*	the var 'svg' contains a reference to two paths so svg.length = 2
        svg[0] is the straight line and svg[1] is the curved lines */

    /*	Now get the length of those two paths */
    var straightLength = svg2[0].getTotalLength();
    var curveLength = svg2[1].getTotalLength();

    /*	Also get a reference to the two star polygons */
    var stars = svgContainer2.getElementsByTagName("polygon");

    function moveRect() {
        if (parseInt(counter, 1) === 1) {
            direction = false;
        } else if (parseInt(counter, 1) < 0) {
            direction = true;
        }

        if (direction) {
            counter += .0001;
        } else {
            counter -= .0001;
        }

        rect[0].setAttribute("transform", "translate(" + (svg[0].getPointAtLength(counter * verticalLength).x - 15) + "," + (svg[0].getPointAtLength(counter * verticalLength).y - 15) + ")");
    }

    $('#down-btn').on('click', function () {
        requestAnimationFrame(movePoly);
    });

    function movePoly() {
        /*	Check to see where the stars are journeys to determine
		what direction they should be travelling in */
        if (parseInt(counter, 10) === 1) {
            /* we've hit the end! */
            direction = false;
        } else if (parseInt(counter, 10) < 0) {
            /* we're back at the start! */
            direction = true;
        }

        /*	Based on the direction variable either increase or decrease the counter */
        if (direction) {
            counter += 0.003;
        } else {
            counter -= 0.003;
        }

        /*	Now the magic part. We are able to call .getPointAtLength on the tow paths to return
            the coordinates at any point along their lengths. We then simply set the stars to be positioned
            at these coordinates, incrementing along the lengths of the paths */
        stars[0].setAttribute("transform", "translate(" + (svg2[0].getPointAtLength(counter * straightLength).x - 15) + "," + (svg2[0].getPointAtLength(counter * straightLength).y - 15) + ")");
        stars[1].setAttribute("transform", "translate(" + (svg2[1].getPointAtLength(counter * curveLength).x - 15) + "," + (svg2[1].getPointAtLength(counter * curveLength).y - 15) + ")");

        /*	Use requestAnimationFrame to recursively call moveStar() 60 times a second
            to create the illusion of movement */
        requestAnimationFrame(movePoly);
    }

    requestAnimationFrame(movePoly);
});
