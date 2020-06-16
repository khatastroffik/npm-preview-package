# npm-preview-package

This CLI application i.e. utility generates an overview of the files and directories, which would be part of an npm package when published:
a **package content preview**.

To be more precise, the utility displays the result provided by `npm-packlist` in a user friendly way.

## features

The CLI application implements the following:

- preview as "tree" (default)
- preview as "list"
- sorted output ("file explorer" like)
- TBD: colored output
- TBD: stats on files size
- TBD: verbose (preview date, header generated out of the package.json content etc.) ???
- TBD: template output (%previewdate%, %title%, %filelist% etc.) ???

Example output:

```text
C:/DEV/npm-preview-package
├─ dist
│  ├─ lib
│  │  ├─ index.js
│  │  └─ utils.js
│  └─ application.js
├─ types
│  ├─ lib
│  │  ├─ index.d.ts
│  │  └─ utils.d.ts
│  └─ application.d.ts
├─ package.json
└─ README.md
```

## Requirements

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

## License and Source Code

- **License**: MIT

- **Code**: The source code of this utility can be found in the following repository: TBD
