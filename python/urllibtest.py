from __future__ import division
# -*- coding: utf-8 -*-
import nltk, re, pprint, sys, urllib2

from HTMLParser import HTMLParser

class TestParser(HTMLParser):

    def __init__(self):
        HTMLParser.__init__(self)
        
    def handle_starttag(self, tagname, attribute):
        if tagname.lower() == "a":
            for i in attribute:
                #print i
                if i[0].lower() == "href":
                    print i[1]
                    


def urllibtest():
    
    url = "http://www.newsinlevels.com/"
    htmldata = urllib2.urlopen(url)

    parser = TestParser()
    parser.feed(htmldata.read())
        
    htmldata.close()
    
urllibtest()

