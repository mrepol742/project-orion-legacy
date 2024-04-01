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

const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get('/', async (req, res) => {
    if (!fs.existsSync("./log/main.log")) res.status(404).send({ message: "No logs found!"});
    res.status(200).send(fs.readFileSync("./log/main.log", "utf8"));
});

module.exports = router;