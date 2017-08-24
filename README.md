# Client History - lightweight library to store items in localStorage as JSON.
Need to store user actions, but your database would be too big for every user's actions?
Store them in localStorage. This library can help you with it.

## _Feel free to use, check [JSDoc](https://github.com/bckr75/client-history/blob/master/src/index.js) for more information._
#### Wanna see in action? [Check this page](https://bckr75.github.io/client-history/tests/)

## Installation
```
  npm i client-history
```

## Usage
### Import library or add to page as ordinary script

#### NPM
```javascript
  const ClientHistory = require('client-history');
```
#### ES6
```javascript
  import ClientHistory from 'client-history';
```
#### Standalone script
Just copy lib.min.js from directory lib to one of your site folders, then add script on page.
```html
  <script type="text/javascript" src="path/to/lib.min.js"></script>
```

### Use in your code

#### _constructor(initObj)_
```javascript
  let clientHistory = new ClientHistory({
    name: 'login',
    defaults: {
      limit: 10
    },
    checkFields: ['ip']
  })
```
###### Fields description:
`name`: Mandatory, array of items will be saved as JSON string to localHistory with this name.

`defaults`: Optional, settings object. By now you can only set the limit of items to save in array. Thus if you will push an item to the array that exceeding items limit, first element in array will be removed, and your item added at the very end of it.

`checkfields`: Optional, if set - your pushing item will be compared to all items in localStorage. If your item's fields described in `checkFields` will match item in localStorage array, that item will be removed from array, your item will be added at the end. It is useful if you want to keep some order in your stored items and don't want duplicates in it.

#### _getItems()_
Gets array saved as JSON string in localStorage, parses and returns it.
```javascript
  clientHistory.getItems()
```
#### _push(item)_
Pushes `item` to array, saves array to localStorage as JSON string.

__Your `item` can be anything you like to save, just make sure it's an object.__

Example: 
```javascript
  clientHistory.push({
      date: new Date(),
      ip: yourIpMethod()
  })
```
#### _drop()_
Removes your array(saved as JSON string) from localStorage, so that you can start from scratch.
```javascript
  clientHistory.drop()
```


