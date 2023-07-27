let st  = "*test* ***hello*** ```hi``` [test](https://test.com)";

// find the url/image
st = st.replace(/\[(.*?)\]/g, "");
let url = st.match(/\((.*?)\)/);
if (url != null) {
st = st.replace(/\((.*?)\)/g, url[1]);
}

// find the bold/italic text
let boldi = st.match(/\*\*\*(.*?)\*\*\*/);
if (boldi != null) {
st = st.replace(/\*\*\*(.*?)\*\*\*/g, boldi[1]);
}

// find the bold text
let bold = st.match(/\*\*(.*?)\*\*/);
if (bold != null) {
st = st.replace(/\*\*(.*?)\*\*/g, bold[1]);
}

// find the italic
let italic = st.match(/\*(.*?)\*/);
if (italic != null) {
st = st.replace(/\*(.*?)\*/g, italic[1]);
}

// replace code block
st = st.replaceAll("```", "");

console.log(st);