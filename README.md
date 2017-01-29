# Build 

* run ``npm install``
* run ``npm run disst``
* ready-to-use bundle with all static files will be available inside ``./dist`` folder (keep in mind -- all files referenced in html/css/js has absolute paths)

# Sprite generation

To generate sprites for icons/logos you can use images inside ``src/assets/logos|icons|backgrounds`` folders.
For example, you can use ``sprity`` (https://github.com/sprity/sprity) for this purpose.

Generated styles should be placed into ``src/styles/(logos|icons|backgrounds).css`` respectively.
