'use strict';

const test = require('tap').test;
const ecstatic = require('../lib/core');
const http = require('http');
const checkHeaders = require('./check-headers.js');

const root = `${__dirname}/public`;

test('cross origin isolation', (t) => {
  t.plan(4);

  const server = http.createServer(
    ecstatic({
      root,
      coi: true,
      autoIndex: true,
      defaultExt: 'html',
    })
  );

  checkHeaders(t, server, 'subdir', (t, headers) => {
    t.equal(headers['cross-origin-embedder-policy'], 'require-corp');
    t.equal(headers['cross-origin-opener-policy'], 'same-origin');
  });
});