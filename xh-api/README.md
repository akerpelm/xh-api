# xh-api

### Main refactors:

- Syntax changes for more semantic variable names
- Assigning commonly used functionality to variables for reuse
- Some ES6 changes:

  ```JS
  for (let variableName of dataToIterateOver)
  //rather than
  for (let i = 0; i < dataToIterateOver.length; i++)

  const { keyName } = object  //object destructuring
  //rather than
  object.keyName = ...
  ```

- Remove 'unsanitized' data prior to assignment to the return object.
  - Rather than create the object to return and then rely on logic to then decrement the count / remove faulty data, we first 'sanitize' the data and then iterate over that data to create our return object.
- One requirement was to not modify input data. This was not the case with use of splice, as it mutates the array. To counteract this, the spread operator was used, to still allow for use of splice functionality, while keeping the input data intact.

### To Do/Optimizations:

- currencyTotal + 'currency' is not set to two decimal places. Using JS toFixed(decimalPlaces) would solve this, though I could not quite get this working...

```JS
.toFixed(2)
```
