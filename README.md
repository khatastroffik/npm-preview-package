# npm-preview-package

The "**npm-previewpkg**" CLI application generates an overview of the files and directories, which would be part of an npm package when published:
a **package content preview**.

To be more precise, the utility displays the result provided by `npm-packlist` in a user friendly way.

## features

The CLI application implements the following:

- [x] preview as "tree" (default)
- [x] preview as "list"
- [ ] sorted output ("file explorer" like)
- [ ] colored output
- [ ] stats on files size
- [ ] verbose (preview date, header generated out of the package.json content etc.) ???
- [ ] TBD: template output (%previewdate%, %title%, %filelist% etc.) ???

Example output:

```shell
> npm-previewpkg
C:/DEV/npm-preview-package
├─ dist
│  ├─ lib
│  │  ├─ dependencies.d.ts
│  │  ├─ index.js
│  │  ├─ index.ts
│  │  ├─ utils.js
│  │  └─ utils.ts
│  └─ application.js
├─ types
│  ├─ lib
│  │  ├─ index.d.ts
│  │  └─ utils.d.ts
│  └─ application.d.ts
├─ CHANGELOG.md
├─ LICENSE
├─ package.json
└─ README.md
```

## requirements

- **node.js** (circa version >= 8.x)  is required to run the application.
- **npm** (circa version >= 6.x) is used to install the application.
- alternatives to npm (untested): **yarn** etc.

## installation

Either **globally** (accessible from everywhere in the shell):

```shell
> npm install -g @khatastroffik/npm-preview-package
```

or **locally** (as a "development dependency"):

```shell
> npm install --save-dev @khatastroffik/npm-preview-package
```

## usage

You may call the application according to the following schema:

- if installed globally

  ```shell
  > npm-previewpkg [options] [path-to-the-package]
  ```

- if installed locally

  ```shell
  > npx npm-previewpkg [options] [path-to-the-package]
  ```

## options and parameter

| argument | type | description |
|---|---|---|
`-l`, `--list`| option | return a flat list instead of a treeview
`-v`, `--version`| option | output the version of this application
`-h`, `--help` | option | display the help message describing the CLI usage
`[path-to-the-package]` | parameter | the path for which a content preview should be displayed

All arguments are optional i.e. may be omitted.

## CI/CD

This tool could be used to *document a package publication* e.g. as part of a CI/CD workflow.

The CLI would not break the workflow, since it's only generating some text output in the command line (console). The output may be reused/redirected, though.

Example:

  ```shell
  > npm-previewpkg --list > pre-publish-package-content.txt
  ```

## license and repositories

- **License**: MIT - Copyright (c) 2020 Loïs Bégué

- **Code Repository**: The source code of this utility can be found in the following repository: [GitHub :: npm-preview-package](https://github.com/khatastroffik/npm-preview-package)

- **Package Repository**: The installable package containing the utility and the library is available at: [NPM :: npm-preview-package](https://www.npmjs.com/package/@khatastroffik/npm-preview-package)

Note: To conform to the *SoC principle* (Separation of Concerns), the Github repository does not contain the build artifacts and the NPM repository does not contain the sources.
