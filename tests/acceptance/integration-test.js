import Ember from 'ember';
import config from '../../config/environment';
import {
  module,
  test,
  skip
} from 'qunit';
import startApp from '../helpers/start-app';
import { lookupService } from '../helpers/utils/lookup';

let application;
const { run } = Ember;
const { timeout: defaultTimeout } = config.flashMessageDefaults;

module('Acceptance: Integration', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('flash messages are rendered', function(assert) {
  assert.expect(7);
  visit('/');

  andThen(() => {
    assert.ok(find('.alert.alert-success'));
    assert.equal(find('.alert.alert-success h6').text(), 'Success');
    assert.equal(find('.alert.alert-success p').text(), 'Route transitioned successfully');
    assert.equal(find('.alert.alert-success .alert-progressBar').attr('style'), `transition-duration: ${defaultTimeout}ms`);

    assert.ok(find('.alert.alert-warning'));
    assert.equal(find('.alert.alert-warning h6').text(), 'Warning');
    assert.equal(find('.alert.alert-warning p').text(), 'It is going to rain tomorrow');
  });
});

test('high priority messages are rendered on top', function(assert) {
  assert.expect(3);
  visit('/');

  andThen(() => {
    assert.ok(find('.alert'));
    assert.equal(find('.alert h6').first().text(), 'Warning');
    assert.equal(find('.alert p').first().text(), 'It is going to rain tomorrow');
  });
});
