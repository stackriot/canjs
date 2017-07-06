@page guides/contributing/project-organization Project Organization
@parent guides/contribute 2

@description Learn about how CanJS is organized.

@body

The first thing to know about `CanJS` is that its code is split across about 40 different
repositories.  All but one of these are __library__ repositories like
[canjs/can-event](https://github.com/canjs/can-event) and [canjs/can-define](https://github.com/canjs/can-define).  These all work the same way.
The [canjs/canjs](https://github.com/canjs/canjs) __framework__ repository works slightly
differently.  The vast majority of code changes happen in one of the __library__
repositories.

If you don’t know which repository you need to work on, ask us in [Gitter chat](https://gitter.im/canjs/canjs).

## File organization and responsibilities

Most __library__ repositories share a similar structure.  Understanding it can help
you figure out what code needs to be changed.  The following outline shows the
directory structure of a nonexistent `can-example` repository:

```
├── .editorconfig           — Configures editors for this project
├── .gitignore              — Tells git to ignore certain files
├── .jshintrc               — Configures JSHint
├── .npmignore              — Tells npm publish to ignore certain files
├── .travis.yml             — Travis CI configuration
├── build.js                — Build script to export code in other formats
├── can-example.js          — Main module code
├── package.json            — Configuration of package and dev scripts
├── readme.md               — Automatically generated readme
├── docs/                   — Documentation source
|   ├── can-example.md      — Package or module documentation
├── node_modules/           — Node dependency installation folder
├── test/                   — Test files
|   ├── can-example-test.js — Main test file
|   ├── test.html           — Main test page
```

Generally speaking, the most important files are:

 - the main module —  `can-example.js`
 - the main test module — `test/can-example-test.js`
 - the test page — `test/test.html`

To fix a bug or making a feature, add a test in the main test module, update code in the main module, and then verify the tests are passing by running
the test page.

Some modules have multiple modules, test modules, and test pages.  These modules are
commonly organized as __modlets__ where each folder will have its own main module, test module,
and test page:

```
├── a-module/            — Module’s modlet folder
|   ├── a-module.js      — The module
|   ├── a-module-test.js — The module’s tests
|   ├── test.html        — A test page that runs just the module’s tests
```

## Priority, Tags, and Complexity

The [core team](https://donejs.com/About.html#team) reviews issues
and assigns them a `p0` to `p4` tag corresponding to the following priorities:

- `p0` - An issue that will preempt any other issues currently being worked on.
- `p1` - A critical feature or bug that needs to be fixed to keep CanJS’s high degree of quality.
- `p2` - A feature or bug that is less likely to be encountered, but something we intend to get to.
- `p3` - A nice to have. The OS team might get to it, but it’s helpful if the community assists.
- `p4` - A nice to have that the OS team will accept, but will be unlikely to prioritize any effort towards.

There are several ways to influence these priorities:

 - Offer to pair with a contributor on a solution.
 - Write a good test.
 - Come to a DoneJS Contributors meeting and make your case.
 - Get others from other organizations to `+1` the issue.
 - Make your case on Gitter with a contributor or in the issue.
 - You can always hire [Bitovi](https://www.bitovi.com) or a contributor to make the change.

Also, the core team will often include a complexity indicator in the title that looks like
`~NUMBER`.  This is a fibonacci number.  `~1` means its an extremely simple task.  `~8` is about
a half day task.  `~34` might take a week of experimentation.
