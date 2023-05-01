"use strict";

const FormData = require("form-data");
const dns = require("dns");
const fs = require("fs");
const http = require("http");
const https = require("https");
const os = require("os");
const crypto = require("crypto");
const WeatherJS = require("weather-js");
const GoogleTTS = require("google-tts-api");
const google = require("googlethis");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    FormData: FormData,
    dns: dns,
    fs: fs,
    http: http,
    https: https,
    os: os,
    crypto: crypto,
    WeatherJS: WeatherJS,
    GoogleTTS: GoogleTTS,
    google: google,
    axios: axios,
    Configuration: Configuration,
    OpenAIApi: OpenAIApi,
};
