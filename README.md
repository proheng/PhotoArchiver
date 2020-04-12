# Caveat

This is a small tool I made in a very brief of time, in order to archive my very old photos in Year/Month folder.  It is not built for enterprise purpose. DO NOT simply use it in commerical environment without thorough testing. 

The source code is released under MIT. Feel free to fork it, modify to fit your own need. Enjoy coding :) 

# Setup 
1. Install Node.js 
1. open command line, and navigate to the source code directory, then run ```npm install```

# Usage

__Caution: Make another backup copy of your photo directory before running the command below, just in case any unexpected error occurs.  __

## Pre-requisite 
1. Make sure all photos are in a folder, but not nested inside any subfolders. 

## Archiving 
1. Open command line, and navigate to the source code root folder.
1. Run ```node index.js "The path to your photo root directory"```
1. The script will go through all the photos in the directory and archive them in to Year/Month folder structures.

## Extract Photos from nested directory
You may want to extract files(photos) from nested directory and dump them all on a root directory.
1. Run ```node falttenStructure.js "The path to your photo root directory"```