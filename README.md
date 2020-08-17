# Bigger Golem

Bigger Golem is an extension that aims to bring a variety of improvements to the popular turn-based board game site [Little Golem](https://www.littlegolem.net/). At the moment, it supports the following features:

- Icon badge shows how many games it is your turn in (contributed by [xentac](https://github.com/xentac))
- Configurable piece sets for Shogi
- Xboard-compatible PGN downloads for Shogi
- Configurable (and resizable) piece sets for Chess
- Configurable (and resizable) piece sets and board color for Reversi (contributed by [Trevor Cook](https://github.com/tdcook))
- Coordinates for Go boards (contributed by [Mathijs Claassen](https://github.com/mathijsclaassen))
- Fix for broken Hex board design scheme
- Fix for broken Hex SGF download
- Head-to-head statistics for every player (contributed by [Mathijs Claassen](https://github.com/mathijsclaassen))

More features are under active development.

This extension is entirely made by a fan of LG and is not officially associated with LG or Richard Malaschitz in any way.

## Installation

The Bigger Golem extension runs on any recent version of Chrome and Firefox.
  - [Chrome Web Store link](https://chrome.google.com/webstore/detail/bigger-golem/camnfciehjhogdibimnoghlbedligapl)
  - [Mozilla Add-On Gallery link](https://addons.mozilla.org/en-US/firefox/addon/bigger-golem/)

Furthermore, Bigger Golem can run as a Userscript on almost any browser. Most features will work identically to the
extension version, except for the icon badge showing how many games are on your turn (because Userscripts cannot do
this). You can install the Userscript in one of the following ways:
  - Manually from [greasemonkey/lg.js](greasemonkey/lg.js)
  - [Greasyfork Userscript link](https://greasyfork.org/en/scripts/37966-biggergolem)

## Configuration

  - On Chrome, you can access the configuration page by right-clicking the BiggerGolem icon and selecting "Options"
  - On Firefox, you must visit `about:addons` and find Bigger Golem in the list of installed add-ons in order to access its configuration options (please fix this, Mozilla!)
  - As a Greasemonkey userscript, you'll have to modify the configuration variables in the code header
