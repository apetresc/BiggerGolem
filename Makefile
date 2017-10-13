BiggerGolem.zip: manifest.json
	zip -r BiggerGolem.zip * -x Makefile README.md .git/ .gitignore

all: BiggerGolem.zip

clean:
	rm BiggerGolem.zip
