calc-js is a simple demonstration calculator originally written for a
university course on software testing.

A live but not necessarily up to date version lives at
https://calc-js.kaijanaho.fi/index.html

The software lives completely on the browser, with no back end needed.
However, it probably will not work from local file URLs, so you will
need a local web server for development. The Python script server.py
solves that issue (it will not be needed for a production deployment).

Start development in Ubuntu or other Linux:

  python3 -m venv venv

Each time in a new shell:

  . venv/bin/activate

You can run the development localhost server with

  python3 server.py

To work with the Selenium tests

  pip install selenium

(Also make sure you have chromedriver installed.)

You can then run the tests with

  python3 tests/selenium_tests.py PATH-TO-CHROMEDRIVER
