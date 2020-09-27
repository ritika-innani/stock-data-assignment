#!/bin/bash

mongoimport --db sensex --collection stockData --drop --type csv --headerline --maintainInsertionOrder --file scripts/data.csv
