function createCounter(init) {
    let current = init;

    return {
        increment: function () {
            current++;
            return current;
        },
        decrement: function () {
            current--;
            return current;
        },
        reset: function () {
            current = init;
            return current;
        }
    };
}
