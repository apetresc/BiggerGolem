LittleGolem.zip: manifest.json
	zip -r LittleGolem.zip * -x Makefile .git/ .gitignore

all: LittleGolem.zip

clean:
	rm LittleGolem.zip
