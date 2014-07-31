# Egg!

A mathematical equation to create an egg!

[See the Egg curve!](http://alyssaq.github.io/egg)

Made with all the love and amusement with canvas

## Develop
1. Edit files in `src`
1. View `src/index.html` in the browser

## Production
1. npm install
1. grunt (to create publish-ready `app`)
1. View `app/index.html` in the browser


## Deploy `app` to gh-pages
Delete gh-pages branch if it exists
```sh
  $ git branch -d gh-pages
  $ git push origin :gh-pages
```

Deploy `app` folder

```sh
  $ git subtree push --prefix app origin gh-pages
```

## Future Features
Mr. Potato head / paper doll / add facial features to the egg!
- [Potential eyeball](http://jsbin.com/gatit/5)
- more facial parts...

## Reference
[http://www.mathematische-basteleien.de/eggcurves.htm](http://www.mathematische-basteleien.de/eggcurves.htm)

## License
[MIT](http://alyssaq.github.io/mit-license/)
