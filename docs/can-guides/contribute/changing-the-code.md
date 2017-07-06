@page guides/contributing/code Changing the Code
@parent guides/contribute 7

@description Learn how to contribute a code change to CanJS. Read the [guides/contributing/adding-ecosystem-modules]
guide on how to make a plugin to CanJS.

@body

Now that your computer is set up to [develop DoneJS locally](#developing-locally), you can make changes in your local repository.

The DoneJS projects generally follow the [GitHub flow](https://help.github.com/articles/github-flow/). This section will briefly explain how you can make changes on your computer and submit a pull request to have those changes merged into the main project.

## Creating a new branch

Starting in the DoneJS repository you have cloned to your computer, you can create a new branch:

```shell
git checkout -b your-branch-name
```

Replace `your-branch-name` with the name of your feature branch. You can name the feature branch whatever you’d like. We recommend starting the name with the issue number and a few words related to the issue. For example, for [#295 “Make a contribution guide”](https://github.com/donejs/donejs/issues/295), `295-contribution-guide` is an appropriate branch name.

## Style guide

Where possible, our code generally follows [jQuery’s coding conventions](https://contribute.jquery.org/style-guide/js/).

Where possible, CanJS code uses:

- Tabs not spaces
- JSHint
- CommonJS not ES6
- jQuery’s [coding conventions](https://contribute.jquery.org/style-guide/js/)

## Updating tests

The [`test` directory](https://github.com/donejs/donejs/tree/master/test) contains files related to testing the code in the repository. When fixing bugs or writing new features, you should update the existing tests or create new tests to cover your changes.

After updating the tests, make sure you [run the tests](#running-the-tests).

## Updating the documentation

The [`docs`](https://github.com/donejs/donejs/tree/master/docs) and [`guides`](https://github.com/donejs/donejs/tree/master/guides) directories contain the files used to generate [DoneJS.com](https://donejs.com/).

After making changes, make sure you [build the documentation](#building-the-documentation).

## Submitting a pull request

Once you’ve made your changes and [run the tests](#running-the-tests), you can push your branch to GitHub:

```shell
git push origin your-branch-name
```

Make sure you replace `your-branch-name` with the name of your branch.

Next, go to the DoneJS repository’s [compare changes](https://github.com/donejs/donejs/compare) page and click on “compare across forks.” You’ll need to change the “head fork” to your repository and select your branch name.

After you’ve selected your forked repository and branch, you can click on “Create pull request”. Give your PR a meaningful title and provide details about the change in the description, including a link to the issue(s) your PR addresses. If applicable, please include a screenshot or gif to demonstrate your change. This makes it easier for reviewers to verify that it works for them. [LICEcap](http://www.cockos.com/licecap/) is a great tool for making gifs.

Once you’ve filled out your pull request’s details, click on “Create pull request”. The core team will receive a notification about your pull request and will provide feedback.

GitHub has additional documentation on [creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) that you might find useful.

##  Make your changes

Once you’ve figured out where you need to make changes, you’ll want to complete the following steps
to make those changes and create a pull request so we can include your code in future releases:


1. Create a new feature branch. For example, `git checkout -b html5-fix`.
2. Make some changes to the code and tests.
4. Run `npm test` to make sure the tests pass in all browsers.
5. Update the documentation if necessary.
6. Push your changes to your remote branch.  For example, `git push origin html5-fix`.
7. Submit a pull request! On GitHub, navigate to Pull Requests and click the “New Pull Request” button. Fill in some
   details about your potential patch, including a meaningful title. When finished, press “Send pull request”. The core team will be notified of your submission and will let you know of any problems or a targeted release date.

If you enjoy making these kinds of fixes and want to directly influence CanJS’s direction,
consider joining our [Core team](https://donejs.com/About.html#core-team).
