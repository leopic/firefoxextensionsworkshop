#!/bin/bash

# bundle extension (zip it)
zip 'smoketest@backcountry.com.xpi' -r *.* lib scripts
echo 'done with zip'
# move it to current ff profile
mv 'smoketest@backcountry.com.xpi' '/home/leopic/.mozilla/firefox/vkuuxfit.default/extensions'
echo 'added new extension'
# open firefox with url
firefox -new-window 'http://google.com'