# &lt;kwc-form-steps&gt;

> A form with several steps and verification for each step

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install kwc-form-steps --save
```

Or [download as ZIP](https://github.com/successk/kwc-form-steps/archive/master.zip).

## Usage

1 – Import polyfill:

```html
<script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
```

2 – Import custom element:

```html
<link rel="import" href="bower_components/kwc-form-steps/kwc-form-steps.html">
```

3 – Start using it!

```html
<!-- In your template -->
<kwc-form-steps id="form" previous-label="Previous step" next-label="Next step" validate-label="Validate">
  <!-- Define a <kwc-form-step> for each step -->
  <kwc-form-step title="Step 1">
    <!-- While there is at least one invalid field, you cannot go to next step. -->
    
    <p id="errorStep1"></p>
    
    <kwc-field>
      <div class="kwc-field-label">Field 1</div>
      <input type="text" name="field1" value="{{value.field1::input}}" class="kwc-field-field" required>
    </kwc-field>
    <kwc-field>
      <div class="kwc-field-label">Field 2</div>
      <input type="password" name="field2" value="{{value.field2::input}}" class="kwc-field-field" required>
    </kwc-field>
  </kwc-form-step>
  <kwc-form-step title="Step 2">
    <!-- You can go to previous step or validate the form if there is no error -->
    <kwc-field>
      <div class="kwc-field-label">Field 3</div>
      <input type="checkbox" name="field3" value="{{value.field3::input}}" class="kwc-field-field">
    </kwc-field>
    <kwc-field>
      <div class="kwc-field-label">Field 4</div>
      <input type="email" name="field4" value="{{value.field4::input}}" class="kwc-field-field">
    </kwc-field>
  </kwc-form-step>
</kwc-form-steps>

<p id="done" hidden>You form was sent!</p>
```

```js
// In polymer declaration
Polymer({
  // ...
  properties: {
    value: {
      type: Object,
      value: {}
    }
  },

  listeners: {
    "form.send": "_formSend"
  },

  _formSend: function(e) {
    // Server verification
    
    // when success: show success message and hide form
    this.$.form.setAttribute("hidden", true)
    this.$.done.removeAttribute("hidden")
    
    // when error
    this.$.errorStep1.innerText = "Field 1 has an error"
    this.$.form.gotToStep(1) // Return to first step, where the error is
  }
})
```

Only `kwc-field` are considered for error management in this component.
See [https://github.com/successk/kwc-field](kwc-field repository) for more information.

## How it work?

This component will let the user fill the form step by step.
For each step, the component will authorize the user to go to the next one only when there is no error in any field in current step.
At the validation, the component triggers an event so the parent component will be able to do what he want with the data.

The error management when the form is sent must be done by developer (showing error and returning to the affected step).
There is no internal management of this kind of errors to let the developer free to use any other tool or structure.
If you want this behavior changed, you can [https://github.com/successk/kwc-form-steps/issues](post a new issue).

## Options

### `kwc-form-steps`

Attribute        | Options         | Default      | Description
---              | ---             | ---          | ---
`previous-label` | *String*        | `previous`   | The label for "previous" buttons
`next-label`     | *String*        | `next`       | The label for "next" buttons
`validate-label` | *String*        | `validate`   | The label for "validate" buttons

### `kwc-form-step`

Attribute        | Options         | Default      | Description
---              | ---             | ---          | ---
`title`          | *String*        | `null`       | The title of the step

## Children

### `kwc-form-steps`

Selector        | Description
---             | ---
`kwc-form-step` | Each `kwc-form-step` represents a step in the form. There should be only these component as first-level children.

### `kwc-form-step`

Selector        | Description
---             | ---
`*`             | Any content, only `kwc-field` will be considered for error management.

## Methods

### `kwc-form-steps`

Method        | Parameters   | Returns     | Description
---           | ---          | ---         | ---
goToStep      | step: *int*  | -           | Go to the given step number, starting to 1
previous      | -            | -           | Go to the previous step - ignoring all internal verifications
next          | -            | -           | Go to the next step - ignoring all internal verifications

### `kwc-form-step`

Method        | Parameters   | Returns     | Description
---           | ---          | ---         | ---
validating    | -            | Promise     | Returns a promise indicating all internal fields are valid (considering also async verifications)

## Events

### `kwc-form-steps`

Event     | Detail   | Description
---       | ---      | ---
send      | -        | The form was sent

### `kwc-form-step`

Event     | Detail   | Description
---       | ---      | ---
None      | -        | -

## Styles

### `kwc-form-steps`

Name                                          | Default   | Description
---                                           | ---       | ---
`--kwc-form-steps-navigation`                 | `{}`      | Styles for navigation box (buttons "previous", "next" and "validate")
`--kwc-form-steps-navigation-buttons`         | `{}`      | Styles for all navigation buttons
`--kwc-form-steps-navigation-previous-button` | `{}`      | Styles for previous button in navigation box
`--kwc-form-steps-navigation-next-button`     | `{}`      | Styles for next button in navigation box
`--kwc-form-steps-navigation-validate-button` | `{}`      | Styles for validate button in navigation box

### `kwc-form-step`

Name                        | Default   | Description
---                         | ---       | ---
`--kwc-form-field-fieldset` | `{}`      | Styles for fieldset element in step
`--kwc-form-field-legend`   | `{}`      | Styles for legend element in step
`--kwc-form-field-content`  | `{}`      | Styles for the container of content element

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

1 – Install [bower](http://bower.io/) & [polyserve](https://npmjs.com/polyserve):

```sh
$ npm install -g bower polyserve
```

2 – Install local dependencies:

```sh
$ bower install
```

3 – Start development server and open `http://localhost:8080/components/kwc-form-steps/`.

```sh
$ polyserve
```

## History

For detailed changelog, check [Releases](https://github.com/successk/kwc-form-steps/releases).

## License

MIT