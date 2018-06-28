# Email digest generator

I run a newsletter on [ https://www.skillcollector.com ]( https://www.skillcollector.com ) which takes some manual (dumb) work. This script automates a bunch.

When running `npm start` it reads the `INPUT` file in the top directory, generates HTML and writes it to an `OUTPUT.html` file.

To run a `.env` file is required which contains:

```
smmryapikey=API_KEY_FOR_SMMRY
ytkey=API_KEY_FOR_YOUTUBE
```

I don't expect anyone to use this, but anyone is welcome to do so.