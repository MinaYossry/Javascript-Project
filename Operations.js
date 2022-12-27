var Operations = function () {
    this.sortOperations = [];
    this.interval = null;
    this.isSorting = false;
    this.currentIndex = 0;
    this.moving = false;

    this.push = function (operation) {
        this.sortOperations.push(operation);
    };

    this.empty = function () {
        this.sortOperations = [];
    }

    this.stopSorting = function () {
        this.currentIndex = 0;
        this.isSorting = false;
        clearInterval(this.interval);
        view.finishAnimation();
    };

    this.step = function (view) {
        if (this.currentIndex > 0) {
            view.glow(this.sortOperations[this.currentIndex - 1].firstIndex, view.defaultColor);
            view.glow(this.sortOperations[this.currentIndex - 1].secondIndex, view.defaultColor);
            $(".sorted").css("backgroundColor", view.sortedColor);
        }

        view.glow(this.sortOperations[this.currentIndex].firstIndex, view.focusedColor);
        view.glow(this.sortOperations[this.currentIndex].secondIndex, view.focusedColor);

        if (this.sortOperations[this.currentIndex].swap)
            view.swap(this.sortOperations[this.currentIndex].firstIndex, this.sortOperations[this.currentIndex].secondIndex);

        if (this.sortOperations[this.currentIndex].lastSortedIndex)
            $("#n" + this.sortOperations[this.currentIndex].lastSortedIndex).addClass("sorted");



        this.currentIndex++;
        if (this.currentIndex == this.sortOperations.length) {
            this.stopSorting();
        }
    }

    this.startSortingAnimations = function (view) {
        this.moving = true;
        this.isSorting = true;
        var that = this;
        this.interval = setInterval((function () {
            this.step(view);
        }).bind(that), 600);

    }

    this.start = function (view) {
        if (!this.moving)
            this.startSortingAnimations(view);
    }
    this.pause = function () {
        clearInterval(this.interval);
        this.moving = false;
    }

    this.backward = function (view) {
        if (!this.moving && this.currentIndex > 0) {
            this.currentIndex--;
            this.forward(view);
            this.currentIndex--;
        }
    }
    this.forward = function (view) {
        if (!this.moving) {
            this.step(view);
            this.moving = true;
            setTimeout(() => {
                this.moving = false;
            }, 600);
        }
    }
}

var Operation = function (_firstIndex, _secondIndex, _lastSortedIndex, _swap) {
    this.firstIndex = _firstIndex;
    this.secondIndex = _secondIndex;
    this.lastSortedIndex = _lastSortedIndex
    this.swap = _swap;
}