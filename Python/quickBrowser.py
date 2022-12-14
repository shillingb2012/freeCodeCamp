import urllib.request, urllib.parse, urllib.error

#shorthand version for webBrowser.py
#uses urllib library for easier calls

fileHandle = urllib.request.urlopen('http://data.pr4e.org/romeo.txt')
for line in fileHandle:
    print(line.decode().strip())