# 1.1.0 (2020-06-21)

## Chores

* remove dependency to external module "treeify" (2ec2803e)

## New Features

* **colors:**  add colored output (preset dark/bright, custom colors), add extended help (6a1715a5)

## Other Changes

* add screenshots, update README, add commit guideline doc, adjust app help text (21fb393b)
* add options object to treeifier, prepare colorMode option for application (0ad9d5ea)

## Refactors

* replace call to external treeify library with call to internal Treeifier (77068125)
* introduce a treeify module (Treeifier class) incl. tests (6bb63234)

##### Tests

* add test of custom colors for treeifier (99984167)

# 1.0.1 (2020-06-18)

## Bug Fixes

* add missing dependency "tslib" (1033bbef)

# 1.0.0 (2020-06-17)

## New Features

* **preview:**  display the package content preview as "tree" or "list". improve README doc. (6e1427d7)
* **tree:**  generate preview (treeview) of npm package content for current directory (c9a7ca9b)
