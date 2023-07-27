let st  = "*test* [test](https://test.com)";

// find the url/image
st = st.replace(/\[(.*?)\]/g, "");
let url = st.match(/\((.*?)\)/);
st = st.replace(/\((.*?)\)/g, url[1]);

// find the bold/italic text
let boldi = st.match(/\*\*\*(.*?)\*\*\*/);
st = st.replace(/\*\*\*(.*?)\*\*\*/g, boldi[1]);

// find the bold text
let bold = st.match(/\*\*(.*?)\*\*/);
st = st.replace(/\*\*(.*?)\*\*/g, bold[1]);

// find the italic
let italic = st.match(/\*(.*?)\*/);
st = st.replace(/\*(.*?)\*/g, italic[1]);

// replace code block
st = st.replace("```", "");

console.log(st);