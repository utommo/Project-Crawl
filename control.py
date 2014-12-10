#!/usr/bin/pythonRoot
# bring in the libraries
import RPi.GPIO as G     
from flup.server.fcgi import WSGIServer 
import sys, urlparse
import os
 
#Setting up the GPIO pins
#Use the 'BCM' numbering scheme for the pins
G.setmode(G.BCM)
      
#Motor enable
G.setup(28, G.OUT)
G.setup(29, G.OUT)
G.setup(30, G.OUT)
G.setup(31, G.OUT)

G.output(28, True)
G.output(29, True)
G.output(30, True)
G.output(31, True)

#Forward and reverse
#--Right
G.setup(18, G.OUT)
G.setup(23, G.OUT)
#--Left
G.setup(24, G.OUT)
G.setup(25, G.OUT)


#Run cam
os.system('mjpg_streamer -i "/usr/lib/input_uvc.so -d /dev/video0 -r 640x480 -f 30 -n" -o "/usr/lib/output_http.so -p 8090 -w /var/www/" -b')

# all of our code now lives within the app() function which is called for each http request we receive
def app(environ, start_response):
  # start our http response 
  start_response("200 OK", [("Content-Type", "text/html")])
  # look for inputs on the URL
  i = urlparse.parse_qs(environ["QUERY_STRING"])
  yield ('&nbsp;') # flup expects a string to be returned from this function
  # if there's a url variable named 'q'
  if "q" in i:
    if i["q"][0] == "w": 
        G.output(18, True)
    	G.output(23, False)
        G.output(24, False)
        G.output(25, True)
    elif i["q"][0] == "d":
        G.output(18, False)
        G.output(23, True)
        G.output(24, False)
        G.output(25, True)
    elif i["q"][0] == "a":
        G.output(18, True)
        G.output(23, False)
        G.output(24, True)
        G.output(25, False)
    elif i["q"][0] == "s":
        G.output(18, False)
        G.output(23, True)
        G.output(24, True)
        G.output(25, False)
    elif i["q"][0] == "release":
        G.output(23, False)
    	G.output(18, False)
        G.output(25, False)
        G.output(24, False)
    elif i["q"][0] == "halt":
        G.output(23, False)
        G.output(18, False)
        G.output(25, False)
        G.output(24, False)

#by default, Flup works out how to bind to the web server for us, so just call it with our app() function and let it get on with it
WSGIServer(app).run()
