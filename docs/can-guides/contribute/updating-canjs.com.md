@page guides/contributing/updating-canjs.com Updating canjs.com
@parent guides/contribute 12
@outline 2
@description Release and hosting information for CanJS maintainers.

@body

canjs.com is hosted on [GitHub pages](https://pages.github.com/) from the [canjs/canjs#gh-pages](https://github.com/canjs/canjs/tree/gh-pages) branch. To generate and push a new version of the website, verify you have push access to that branch. Then get all latest changes via:

```
git checkout master
git fetch --all && git rebase
npm cache clean
rm -rf node_modules
npm install
```

We also have to delete the local `gh-pages` branch:

```
git branch -D gh-pages
```

Then run

```
make
```

This will generate and publish a new version of the website.
