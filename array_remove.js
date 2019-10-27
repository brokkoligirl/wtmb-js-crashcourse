// helper function to remove specific value from an array
function arrayRemove(arr, value) {
    return arr.filter(function (arrElement) {
        return arrElement != value;
    });
}

module.exports = arrayRemove;
