# Typography

## Font family

In print publications we use Brandon, however because there isn't a free webfont avalible we use Josefin Sans online. 

```sass
.foo {
  font-family: fontFamily(text);
}
```

## Font weight

There are two weights avalible to use: `regular` and `bold`.

```sass
.foo {
  font-weight: fontWeight(bold);
}
```

## Font weight, size and line height

These three can all be set at the same time using the Sass mixin `typeSetting()`. You must provide both a size and weight for the correct line-height to be set. If no weight is provided the default is regular.

```sass
.foo {
  @include typeSetting(3);
}

.bar {
  @include typeSetting(7, semi-bold);
}
```

There are nine different `font-sizes` with corresponding `line-height` values. The mixin will set the both as well as defining the value in `rem` units as well as `px` units as fallback.

## Uppercase

Uppercase typography is used for headings, navigation text and buttons. It is only used in a semi-bold and bold weight. This is also accessible through the `typeSetting()` mixin:

```sass
.foo {
  @include typeSetting(5, bold, uppercase);
}
```
