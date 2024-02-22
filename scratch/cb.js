async function test(cb) {
cb(true)
cb(false)
}


test(function (isTrue) {
    console.log(isTrue);
    isTrue.remove();
});

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}