#gulp-browser-notification
> Show notifications in your browser

![notification](https://cloud.githubusercontent.com/assets/905195/21237935/4d7a6972-c301-11e6-8c06-024e221e9bf1.png)

## Install

```shell
npm install --save-dev gulp-browser-notification
```

## Usage

### Import

```js
var browserNotification = require('gulp-browser-notification');
```

### Addinig connect/express middleware

```js
app.use(browserNotification.connect());
```

### Adding to tasks

```js
gulp.task('example-taks', function() {
  return gulp.src('/html/*.html')
    .pipe(browserNotification('the html has changed!'));
});
```

you can also call a function

```js
gulp.task('example-taks', function() {
  return gulp.src('/html/*.html')
    .pipe(browserNotification.notify(function(file) {
        return {
          title: 'the html has changed! ' + file.path
        }
    }))
});
```

#### options

##### changing port

- Type: `Integer`
- Default: 35728

```js
app.use(browserNotification.connect({
  port: 35728
}));
```

##### adding options to the notification

```js
.pipe(browserNotification.notify("Hi!"), {
  body: "notification body"
})
```

with function
```js
.pipe(browserNotification.notify(function(file) {
    return {
      title: file.path,
      options: {
        body: "notification body"
      }
    }
}))
```

[All notification options](https://developer.mozilla.org/es/docs/Web/API/notification)
