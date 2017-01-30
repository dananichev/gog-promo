# Notes

* due to ``oninput`` event usage (for positioning different elements related to slider) only modern browsers are supported
* i'm using ``CSS Next`` as preprocessor via ``POSTCSS``
* both ``Babel`` and ``autoprefixer`` are using ``browserlist``
* no mobile support - minimum width = 970px (yet?)

## Build 

* run ``npm install``
* run ``npm run disst``
* ready-to-use bundle with all static files will be available inside ``./dist`` folder (keep in mind -- all files referenced in html/css/js has relative paths to index.html)

## Sprite generation

To generate sprites for icons/logos you can use images inside ``src/assets/logos|icons|backgrounds`` folders.
For example, you can use ``sprity`` (https://github.com/sprity/sprity) for this purpose. But while it generates sprites pretty correctly the result css not entirely correct (you will need to fix some background-offsets by yourself).
Plus, you will need to optimize resulting PNG files afterwards. 

Generated styles should be placed into ``src/styles/(logos|icons|backgrounds).css`` respectively.
