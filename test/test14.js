// string with custom fonts
const str = 'hello this is an example of a java code ```java hello ``` and ```java wow```';

const regex = /```(.*?)```/gs;
const matches = [...str.matchAll(regex)];

const code = matches.map(match => match[1]);

for (co in code) {
    str.replace(code[co], code[co].normalize("NFKC"));
}

// final string without fonts
console.log(str)