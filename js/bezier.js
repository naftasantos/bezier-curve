Bezier = {
    cubic: function(p0, p1, p2, p3, t, pFinal) {
        pFinal = pFinal || new Vector(0, 0);

        pFinal.x =  Math.pow(1 - t, 3) * p0.x +
                    Math.pow(1 - t, 2) * 3 * t * p1.x +
                    (1 - t) * 3 * t * t * p2.x +
                    t * t * t * p3.x;
        pFinal.y =  Math.pow(1 - t, 3) * p0.y +
                    Math.pow(1 - t, 2) * 3 * t * p1.y +
                    (1 - t) * 3 * t * t * p2.y +
                    t * t * t * p3.y;

        return pFinal;
    }
};