'use strict';

describe('Service: bucket', function () {

  // load the service's module
  beforeEach(module('briefhackApp'));

  // instantiate service
  var bucket;
  beforeEach(inject(function (_bucket_) {
    bucket = _bucket_;
  }));

  it('should do something', function () {
    expect(!!bucket).toBe(true);
  });

});
