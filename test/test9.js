let a = [{
    name: "function",
    parameters: "";
    description: "This is a function",
    
    exec: function(a) {
        if (a == null) {
            return b("Please do an action");
        }
        return a;
    }
}]

function b(aa) {
    return "Yup"
}
console.log(a[0].exec(null));