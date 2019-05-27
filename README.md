# tagable
Thingy for adding tags to images/resources/whatever
Will make a tagable-web first and put it on my website, then generalise it and make it an npm package.

```
new tagable() {
  _objects = {
    "c:/pics/cat.png": {id: "S81A_9S", tags: ["cute", "fluffy"] //displays in same order},
    "c:/pics/dog.png": {id: "EF4_aD2", tags: ["cute", "good"]},
    ...
  }
  
  _sort = rank | count | alphabetical 
  
  _tags = {
    "cute": {tags: ["S81A_9S", "EF4_aD2", ...], shield: shielder(see https://www.npmjs.com/package/shields), ...}, 
    "fluffy": {tags: ["S81A_9S", ...], ...},
    "good": {["EF4_aD2", ...], ...},
    ...
  }
  
  constructor(options:{objects?, tags?}?) {
    _objects = objects
    for (object, objects) {
      for (tag, tags) {
        _tagged[tag][]
      }
    }
  }
  
  function tags(resource) {
    return _objects[resource].tags
  }
  
  function tag(label) {
    return _tags
  }
  
  tag.get count() {
    return tag.length
  }
  
  set resource tag
  reorder resource tags
  resource tag properties override
  set tag colour
  delete tag
  remove resource
  validate references
  resources more complex than a URL
  change sort type
  set tag rank
  get all tags
  get all resources that have tag
  get all resources that dont have tag
  custom tag styling, incl' mobile views
  define behaviour/relationship of tag <-> resource
}

private generateID() {
  //probably some import idk, just need to make some way to reference, but may use a real language like C instead
  //if JS is really pass-by-value for primitives and pass-by-reference for objects, then this may not be needed
}

import(tagablejson) {
  JSON.parse(read(tagablejson))
  //edit permission comes solely from whoever controls the source
}
export(tagablejson){
  write(tagablejson, JSON.stringify([_objects, _tags]))
}


```
