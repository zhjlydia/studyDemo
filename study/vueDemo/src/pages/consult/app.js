var html = require("./template.html");

export default {
    components: {},
    template: html,
    data() {
        return {
            currentIndex: 0,
            Matrix: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]
        }
    },
    computed: {},
    created: function () {
        this.rotateImage(this.Matrix);
    },
    methods: {
        transferMatrix(matrix) {
            var length = matrix.length;
            var newarr = new Array();
            for (var i = 0; i < length; i++) {
                newarr[i] = [];
                for (var j = 0; j < length; j++) {
                    newarr[i][j] = matrix[length - 1 - j][i];
                }
            }
            console.log(newarr);
        },
        rotateImage(a) {
            // Transpose
            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < i; j++) {
                    // Switch a[i][j] and a[j][i] 
                    // With XOR swap
                    a[i][j] ^= a[j][i]
                    a[j][i] ^= a[i][j]
                    a[i][j] ^= a[j][i]
                }
            }
            console.log(a);
            // Reverse columns
            for (var i in a) {
                a[i] = a[i].reverse()
            }
            return a
        }
    }
}