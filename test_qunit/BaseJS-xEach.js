<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit BaseJS-xEach tests</title>
  <link rel="stylesheet" href="../libs/qunit/qunit-1.18.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="../libs/qunit/qunit-1.18.0.js"></script>
  <script src="../src/BaseJS.js"></script>
  <script src="../src/BaseJS-control.js"></script>
  <script src="../src/global-Array.js"></script>
  <script src="../src/global-Boolean.js"></script>
  <script src="../src/global-Date.js"></script>
  <script src="../src/global-Number.js"></script>
  <script src="../src/global-Object.js"></script>
  <script src="../src/global-RegExp.js"></script>
  <script src="../src/global-String.js"></script>
  <script>
  var exports = {};
  </script>
  <script src="../test/BaseJS-xEach_test.js"></script>
  <script>
  for (var item in exports) {
    QUnit.test( item, exports[item] );
  }
  </script>
</body>
</html>