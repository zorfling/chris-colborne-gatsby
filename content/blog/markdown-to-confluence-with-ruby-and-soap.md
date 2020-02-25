---
path: markdown-to-confluence-with-ruby-and-soap
date: 2015-01-18T12:23:44.167Z
title: Markdown to Confluence with Ruby and SOAP
description: >-
  This post follows on from my previous post about the SharePoint to Markdown
  ripper.
---
This post follows on from my previous post about the SharePoint to Markdown ripper. You can [go back and read it if you'd like](/sharepoint-scraping-with-python-mechanize-and-beautiful-soup/).

---

So once I'd extracted our SharePoint wiki as markdown, it was time to find a way to import that into Confluence.

I'd used the markdown editor of the Insert Markup function which worked great, but for ~300 separate pages, I needed a slightly more efficient method than copy paste into a text box.

My first thought was to try find a SOAP or REST API to perform the page creation. I presumed since the Insert Markup function could do it, there might be an API for it. However I wasn't able to find anything to provide Markdown page creation. So I needed to find another answer.

I found a GitHub repo for a [markdown to confluence uploader](https://github.com/LanyonM/markdown-to-confluence-uploader) designed to import a single markdown file into an existing page using the Confluence SOAP api. 

Obviously I needed something to iterate through a directory of files, and to create, rather than use an existing page, but it seemed like a good start.

So I [forked the repo](https://github.com/zorfling/markdown-to-confluence-uploader) and added an option to provide a parent page to house the newly created pages.

I then used awk and xargs to iterate through the files importing under a page I'd created for the legacy wiki.

    ls output/ | awk '{ print "output/" $1 }' | xargs -I {} ./md2confl.rb -s SS -c http://myconfluence.net -t1671258 --markdownFile {}

This imported my 300 legacy SharePoint pages into Confluence in a flash.

However, there were some conversion issues, so this is still a work in progress. 

The script I forked uses the [markdown2confluence](https://github.com/jedi4ever/markdown2confluence) gem, which by it's own admission is not a 100% conversion. 

In fact there is an [outstanding issue](https://github.com/jedi4ever/markdown2confluence/issues/3) regarding the nested list problem that I faced on the gem's GitHub page. I intend to fork and submit a pull request to solve this issue when I get a chance.

All in all, this gets me almost to the point of being able to move across to Confluence. I hope it might help someone else in the same boat.

###### Get the source
Fork or clone the markdown to confluence uploader on [GitHub](https://github.com/zorfling/markdown-to-confluence-uploader). Issues and pull requests welcome!
