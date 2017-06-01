#Linx

Software to scrape links and generate M3U playlists from those links.

## Installation

TODO

## Running

The software requires a few pieces of information to get started:

* IP address of firestick
* Web addresses

## Setup

First time users will be prompted with a setup screen. 

- Enter a URL to get links from.
-- if links
--- get urls and display
-- if no links
--- prompt for an additional url
- Choose links to use (default to all)
-- manual link testing can be performed via the app here (v2 will be automated testing)

Once a user has some links setup, it's time to generate the link playlist and then send it to the device.

Generating the Link Playlist is a matter of consuming an array of links and outputting an M3U file.
M3U files have a simple header structure and are followed by directives that declares a playlist items' name, index, and uri.

