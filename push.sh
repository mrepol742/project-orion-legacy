#
 #
 # Copyright (c) 2023 Melvin Jones Repol (mrepol742.github.io). All Rights Reserved.
 #
 # License under the Mrepol742 License, version 1.0 (the "License");
 # you may not use this file except in compliance with the License.
 # You may obtain a copy of the License at
 #
 #     https://github.com/mrepol742/Mrepol742-the-License
 #
 # Unless required by the applicable law or agreed in writing, software
 # distributed under the License is distributed on an "AS IS" BASIS,
 # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 # See the License for the specific language governing permissions and
 # limitations under the License.
 #

prettier index.js --write
 
node --check index.js
jshint index.js

cd src
node --check arrays.js
node --check cmd.js
node --check remmd.js
jshint arrays.js
jshint cmd.js
jshint remmd.js
cd ..

git add .
git commit -m "Initial Commit"

npm version patch

git push origin master