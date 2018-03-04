function gameController(width, height, cols, rows, c) {
    this.width = width;
    this.height = height;
    this.cols = cols;
    this.rows = rows;
    this.cellWidth = this.width/this.cols;
    this.cellHeight = this.height/this.rows;
    this.nodes = [[]];
    this.pause = true;
    this.c = c;

    this.drawBoard = function() {
        c.beginPath();
        c.fillStyle = "rgba(255, 255, 255, 0.7)";
        c.fillRect(0, 0, this.width, this.height);
        for (var i=1;i<=this.cols;++i) {
            this.c.beginPath();
            this.c.moveTo(i*this.width/this.cols, 0);
            this.c.lineTo(i*this.width/this.cols, this.height);
            this.c.strokeStyle = "blue";
            this.c.lineWidth = 0.5;
            this.c.stroke();
        }

        for (var i=1;i<=this.rows;++i) {
            this.c.beginPath();
            this.c.moveTo(0, i*this.height/this.rows);
            this.c.lineTo(this.width, i*this.height/this.rows);
            this.c.strokeStyle = "blue";
            this.c.lineWidth = 0.5;
            this.c.stroke();
        }

        for (var i=1;i<=this.cols;++i) {
            for (var j=1;j<=this.rows;++j) {
                if (nodes[i][j]) {
                    c.beginPath();
                    c.fillStyle = "black";
                    c.fillRect((i-1)*this.cellWidth, (j-1)*this.cellHeight, this.cellWidth, this.cellHeight);
                }
            }
        }
    }

    this.update = function() {
        var newNodes = [];
        for (var i=0;i<=this.rows+1;++i) {
            newNodes[i] = [];
        }
        for (var i=1;i<=this.cols;++i) {
            for (var j=1;j<=this.rows;++j) {
                var cnt =((this.nodes[i-1][j-1]?1:0) +
                            (this.nodes[i-1][j]?1:0) +
                            (this.nodes[i-1][j+1]?1:0) +
                            (this.nodes[i][j-1]?1:0) +
                            (this.nodes[i][j+1]?1:0) +
                            (this.nodes[i+1][j-1]?1:0) +
                            (this.nodes[i+1][j]?1:0) +
                            (this.nodes[i+1][j+1]?1:0));

                if ((this.nodes[i][j]==false && cnt==3) || (this.nodes[i][j]==true && (cnt==2 || cnt==3) )) {
                    newNodes[i][j] = true;
                }
                else {
                    newNodes[i][j] = false;
                }
            }
        }
        console.log("update");
        this.nodes = newNodes;
    }

    this.setNode = function(x, y) {
        this.nodes[Math.ceil(x*this.cols/this.width)][Math.ceil(y*this.rows/this.height)]^= true;
    }

    this.setCols = function(col) {
        this.cols = col;
        this.cellWidth = this.width/this.cols;
        this.init();
    }

    this.setRows = function(row) {
        this.rows = row;
        this.cellHeight = this.height/this.rows;
        this.init();
    }

    this.init = function() {
        for (var i=0;i<=this.cols+1;++i) {
            this.nodes[i] = [];
            for (var j=0;j<=this.rows+1;++j) {
                this.nodes[i][j] = false;
            }
        }
        this.drawBoard();
    }
    return this;
}
