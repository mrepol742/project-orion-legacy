/*
 * 
 * This file is part of Project Orion.
 * Copyright (c) 2022 Melvin Jones
 * 
 * Orion is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU General Public License as published by 
 * the Free Software Foundation, version 3 of the License
 * 
 * Orion is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with Orion. If not, see <https://www.gnu.org/licenses/>.
 * 
 */

module.exports = (st) => {
    // find url/image
    let url = st.match(/\[(.*?)\]\((.*?)\)/);
    if (url != null) {
        st = st.replace(/\[(.*?)\]\((.*?)\)/g, url[2]);
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
    
    return st;
}