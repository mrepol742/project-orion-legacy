<?php
$code = $_GET["code"] ?? "";
$lang = $_GET["lang"] ?? "";

if ($code == "") {
    exit("{\"error\":\"742\",\"description\":\"?code (Code) is not defined.\"}");
}
if ($lang == "") {
    exit("{\"error\":\"743\",\"description\":\"&lang (Language) is not defined.\"}");
}

$lang = mb_strtolower($lang,'UTF-8');
if (is_base64($code)) {
    $code = base64_decode($code);
} else {
    exit("{\"error\":\"745\",\"description\":\"Invalid base64 format.\"}");
}

/*
ERR CODE
742 - code is empty
743 - lang is not defined
744 - lang is not supported
745 - invalid base64 format
*/

switch ($lang) {
    case "php":
        $filen = getTimestamp() . ".php";
        write($filen, doContainHeader($lang, $code));
        $output = run("php " . $filen);
        echo $output;
        unlink($filen);
    break;
    case "etc":
        $output = run($code);
        echo $output;
    break;
    case "nodejs":
    break;
    case "dragon":
    break;
    case "java":
    break;
    default:
    exit("{\"error\":\"744\",\"description\":\"Language is not supported.\"}");
    break;
}

function write($file, $content) {
    $myfile = fopen($file, "w") or die("769");
    fwrite($myfile, $content);
    fclose($myfile);
}

function doContainHeader($lang, $content) {
    switch ($lang) {
        case "php":
            if (startsWith($content, "<?php")) {
                return $content;
            }
            if (endsWith($content, "?>")) {
                return "<?php " . $content;
            }
            return "<?php " . $content . " ?>";
            
        break;
        default:
        return $content;
    }
}

function getTimestamp() {
    $timeofday = gettimeofday();
    $mili = sprintf('%d%d', $timeofday["sec"], $timeofday["usec"] / 1000);
    $a = floor($mili / 1000) + rand(0, 90000) + rand(0, 20000);
  return $a;
}

function startsWith($string, $startString) {
    $len = strlen($startString);
    return (substr($string, 0, $len) === $startString);
}

function endsWith($string, $endString) {
    $len = strlen($endString);
    if ($len == 0) {
        return true;
    }
    return (substr($string, -$len) === $endString);
}

function run($cmd) {
    return shell_exec($cmd);
}

function is_base64($s) {
    return (bool) preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $s);
}

?>