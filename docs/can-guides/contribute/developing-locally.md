@page guides/contributing/developing-locally Developing Locally
@parent guides/contribute 6

@description Learn how to set up your development environment, get the code, and verify that it’s working

@body

This page will walk you through setting up the [main CanJS repository](https://github.com/canjs/canjs) on your computer. Remember that CanJS is [split into multiple repositories](#project-organization), but you can apply the same general steps to set up any of the other repos.

We’ll cover the following details in this guide:

- Setting up your development environment.
- Getting the repository’s code and verify it’s working.
- The file organization and responsibilities.
- Making changes and submitting a pull request.

The following video walks through most of the following steps:

<iframe width="560" height="315" src="https://www.youtube.com/embed/PRuueWqnpIw" frameborder="0" allowfullscreen></iframe>

## Setting up your development environment

Developing CanJS requires:

 - A [GitHub](https://github.com/) account and git client.
 - Node.js version 5 or later.
 - Firefox for running automated tests.

### Getting GitHub account and client

Sign up for a [GitHub](https://github.com/) account.  

There are a variety of ways to get a git command line client
connected to your GitHub account. GitHub has
great documentation on how to [set up Git](https://help.github.com/articles/set-up-git/).


If you already have `git` installed, make sure you’ve
[set up your ssh keys](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/).

### Get Node.js

Download Node.js version 5 or later at [NodeJS.org](https://nodejs.org).  You can
verify Node’s version with:

```
node -v
```

### Get Firefox

Download the Firefox browser
[here](https://www.mozilla.org/en-US/firefox/new/). Make sure it gets installed into the
default location for your operating system.

Firefox is used to run each repository’s tests.


## Getting the code and verifying that it’s working

Once your environment is set up, you should be able to clone the repository you
want to change, install its dependencies, and verify you’ve set up your
development environment correctly.

__1.__  Click the __Fork__ button to fork the repository from which you will be working.
For example, you can fork `can-compute` by pressing its __Fork__ button on GitHub:

<img src="../../../docs/can-guides/contribute/fork.png" width="600px"/>


__2.__ Clone your forked version of the repository:

```
git clone git@github.com:<your username>/<repository-name>.git
```

For example, if your username is `justinbmeyer` and you forked `can-compute`:

```
git clone git@github.com:justinbmeyer/can-compute.git
```

__3.__ Move into your project’s directory.  For example

```
cd can-compute
```

__4.__ Install npm dependencies with:

```
npm install
```

__5.__ Make sure Firefox is closed and run the test suite with:

```
npm test
```

If every test passed, __congrats__! You have everything you need to
change code and have the core team review it.
