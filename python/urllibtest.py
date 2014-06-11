from __future__ import division
# -*- coding: utf-8 -*-
import nltk, re, pprint, sys, urllib2

from HTMLParser import HTMLParser

links  = []

class BodyParser(HTMLParser):

    def __init__(self):
        HTMLParser.__init__(self)
        
    def handle_starttag(self, tagname, attribute):
        
        
        if tagname.lower() == "a":
            for i in attribute:
                #print i
                
                if i[0].lower() == "href":
                    if i[1].lower().count('/products/'):
                        if not i[1].lower().count('http://www'):
                            #print i[1]
                            links.append(i[1])                    


class TextParser(HTMLParser):

    def __init__(self):
        HTMLParser.__init__(self)
        
    def handle_starttag(self, tagname, attribute):
        if tagname.lower() == "span":
            for i in attribute:
                print i
#                if i[0].lower() == "class":
#                    if i[1].lower() == "text":
                            


def urllibtest():
    
    url = "http://www.newsinlevels.com/"
    htmldata = urllib2.urlopen(url)

    parser = BodyParser()
    parser.feed(htmldata.read())
    
    
    full_urls = []
    for i in links:
        url_sub = url[:-1]  # お尻の１文字を消す
        i_sub = i[:-1]      # お尻の１文字を消す
        
        full_url1 = url_sub + i_sub + '-level-1/'
        full_urls.append(full_url1)
        full_url2 = url_sub + i_sub + '-level-2/'
        full_urls.append(full_url2)
        full_url3 = url_sub + i_sub + '-level-3/'
        full_urls.append(full_url3)

    # TODO full_urlsから重複をけす

    # 確認
    for i in full_urls:
        url_page = "http://www.newsinlevels.com/"
        htmldata_page = urllib2.urlopen(url_page)
    
        parser = TextParser()
        parser.feed(htmldata_page.read())
        #print i
        htmldata_page = urllib2.urlopen(url_page)
    
    htmldata.close()
    '''
    
    
    url = "http://www.newsinlevels.com/products/wedding-party-in-the-water/"
    url = "http://www.newsinlevels.com/products/wedding-party-in-the-water-level-3/"
    
    htmldata = urllib2.urlopen(url)

    parser = TestParser()
    parser.feed(htmldata.read())
        
    htmldata.close()
    
    '''
    
    
urllibtest()

print 'complete'

