mkdir build
mkdir output

cp index.js build
cp -r src build
cp package.json build
cp .gitignore build

cd build

mkdir cache
cd cache
echo ' ' >> .gitkeep
cd ..

mkdir data
cd data

echo ' ' >> .gitkeep
echo '[]' >> apikey.json
echo '["https://mrepol742.github.io", "http://0.0.0.0:8000", "localhost"]' >> cors.json
echo '{}' >> functionRegistry.json
echo '{}' >> groups.json
echo ' ' >> pin.json
echo '{"preference":{"antiLeave":true,"tagalog":false,"isStop":false,"max_image":"12","text_complextion":"text-davinci-003","primary_text_complextion":"gpt-3.5-turbo-16k-0613","onUnsend":true,"onNsfw":true,"preventSimultaneousExecution":true,"onDelay":false,"frequency_penalty":"0","temperature":"0.5","max_tokens":"2048","presence_penalty":"0","probability_mass":"1","prefix":"ip","timezone":"Asia/Singapore","isDebugEnabled":false,"isEnabled":false,"autoMarkRead":false,"online":true,"selfListen":true,"sendTypingIndicator":false,"autoMarkDelivery":false,"error":3252001,"angry":false},"apikey":{"ai":"sk-fb991c1bde568371e620fa708a16628568","facebook":"6628568379%7Cc1e620fa708a1d5696fb991c1bde5662"},"restart":[],"ignored_prefixes":["ignore"],"pin":{},"tokens":{"gpt":{"prompt_tokens":0,"completion_tokens":0,"total_tokens":0},"davinci":{"prompt_tokens":0,"completion_tokens":0,"total_tokens":0},"dell":0}}' >> shared_pref.json
echo '{}' >> threadRegistry.json
echo '{}' >> users.json


mkdir cookies
cd cookies
echo ' ' >> .gitkeep
echo '{}' >> uid.bin

cd ..
cd ..
cd ..
cd obfuscate
node obfuscate.js
cd ..

echo 'done'