# tagable
Thingy for adding tags to images/resources/whatever

```
new tagable() {
  _objects = {
    "c:/pics/cat.png": {id: "S81A_9S", tags: ["cute", "fluffy"]},
    "c:/pics/dog.png": {id: "EF4_aD2", tags: ["cute", "good"]},
    ...
  }
  
  _tags = {
    "cute": {tags: ["S81A_9S", "EF4_aD2", ...], colour: "red", ...}, /*See https://shields.io/endpoint for the parameters*/
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
  set tag colour
  get all tags
  delete tag
  remove resource
  validate references
  more complex resources
  more options
}

private generateID() {
  //probably some import idk, just need to make some way to reference, but may use a real language like C instead
}

import(tagablejson) {
  JSON.parse(read(tagablejson))
}
export(tagablejson){
  write(tagablejson, JSON.stringify([_objects, _tags]))
}


```
