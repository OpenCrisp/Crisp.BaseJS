<%= grunt.banner %>
"use strict;"

require("../src/BaseJS");
require("../src/BaseJS-control");
require("../src/global-Array");
require("../src/global-Boolean");
require("../src/global-Date");
require("../src/global-Number");
require("../src/global-Object");
require("../src/global-RegExp");
require("../src/global-String");

module.exports = require("<%= testfile %>");
