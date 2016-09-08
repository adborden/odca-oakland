'use strict';

function CandidateController (candidate, supporting, opposing) {
  this.candidate = candidate;
  this.supporting = supporting;
  this.opposing = opposing;
}

module.exports = CandidateController;
