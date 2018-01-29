BiggerGolem.zip: manifest.json
	zip -r BiggerGolem.zip * -x Makefile README.md greasemonkey/ .git/ .gitignore

greasemonkey/lg.js: 
	cat "greasemonkey/header" "greasemonkey/config.js" "src/chess_style.js" "src/go_style.js" "src/shogi_style.js" "src/reversi_style.js" "src/hex_style.js" "greasemonkey/main.js" > greasemonkey/lg.js

all: BiggerGolem.zip greasemonkey/lg.js

clean:
	rm -f BiggerGolem.zip
	rm -f greasemonkey/lg.js
