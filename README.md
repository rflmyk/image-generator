# IMAGE GENERATOR

## This is a image generator url parameter

[Click here to see a real example](https://image-generator-rflmyk.herokuapp.com/)
_let me know whether this App doesn't work ;)_

Allow you chose:

  - Color
  - Background
  - Size
  - Extension
  - text

### How use
```sh
$ npm i
```
**obs: In OSX you should install: _pkg-config cairo libpng jpeg giflib_**

For this run:

```sh
$ brew install pkg-config cairo libpng jpeg giflib
```

The url defaul is : 
````
http:// [ YOURDOMAIN ] /png?size=300x300&text=YOUR+TEST&color=fff&background=ccc
````

Settings default:
````JS
{ 
	size: "300x300"
	text: "300x300"
	background: "ccc" //set here hexadecimal without "#"
	color: "fff" //set here hexadecimal without "#"
	formatt: "png"
}
````
