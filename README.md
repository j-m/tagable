<p align="center">
  <img src="./img/logo.png" alt="tagable"/>
  <br/>
  <a href="https://github.com/j-m/tagable/actions"><img src="https://github.com/j-m/tagable/workflows/master/badge.svg" alt="master stability"/></a>
  <a href="https://github.com/j-m/tagable/actions"><img src="https://github.com/j-m/tagable/workflows/latest/badge.svg" alt="latest stability"/></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/j-m/tagable.svg" alt="greenkeeper badge"/></a>
  <img src="https://badgen.net/runkit/count-i57yigrtdbjf" alt="hits"/>
</p>

## About

The idea is to provide a simple platform that can be used to tag abstracted resources.  

## Development

> The implementation is subject to major changes until a v1 release, from which point versioning will be [semver](https://semver.org)

This project is built with Typescript.  
To get started, run `npm install` to install dependencies.

Feel free to open issues or pull requests with any suggestions, problems, or improvements you may have.

### Maintainers

- Jonathan Marsh - [j-m](https://github.com/j-m)

## See also

- [oaty](https://github.com/jmsv/oaty): Transposes the tagable's data to boost performance
- [spotable](https://github.com/j-m/spotable): Tagable for Spotify. Create playlists on the fly by filtering tags that you define
- [PicTag](https://github.com/j-m/PicTag): Forget traditional albums, this is an implementation of tagable that lets you tag images so that one picture can belong to many albums.
- [What-to-look-for](https://github.com/j-m/What-to-look-for): a better way to remind yourself of past blunders, and organise yourself better, using tagable's tag ancestory structure

## Changelog

#### `0.4.0`

- Implementation change.
  - Getters now return an object
- Finalised generics works.

#### `0.3.1`
Sync GitHub packages and NPM

#### `0.3.0`

- Implementation change.
  - ID now separated for Tag and Resource classes.
  - Tagged class removed.
  - Now using generics.

#### `0.2.0`

- Implementation change. ID now required for Tag and Resource classes.
- Remove dependency on `randomstring`

#### `0.1.4`

- Added returns to new getters

#### `0.1.3`

- Removed dependency on FS (TAG-12)

#### `0.1.2`

- Committed `dist` files with `npm build`

#### `0.1.1`

- Added `getTagsByResourceID` and `getResourcesByTagID`

#### `0.1.0`

- Initial proof of concept
