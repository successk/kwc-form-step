Polymer({
  is: "kwc-form-steps",

  properties: {
    progress: {
      type: Number,
      value: 0,
      observer: "_progressChanged"
    },
    stepCount: {
      type: Number,
      value: 0
    },
    previousLabel: {
      type: String,
      value: "previous"
    },
    nextLabel: {
      type: String,
      value: "next"
    },
    validateLabel: {
      type: String,
      value: "validate"
    },
    _disabled: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },
    _currentStepHasError: {
      type: Boolean,
      value: false
    },
    _previousDisabled: {
      type: Boolean,
      computed: "_computePreviousDisabled(progress)"
    },
    _nextDisabled: {
      type: Boolean,
      computed: "_computeNextDisabled(_currentStepHasError)"
    },
    _nextHidden: {
      type: Boolean,
      computed: "_computeNextHidden(progress, stepCount)"
    }
  },

  listeners: {
    "previousButton1.tap": "_internalPrevious",
    "nextButton1.tap": "_internalNext",
    "previousButton2.tap": "_internalPrevious",
    "nextButton2.tap": "_internalNext",
    "validateButton1.tap": "_internalSend",
    "validateButton2.tap": "_internalSend"
  },

  attached: function () {
    this._progressChanged(this.progress)
    var that = this
    var steps = this._getSteps()
    this.stepCount = steps.length - 1
    Array.from(steps).forEach(function (step, index) {
      step.addEventListener("has-error-changed", function (e) {
        if (that.progress === index) {
          that._currentStepHasError = e.detail.value
        }
      })
    })
    this._onStepIn()
  },

  goToStep: function(step) {
    this.progress = step - 1
    this._onStepIn()
  },

  previous: function () {
    this.progress--
    this._onStepIn()
  },

  next: function () {
    this.progress++
    this._onStepIn()
  },

  enable: function() {
    this._disabled = false
  },

  disable: function() {
    this._disabled = true
  },

  _progressChanged: function (progress) {
    var steps = Array.from(Polymer.dom(this).querySelectorAll("kwc-form-step"))
    steps.forEach(function (step) {
      step.classList.add("hidden")
    })
    steps[progress].classList.remove("hidden")
  },

  _computePreviousDisabled: function (progress) {
    return progress === 0
  },

  _computeNextDisabled: function (currentStepHasError) {
    return currentStepHasError
  },

  _computeNextHidden: function (progress, stepCount) {
    return progress === stepCount
  },

  _internalPrevious: function (e) {
    e.preventDefault()
    this.previous()
  },

  _internalNext: function (e) {
    e.preventDefault()
    var that = this
    var currentStep = this._getCurrentStep()
    currentStep.disabled = true
    currentStep.validating().then(function (validated) {
      if (validated) {
        that.next()
      }
      currentStep.disabled = false
    })
  },

  _internalSend: function (e) {
    e.preventDefault()
    this._disabled = true
    this.fire("send")
  },

  _onStepIn: function () {
    this._currentStepHasError = this._getCurrentStep().hasError
  },

  _getSteps: function () {
    return Array.from(Polymer.dom(this).querySelectorAll("kwc-form-step"))
  },

  _getCurrentStep: function () {
    return this._getSteps()[this.progress]
  }
})